import { useState } from 'react'
import { InputField } from './input-field'
import { Button } from './button'
import { Toast } from './toast'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { createShortUrl } from '../../http/create-url'

const createShortUrlSchema = z.object({
  originalUrl: z
    .string()
    .transform((url) => {
      if (!/^https?:\/\//i.test(url)) {
        return `https://${url}`
      }
      return url
    })
    .pipe(
      z.string().check(z.url({ error: 'Por favor informe uma URL válida.' }))
    ),
  shortUrlHandle: z
    .string()
    .min(2)
    .max(12)
    .regex(/^[a-zA-Z0-9_-]+$/, {
      error: 'Use apenas letras, números, hífens e underlines, sem espaços.'
    })
})

type CreateShortUrlPayload = z.infer<typeof createShortUrlSchema>

export function CreateShortUrl() {
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateShortUrlPayload>({
    resolver: zodResolver(createShortUrlSchema)
  })

  const onSubmit: SubmitHandler<CreateShortUrlPayload> = async (payload) => {
    try {
      await createShortUrl(payload)
      reset()
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Erro desconhecido.'
      )
    }
  }

  return (
    <section className="flex w-full flex-col gap-6 rounded-lg bg-gray-100 p-6 md:p-8 lg:w-95 lg:shrink-0">
      <h1 className="text-lg font-bold text-gray-600">Novo link</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          id="original_url"
          label="Link original"
          type="url"
          placeholder="http://www.example.com"
          error={errors.originalUrl?.message}
          {...register('originalUrl')}
        ></InputField>
        <InputField
          id="short_url_handle"
          label="Link encurtado"
          type="text"
          prefix="brev.ly/"
          placeholder="example"
          error={errors.shortUrlHandle?.message}
          {...register('shortUrlHandle')}
        ></InputField>
        <Button type="submit" className="w-full">
          Salvar link
        </Button>
      </form>

      {submitError && (
        <Toast
          title="Erro no cadastro"
          description={submitError}
          variant="error"
          onClose={() => setSubmitError(null)}
        />
      )}
    </section>
  )
}
