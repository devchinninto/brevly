import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/home-page'
import { RedirectPage } from './pages/redirect-page'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:shortUrlHandle" element={<RedirectPage />} />
    </Routes>
  )
}
