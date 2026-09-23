import { Button } from './button'
import { DownloadSimpleIcon, LinkIcon } from '@phosphor-icons/react'
import { UrlCard } from './url-card'
import { useUrlStore } from '../../store/url-store'

export function UrlList() {
  const urls = useUrlStore((state) => state.urls)
  const urlList = Array.from(urls.values())

  const isEmpty = urlList.length === 0
  const isEmptyMessage = 'AINDA NÃO EXISTEM LINKS CADASTRADOS'

  return (
    <section className="flex w-full flex-col gap-6 rounded-lg bg-gray-100 p-6 md:p-8 lg:w-145 ">
      <div className="flex place-content-between">
        <h1 className="text-lg font-bold text-gray-600">Meus links</h1>
        <Button variant="secondary" disabled={isEmpty}>
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
          {urlList.map((url) => (
            <li key={url.id}>
              <UrlCard url={url} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
