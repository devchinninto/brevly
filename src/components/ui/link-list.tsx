import { Button } from './button'
import { DownloadSimpleIcon, LinkIcon } from '@phosphor-icons/react'
import { LinkCard, type Link } from './link-card'

const links: Link[] = [
  {
    id: '1',
    shortUrl: 'brev.ly/portfolio',
    originalUrl: 'example.portfolio.com.br/example-user-123456',
    accessCount: 15
  }
]

export function LinkList() {
  const isEmpty = links.length === 0
  const isEmptyMessage = 'AINDA NÃO EXISTEM LINKS CADASTRADOS'

  function handleCopy(link: Link) {
    navigator.clipboard.writeText(`https://${link.shortUrl}`)
  }

  // function handleDelete(link: Link) {
  // }

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
          {links.map((link) => (
            <li key={link.id}>
              <LinkCard
                link={link}
                onCopy={handleCopy}
                // onDelete={handleDelete}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
