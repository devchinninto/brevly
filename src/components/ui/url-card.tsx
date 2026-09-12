import { CopyIcon, TrashIcon } from '@phosphor-icons/react'
import { env } from '../../env'

export interface Url {
  id: string
  shortUrl: string
  originalUrl: string
  accessCount: number
}

interface UrlCardProps {
  url: Url
  onCopy?: (url: Url) => void
  onDelete?: (url: Url) => void
}

export function getResolvedShortUrl({ shortUrl }: Pick<Url, 'shortUrl'>) {
  const handle = shortUrl.split('/').pop()
  const backendUrl = env.VITE_BACKEND_URL.replace(/\/$/, '')

  return `${backendUrl}/${handle}`
}

export function UrlCard({ url, onCopy, onDelete }: UrlCardProps) {
  const { originalUrl, accessCount } = url
  const resolvedShortUrl = getResolvedShortUrl(url)

  return (
    <section className="flex items-center gap-4 py-4">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <a
          href={resolvedShortUrl}
          target="_blank"
          rel="noreferrer"
          className="truncate text-md font-bold text-blue-base hover:text-blue-dark"
        >
          {resolvedShortUrl.replace(/^https?:\/\//i, '')}
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
          onClick={() => onCopy?.(url)}
          className="flex size-8 items-center justify-center rounded-sm bg-gray-200 text-gray-600 transition-colors hover:bg-gray-300"
        >
          <CopyIcon className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Excluir link"
          onClick={() => onDelete?.(url)}
          className="flex size-8 items-center justify-center rounded-sm bg-gray-200 text-gray-600 transition-colors hover:bg-gray-300"
        >
          <TrashIcon className="size-4" />
        </button>
      </div>
    </section>
  )
}
