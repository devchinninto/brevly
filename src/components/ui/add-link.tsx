import { InputField } from './input-field'
import { Button } from './button'
import React, { useState } from 'react'

export function AddLink() {
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortUrlHandle, setShortUrlHandle] = useState('')

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const payload = { originalUrl, shortUrlHandle }

    await fetch('http://localhost:3333/urls', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    setOriginalUrl('')
    setShortUrlHandle('')
  }

  return (
    <section className="flex w-full flex-col gap-6 rounded-lg bg-gray-100 p-6 md:p-8 lg:w-95 lg:shrink-0">
      <h1 className="text-lg font-bold text-gray-600">Novo link</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <InputField
          id="original_url"
          label="Link original"
          type="url"
          placeholder="http://www.example.com"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        ></InputField>
        <InputField
          id="short_url_handle"
          label="Link encurtado"
          type="text"
          prefix="brev.ly/"
          placeholder="example"
          value={shortUrlHandle}
          onChange={(e) => setShortUrlHandle(e.target.value)}
        ></InputField>
        <Button type="submit" className="w-full">
          Salvar link
        </Button>
      </form>
    </section>
  )
}
