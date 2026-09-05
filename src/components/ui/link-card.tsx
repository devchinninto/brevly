import { CopyIcon, TrashIcon } from '@phosphor-icons/react'

export interface Link {
  id: string
  shortUrl: string
  originalUrl: string
  accessCount: number
}

interface LinkCardProps {
  link: Link
  onCopy?: (link: Link) => void
  onDelete?: (link: Link) => void
}

export function LinkCard({ link, onCopy, onDelete }: LinkCardProps) {
  const { shortUrl, originalUrl, accessCount } = link

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
          onClick={() => onCopy?.(link)}
          className="flex size-8 items-center justify-center rounded-sm bg-gray-200 text-gray-600 transition-colors hover:bg-gray-300"
        >
          <CopyIcon className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Excluir link"
          onClick={() => onDelete?.(link)}
          className="flex size-8 items-center justify-center rounded-sm bg-gray-200 text-gray-600 transition-colors hover:bg-gray-300"
        >
          <TrashIcon className="size-4" />
        </button>
      </div>
    </section>
  )
}
