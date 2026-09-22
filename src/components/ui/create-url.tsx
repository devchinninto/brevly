import { InputField } from './input-field'
import { Button } from './button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useUrlStore } from '../../store/url-store'

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
  const createUrl = useUrlStore((state) => state.createUrl)
  const isCreating = useUrlStore((state) => state.isCreating)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateShortUrlPayload>({
    resolver: zodResolver(createShortUrlSchema)
  })

  const onSubmit: SubmitHandler<CreateShortUrlPayload> = async (payload) => {
    const created = await createUrl(payload)

    if (created) {
      reset()
    }
  }

  return (
    <section className="flex w-full flex-col gap-6 rounded-lg bg-gray-100 p-6 md:p-8 lg:w-95 lg:shrink-0">
      <h1 className="text-lg font-bold text-gray-600">Novo link</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        // Zod is the single source of truth to check the validity of the URLs
        noValidate
      >
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
        <Button type="submit" className="w-full" disabled={isCreating}>
          Salvar link
        </Button>
      </form>
    </section>
  )
}
