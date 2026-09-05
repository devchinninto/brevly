import { InputField } from './input-field'
import { Button } from './button'

export function AddLink() {
  return (
    <section className="flex w-full flex-col gap-6 rounded-lg bg-gray-100 p-6 md:p-8 lg:w-95 lg:shrink-0">
      <h1 className="text-lg font-bold text-gray-600">Novo link</h1>
      <form className="flex flex-col gap-4">
        <InputField
          id="original_url"
          label="Link original"
          type="url"
          placeholder="http://www.example.com"
        ></InputField>
        <InputField
          id="short_url_handle"
          label="Link encurtado"
          type="text"
          prefix="brev.ly/"
          placeholder="example"
        ></InputField>
      </form>
      <Button type="submit" className="w-full">
        Salvar link
      </Button>
    </section>
  )
}
