import { useCallback, useEffect, useState } from 'react'
import { CreateShortUrl } from './components/ui/create-url'
import { UrlList } from './components/ui/url-list'
import { Toast } from './components/ui/toast'
import { getAll } from './http/get-all'
import type { Url } from './components/ui/url-card'
const logo = new URL('./assets/logo.svg', import.meta.url).href

export function App() {
  const [urls, setUrls] = useState<Url[]>([])
  const [fetchError, setFetchError] = useState<string | null>(null)

  const refreshUrls = useCallback(async () => {
    try {
      const data = await getAll()
      setUrls(data)
    } catch (error) {
      setFetchError(
        error instanceof Error
          ? error.message
          : 'Erro ao atualizar a lista de URLs.'
      )
    }
  }, [])

  useEffect(() => {
    refreshUrls()
  }, [refreshUrls])

  return (
    <div className="flex min-h-dvh justify-center bg-gray-200 px-3 py-8 md:px-6 lg:items-center">
      <main className="flex w-full max-w-145 flex-col gap-6 lg:max-w-fit">
        <img
          src={logo}
          alt="brev.ly"
          className="h-6 w-auto self-center lg:self-start"
        />
        <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-start lg:gap-5">
          <CreateShortUrl onUrlCreated={refreshUrls} />
          <UrlList urls={urls} onUrlDeleted={refreshUrls} />
        </div>
      </main>

      {fetchError && (
        <Toast
          title="Erro ao carregar links"
          description={fetchError}
          variant="error"
          onClose={() => setFetchError(null)}
        />
      )}
    </div>
  )
}
