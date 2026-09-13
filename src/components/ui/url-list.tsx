import { useState } from 'react'
import { Button } from './button'
import { DownloadSimpleIcon, LinkIcon } from '@phosphor-icons/react'
import { UrlCard, type Url } from './url-card'
import { Toast } from './toast'
import { deleteUrl } from '../../http/delete-url'

interface UrlListProps {
  urls: Url[]
  onUrlDeleted?: () => void
}

export function UrlList({ urls, onUrlDeleted }: UrlListProps) {
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null)

  const isEmpty = urls.length === 0
  const isEmptyMessage = 'AINDA NÃO EXISTEM LINKS CADASTRADOS'

  function handleCopy(url: Url) {
    navigator.clipboard.writeText(`https://${url.shortUrl}`)
  }

  async function handleDelete(url: Url) {
    try {
      await deleteUrl(url.id)
      setDeleteSuccess(`O link ${url.shortUrl} foi removido.`)
      onUrlDeleted?.()
    } catch (error) {
      setDeleteError(
        error instanceof Error ? error.message : 'Erro desconhecido.'
      )
    }
  }

  return (
    <section className="flex w-full flex-col gap-6 rounded-lg bg-gray-100 p-6 md:p-8 lg:w-145 ">
      <div className="flex place-content-between">
        <h1 className="text-lg font-bold text-gray-600">Meus links</h1>
        <Button variant="secondary">
          <div className="flex gap-1 justify-center items-center">
            <DownloadSimpleIcon />
            Baixar CSV
          </div>
        </Button>
      </div>

      {isEmpty ? (
        <div className="flex flex-col gap-4 justify-center items-center border-t border-gray-300 pt-5">
          <LinkIcon strokeWidth={1.5} className="size-8 text-gray-400" />
          <span className="text-gray-500 text-xs uppercase">
            {isEmptyMessage}
          </span>
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-gray-300 border-t border-gray-300">
          {urls.map((url) => (
            <li key={url.id}>
              <UrlCard url={url} onCopy={handleCopy} onDelete={handleDelete} />
            </li>
          ))}
        </ul>
      )}

      {deleteError && (
        <Toast
          title="Erro ao excluir link"
          description={deleteError}
          variant="error"
          onClose={() => setDeleteError(null)}
        />
      )}

      {deleteSuccess && (
        <Toast
          title="Link removido"
          description={deleteSuccess}
          variant="success"
          onClose={() => setDeleteSuccess(null)}
        />
      )}
    </section>
  )
}
