import axios from 'axios'
import { env } from '../env'

interface CreateShortUrlProps {
  originalUrl: string
  shortUrlHandle: string
}

interface CreateShortUrlResponse {
  id: string
  shortUrl: string
  accessCount: number
}

export async function createShortUrl(payload: CreateShortUrlProps) {
  try {
    const response = await axios.post<CreateShortUrlResponse>(
      `${env.VITE_BACKEND_URL}/urls`,
      {
        originalUrl: payload.originalUrl,
        shortUrlHandle: payload.shortUrlHandle
      }
    )

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message, { cause: error })
    }

    throw new Error('Não foi possível criar o link. Tente novamente.', {
      cause: error
    })
  }
}
