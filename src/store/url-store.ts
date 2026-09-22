import { enableMapSet } from 'immer'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { createShortUrl } from '../http/create-url'
import { deleteUrl as deleteUrlRequest } from '../http/delete-url'
import { getAll } from '../http/get-all'

export interface Url {
  id: string
  shortUrl: string
  originalUrl: string
  accessCount: number
}

export type UrlEntry = Url & { isDeleting?: boolean }

export interface CreateUrlPayload {
  originalUrl: string
  shortUrlHandle: string
}

interface Notification {
  title: string
  description: string
  variant: 'success' | 'error'
}

interface UrlState {
  urls: Map<string, UrlEntry>
  status: 'idle' | 'loading' | 'error'
  isCreating: boolean
  notification: Notification | null
  getUrls: () => Promise<void>
  createUrl: (payload: CreateUrlPayload) => Promise<void>
  deleteUrl: (id: string) => Promise<void>
  dismissNotification: () => void
}

enableMapSet()

export const useUrlStore = create<UrlState, [['zustand/immer', never]]>(
  immer((set, get) => {
    function notify(notification: Notification) {
      set((state) => {
        state.notification = notification
      })
    }

    async function getUrls() {
      set((state) => {
        state.status = 'loading'
      })

      try {
        const urls = await getAll()

        set((state) => {
          state.urls = new Map(urls.map((url) => [url.id, url]))
          state.status = 'idle'
        })
      } catch (error) {
        set((state) => {
          state.status = 'error'
        })

        notify({
          title: 'Erro ao carregar links',
          description:
            error instanceof Error
              ? error.message
              : 'Erro ao atualizar a lista de URLs.',
          variant: 'error'
        })
      }
    }

    async function createUrl(payload: CreateUrlPayload) {
      set((state) => {
        state.isCreating = true
      })

      try {
        await createShortUrl(payload)

        notify({
          title: 'Link criado',
          description: `O link brev.ly/${payload.shortUrlHandle} foi criado.`,
          variant: 'success'
        })
      } catch (error) {
        notify({
          title: 'Erro no cadastro',
          description:
            error instanceof Error ? error.message : 'Erro desconhecido.',
          variant: 'error'
        })

        throw error
      } finally {
        set((state) => {
          state.isCreating = false
        })
      }
    }

    async function deleteUrl(id: string) {
      const url = get().urls.get(id)

      if (!url) {
        return
      }

      set((state) => {
        const entry = state.urls.get(id)
        if (entry) {
          entry.isDeleting = true
        }
      })

      try {
        await deleteUrlRequest(id)

        set((state) => {
          state.urls.delete(id)
        })

        notify({
          title: 'Link removido',
          description: `O link ${url.shortUrl} foi removido.`,
          variant: 'success'
        })
      } catch (error) {
        set((state) => {
          const entry = state.urls.get(id)
          if (entry) {
            entry.isDeleting = false
          }
        })

        notify({
          title: 'Erro ao excluir link',
          description:
            error instanceof Error ? error.message : 'Erro desconhecido.',
          variant: 'error'
        })
      }
    }

    function dismissNotification() {
      set((state) => {
        state.notification = null
      })
    }

    return {
      urls: new Map(),
      status: 'idle',
      isCreating: false,
      notification: null,
      getUrls,
      createUrl,
      deleteUrl,
      dismissNotification
    }
  })
)
