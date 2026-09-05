import { AddLink } from './components/add-link'
import { LinkList } from './components/link-list'
import logo from './assets/logo.svg'

export function App() {
  return (
    <div className="flex min-h-dvh justify-center bg-gray-200 px-3 py-8 md:px-6 lg:items-center">
      <main className="flex w-full max-w-145 flex-col gap-6 lg:max-w-fit">
        <img
          src={logo}
          alt="brev.ly"
          className="h-6 w-auto self-center lg:self-start"
        />
        <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-start lg:gap-5">
          <AddLink />
          <LinkList />
        </div>
      </main>
    </div>
  )
}
