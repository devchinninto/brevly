import axios from 'axios'
import { env } from '../env'
import { downloadCsv } from '../utils/download-csv'

export async function downloadUrlsReport() {
  try {
    const response = await axios.post(`${env.VITE_BACKEND_URL}/urls/exports`)

    downloadCsv(response.data.reportUrls)
  } catch (error) {
    throw new Error(
      'Não foi possível exportar os links para CSV. Tente novamente.',
      {
        cause: error
      }
    )
  }
}
