import { env } from '../env'

export function getShortUrlHost() {
  return new URL(env.VITE_FRONTEND_URL).host
}

export function formatShortUrl(handle: string) {
  return `${getShortUrlHost()}/${handle}`
}

export function buildShareableUrl(handle: string) {
  return `${env.VITE_FRONTEND_URL}/${handle}`
}
