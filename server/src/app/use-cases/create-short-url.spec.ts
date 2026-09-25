import { describe, expect, it, beforeEach } from 'vitest'
import { createShortUrl } from './create-short-url.ts'
import { db } from '@/infra/db/index.ts'
import { schema } from '@/infra/db/schemas/index.ts'
import { isRight, unwrapEither } from '@/shared/either.ts'
import { InvalidUrlFormatError } from '../errors/invalid-url-format.ts'
import { InvalidShortUrlHandleError } from '../errors/invalid-short-url-handle-error.ts'
import { UrlAlreadyExistsError } from '../errors/url-already-exists-error.ts'
import { afterEach } from 'node:test'
import { uuidv7 } from 'uuidv7'

beforeEach(async () => {
  await db.delete(schema.urls)
})

afterEach(async () => {
  await db.delete(schema.urls)
})

describe('create a short url', () => {
  const handle = uuidv7().replace(/-/g, '').slice(0, 15)

  it('should create a new short url', async () => {
    const input = {
      originalUrl: `https://${handle}.com`,
      shortUrlHandle: handle
    }

    const createdUrl = await createShortUrl(input)

    let result

    if (isRight(createdUrl)) {
      result = unwrapEither(createdUrl)
    }

    expect(result?.originalUrl).toEqual(input.originalUrl)
    expect(result?.shortUrl).toEqual(input.shortUrlHandle)
  })

  it('should throw an Invalid URL Format Error', async () => {
    const input = {
      originalUrl: 'not-a-real-url',
      shortUrlHandle: uuidv7().replace(/-/g, '').slice(0, 10)
    }

    const result = await createShortUrl(input)

    const error = unwrapEither(result)

    expect(error).toBeInstanceOf(InvalidUrlFormatError)
  })

  it('should throw an Invalid Short URL Handle Error for a too-long handle', async () => {
    const tooLongHandle = uuidv7().replace(/-/g, '').slice(0, 16)

    const input = {
      originalUrl: `https://${tooLongHandle}.com/`,
      shortUrlHandle: tooLongHandle
    }

    const result = await createShortUrl(input)

    const error = unwrapEither(result)

    expect(error).toBeInstanceOf(InvalidShortUrlHandleError)
  })

  it('should throw an Invalid Short URL Handle Error for disallowed characters', async () => {
    const input = {
      originalUrl: 'https://valid-url-example.com/',
      shortUrlHandle: 'invalid handle!'
    }

    const result = await createShortUrl(input)

    const error = unwrapEither(result)

    expect(error).toBeInstanceOf(InvalidShortUrlHandleError)
  })

  it('should throw an URL Already Exists Error', async () => {
    const input = {
      originalUrl: 'https://duplicate-website.com/',
      shortUrlHandle: 'duplicate'
    }

    const firstCreateAttempt = await createShortUrl(input)

    const secondCreateAttempt = await createShortUrl(input)
    const error = unwrapEither(secondCreateAttempt)

    expect(isRight(firstCreateAttempt)).toBe(true)
    expect(error).toBeInstanceOf(UrlAlreadyExistsError)
  })
})
