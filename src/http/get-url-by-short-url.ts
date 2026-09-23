import axios from 'axios'
import { env } from '../env'

// TODO: Implementar a pág. 404
export class UrlNotFoundError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
  }
}

interface GetUrlByShortUrlResponse {
  originalUrl: string
  accessCount: number
}

export async function getUrlByShortUrl(
  handle: string
): Promise<GetUrlByShortUrlResponse> {
  try {
    const response = await axios.get<GetUrlByShortUrlResponse>(
      `${env.VITE_BACKEND_URL}/urls/${handle}`
    )

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new UrlNotFoundError('Link não encontrado.', { cause: error })
    }

    throw new Error('Não foi possível buscar o link. Tente novamente.', {
      cause: error
    })
  }
}
