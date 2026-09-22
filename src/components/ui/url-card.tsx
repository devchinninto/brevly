import { CopyIcon, TrashIcon } from '@phosphor-icons/react'
import { useUrlStore, type UrlEntry } from '../../store/url-store'

interface UrlCardProps {
  url: UrlEntry
}

export function UrlCard({ url }: UrlCardProps) {
  const deleteUrl = useUrlStore((state) => state.deleteUrl)
  const { id, shortUrl, originalUrl, accessCount, isDeleting } = url

  function handleCopy() {
    navigator.clipboard.writeText(`https://${shortUrl}`)
  }

  return (
    <section className="flex items-center gap-4 py-4">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <a
          href={`https://${shortUrl}`}
          target="_blank"
          rel="noreferrer"
          className="truncate text-md font-bold text-blue-base hover:text-blue-dark"
        >
          {shortUrl}
        </a>
        <span className="truncate text-sm text-gray-500">{originalUrl}</span>
      </div>

      <span className="shrink-0 text-sm text-gray-500">
        {accessCount} {accessCount === 1 ? 'acesso' : 'acessos'}
      </span>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          aria-label="Copiar link encurtado"
          onClick={handleCopy}
          className="flex size-8 items-center justify-center rounded-sm bg-gray-200 text-gray-600 transition-colors hover:bg-gray-300"
        >
          <CopyIcon className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Excluir link"
          onClick={() => deleteUrl(id)}
          disabled={isDeleting}
          className="flex size-8 items-center justify-center rounded-sm bg-gray-200 text-gray-600 transition-colors hover:bg-gray-300 disabled:pointer-events-none disabled:opacity-50"
        >
          <TrashIcon className="size-4" />
        </button>
      </div>
    </section>
  )
}
