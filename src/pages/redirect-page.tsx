import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useRedirectStore } from '../store/redirect-store'
const icon = new URL('../assets/icon.svg', import.meta.url).href

const REDIRECT_DELAY_MS = 1000 // 1 second

export function RedirectPage() {
  const { shortUrlHandle } = useParams<{ shortUrlHandle: string }>()
  const status = useRedirectStore((state) => state.status)
  const originalUrl = useRedirectStore((state) => state.originalUrl)
  const resolve = useRedirectStore((state) => state.resolve)

  useEffect(() => {
    if (shortUrlHandle) {
      resolve(shortUrlHandle)
    }
  }, [shortUrlHandle, resolve])

  useEffect(() => {
    if (status !== 'success' || !originalUrl) {
      return
    }

    const timeout = setTimeout(() => {
      window.location.replace(originalUrl)
    }, REDIRECT_DELAY_MS)

    return () => clearTimeout(timeout)
  }, [status, originalUrl])

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gray-200 px-3 py-8">
      <section className="flex w-full max-w-fit flex-col items-center gap-6 rounded-lg bg-gray-100 px-12 py-16 text-center">
        <img src={icon} alt="" className="h-8 w-auto" />

        {(status === 'idle' ||
          status === 'loading' ||
          status === 'success') && (
          <>
            <h1 className="text-lg font-bold text-gray-600">
              Redirecionando...
            </h1>
            <div className="text-md text-gray-500 flex flex-col gap-1.5">
              <span>
                O link será aberto automaticamente em alguns instantes.
              </span>
              <span>
                Não foi redirecionado?{' '}
                {originalUrl && (
                  <a
                    href={originalUrl}
                    className="font-bold text-blue-base hover:text-blue-dark"
                  >
                    Acesse aqui
                  </a>
                )}
              </span>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <h1 className="text-lg font-bold text-gray-600">Algo deu errado</h1>
            <div className="text-md text-gray-500 flex flex-col gap-1.5">
              Não foi possível carregar este link. Tente novamente.
              <br />
              <Link
                to="/"
                className="font-bold text-blue-base hover:text-blue-dark"
              >
                Voltar para o brev.ly
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
