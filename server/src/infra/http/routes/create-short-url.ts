import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { isRight, unwrapEither } from '@/shared/either.ts'
import { createShortUrl } from '@/app/use-cases/create-short-url.ts'

const INVALID_SHORT_URL_HANDLE_MESSAGE =
  'Link encurtado inválido. Use apenas letras, números, hífens e underlines, entre 2 e 15 caracteres.'

export const createShortUrlRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/urls',
    {
      schema: {
        summary: 'Create a short url',
        tags: ['Create'],
        body: z
          .object({
            originalUrl: z.string().meta({ example: 'https://example.com' }),
            shortUrlHandle: z
              .string()
              .min(2, { error: INVALID_SHORT_URL_HANDLE_MESSAGE })
              .max(15, { error: INVALID_SHORT_URL_HANDLE_MESSAGE })
              .regex(/^[a-zA-Z0-9_-]+$/, {
                error: INVALID_SHORT_URL_HANDLE_MESSAGE
              })
              .meta({ example: 'abc123' })
          })
          .meta({
            example: {
              originalUrl: 'https://example.com',
              shortUrlHandle: 'abc123'
            }
          }),
        response: {
          201: z
            .object({
              id: z.string(),
              shortUrl: z.string().meta({ example: 'abc123' }),
              accessCount: z.number().meta({ example: 1 })
            })
            .meta({ example: { shortUrl: 'abc123' } })
            .describe('Short url created!'),
          400: z
            .object({
              message: z.string()
            })
            .meta({ example: { message: 'Formato de URL inválido.' } })
            .describe('Invalid url format.'),
          409: z
            .object({
              message: z.string()
            })
            .meta({
              example: {
                message: 'As seguintes URLs já existem: https://example.com'
              }
            })
            .describe('Url already exists.')
        }
      }
    },
    async (request, reply) => {
      const { originalUrl, shortUrlHandle } = request.body

      const result = await createShortUrl({ originalUrl, shortUrlHandle })

      if (isRight(result)) {
        const url = unwrapEither(result)

        return reply.status(201).send({
          id: url.id,
          shortUrl: url.shortUrl,
          accessCount: url.accessCount
        })
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'UrlAlreadyExistsError': {
          return reply.status(409).send({ message: error.message })
        }
        case 'InvalidUrlFormatError':
        case 'InvalidShortUrlHandleError': {
          return reply.status(400).send({ message: error.message })
        }
      }
    }
  )
}
