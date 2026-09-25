import axios from 'axios'
import { env } from '../env'

export async function deleteUrl(id: string) {
  try {
    const response = await axios.delete(`${env.VITE_BACKEND_URL}/urls/${id}`)

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message, { cause: error })
    }

    throw new Error('Não foi possível deletar o link. Tente novamente.', {
      cause: error
    })
  }
}
