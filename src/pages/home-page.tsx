import { useEffect } from 'react'
import { CreateShortUrl } from '../components/ui/create-url'
import { UrlList } from '../components/ui/url-list'
import { Toast } from '../components/ui/toast'
import { useUrlStore } from '../store/url-store'
const logo = new URL('../assets/logo.svg', import.meta.url).href

export function HomePage() {
  const getUrls = useUrlStore((state) => state.getUrls)
  const notification = useUrlStore((state) => state.notification)
  const dismissNotification = useUrlStore((state) => state.dismissNotification)

  useEffect(() => {
    getUrls()
  }, [getUrls])

  return (
    <div className="flex min-h-dvh justify-center bg-gray-200 px-3 py-8 md:px-6 lg:items-center">
      <main className="flex w-full max-w-145 flex-col gap-6 lg:max-w-fit">
        <img
          src={logo}
          alt="brev.ly"
          className="h-6 w-auto self-center lg:self-start"
        />
        <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-start lg:gap-5">
          <CreateShortUrl />
          <UrlList />
        </div>
      </main>

      {notification && (
        <Toast
          title={notification.title}
          description={notification.description}
          variant={notification.variant}
          onClose={dismissNotification}
        />
      )}
    </div>
  )
}
