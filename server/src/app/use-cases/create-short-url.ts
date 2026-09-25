import { z } from 'zod'
import { db } from '@/infra/db/index.ts'
import { schema } from '@/infra/db/schemas/index.ts'
import { eq } from 'drizzle-orm'
import { UrlAlreadyExistsError } from '../errors/url-already-exists-error.ts'
import { Either, makeLeft, makeRight } from '@/shared/either.ts'
import { InvalidUrlFormatError } from '../errors/invalid-url-format.ts'
import { InvalidShortUrlHandleError } from '../errors/invalid-short-url-handle-error.ts'

const HOSTNAME_REGEX =
  /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/

const createShortUrlInput = z.object({
  originalUrl: z.url().refine(
    (url) => {
      try {
        return HOSTNAME_REGEX.test(new URL(url).hostname)
      } catch {
        return false
      }
    },
    { error: 'Formato de URL inválido.' }
  ),
  shortUrlHandle: z
    .string()
    .min(2)
    .max(15)
    .regex(/^[a-zA-Z0-9_-]+$/)
})

type CreateShortUrlOutput = Either<
  UrlAlreadyExistsError | InvalidUrlFormatError | InvalidShortUrlHandleError,
  {
    id: string
    originalUrl: string
    shortUrl: string
    accessCount: number
    createdAt: Date
  }
>

export type CreateShortUrlInput = z.input<typeof createShortUrlInput>

export async function createShortUrl(
  input: CreateShortUrlInput
): Promise<CreateShortUrlOutput> {
  const parsed = createShortUrlInput.safeParse(input)

  if (!parsed.success) {
    const errorPathType = parsed.error._zod.def[0].path[0]

    if (errorPathType === 'shortUrlHandle') {
      return makeLeft(new InvalidShortUrlHandleError())
    }

    return makeLeft(new InvalidUrlFormatError())
  }

  const [originalUrlMatch, shortUrlMatch] = await Promise.all([
    db
      .select({ originalUrl: schema.urls.originalUrl })
      .from(schema.urls)
      .where(eq(schema.urls.originalUrl, parsed.data.originalUrl))
      .limit(1),
    db
      .select({ shortUrl: schema.urls.shortUrl })
      .from(schema.urls)
      .where(eq(schema.urls.shortUrl, parsed.data.shortUrlHandle))
      .limit(1)
  ])

  const conflicts = []
  if (originalUrlMatch.length > 0)
    conflicts.push(originalUrlMatch[0].originalUrl)
  if (shortUrlMatch.length > 0) conflicts.push(shortUrlMatch[0].shortUrl)

  if (conflicts.length > 0) {
    return makeLeft(
      new UrlAlreadyExistsError(
        `As seguintes URLs já existem: ${conflicts.join(', ')}`
      )
    )
  }

  const [url] = await db
    .insert(schema.urls)
    .values({
      originalUrl: parsed.data.originalUrl,
      shortUrl: parsed.data.shortUrlHandle
    })
    .returning()

  return makeRight({
    id: url.id,
    originalUrl: url.originalUrl,
    shortUrl: url.shortUrl,
    createdAt: url.createdAt,
    accessCount: url.accessCount
  })
}
