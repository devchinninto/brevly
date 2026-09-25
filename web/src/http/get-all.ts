import axios from 'axios'
import { env } from '../env'
import type { Url } from '../store/url-store'

export async function getAll(): Promise<Url[]> {
  try {
    const response = await axios.get(`${env.VITE_BACKEND_URL}/urls`)

    return response.data.urls
  } catch (error) {
    throw new Error('Não foi possível buscar as URLs. Tente novamente.', {
      cause: error
    })
  }
}
