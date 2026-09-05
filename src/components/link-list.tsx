import { Button } from './button'
import { DownloadSimpleIcon } from '@phosphor-icons/react'

export function LinkList() {
  return (
    <section className="flex w-full flex-col gap-6 rounded-lg bg-gray-100 p-6 md:p-8 lg:w-145">
      <div className="flex place-content-between">
        <h1 className="text-lg font-bold text-gray-600">Meus links</h1>
        <Button variant="secondary">
          <div className="flex gap-1 justify-center items-center">
            <DownloadSimpleIcon />
            Baixar CSV
          </div>
        </Button>
      </div>
    </section>
  )
}
