import axios from 'axios'
import { env } from '../env'

interface CreateShortUrlProps {
  originalUrl: string
  shortUrlHandle: string
}

export async function createShortUrl(payload: CreateShortUrlProps) {
  try {
    const response = await axios.post(`${env.VITE_BACKEND_URL}/urls`, {
      originalUrl: payload.originalUrl,
      shortUrlHandle: payload.shortUrlHandle
    })

    const url = response.data
    console.log(url)
    return url
  } catch (error) {
    console.log(error)
  }
}
