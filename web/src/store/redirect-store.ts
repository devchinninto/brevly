import { create } from 'zustand'
import {
  getUrlByShortUrl,
  UrlNotFoundError
} from '../http/get-url-by-short-url'

interface RedirectState {
  status: 'idle' | 'loading' | 'success' | 'not-found' | 'error'
  originalUrl: string | null
  handle: string | null
  resolve: (handle: string) => Promise<void>
}

export const useRedirectStore = create<RedirectState>((set, get) => ({
  status: 'idle',
  originalUrl: null,
  handle: null,
  async resolve(handle) {
    // Prevents accessCount from doubling due to useEffect "double check"
    const alreadyResolving = get().handle === handle && get().status !== 'idle'

    if (alreadyResolving) {
      return
    }

    set({ status: 'loading', originalUrl: null, handle })

    try {
      const { originalUrl } = await getUrlByShortUrl(handle)

      set({ status: 'success', originalUrl })
    } catch (error) {
      set({
        status: error instanceof UrlNotFoundError ? 'not-found' : 'error',
        originalUrl: null
      })
    }
  }
}))
