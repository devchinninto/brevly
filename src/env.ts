import { z } from 'zod'

const envSchema = z.object({
  VITE_FRONTEND_URL: z.string(),
  VITE_BACKEND_URL: z.string()
})

export const env = envSchema.parse(import.meta.env)
