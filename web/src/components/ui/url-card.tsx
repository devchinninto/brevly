import { CopyIcon, TrashIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { useUrlStore, type UrlEntry } from '../../store/url-store'
import { buildShareableUrl, formatShortUrl } from '../../utils/format-short-url'

interface UrlCardProps {
  url: UrlEntry
}

export function UrlCard({ url }: UrlCardProps) {
  const deleteUrl = useUrlStore((state) => state.deleteUrl)
  const notify = useUrlStore((state) => state.notify)
  const { id, shortUrl, originalUrl, accessCount, isDeleting } = url

  function handleCopy() {
    navigator.clipboard.writeText(buildShareableUrl(shortUrl))

    notify({
      title: 'Link copiado com sucesso',
      description: `O link ${formatShortUrl(shortUrl)} foi copiado para a área de transferência`,
      variant: 'success'
    })
  }

  function handleDelete() {
    const response = confirm(
      `Você realmente quer apagar o link ${formatShortUrl(shortUrl)}?`
    )

    if (response) {
      deleteUrl(id)
    }
  }

  return (
    <section className="flex items-center gap-4 py-4">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Link
          to={`/${shortUrl}`}
          className="truncate text-md font-bold text-blue-base hover:text-blue-dark"
        >
          {formatShortUrl(shortUrl)}
        </Link>
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
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex size-8 items-center justify-center rounded-sm bg-gray-200 text-gray-600 transition-colors hover:bg-gray-300 disabled:pointer-events-none disabled:opacity-50"
        >
          <TrashIcon className="size-4" />
        </button>
      </div>
    </section>
  )
}
