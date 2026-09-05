import { InputField } from './input-field'
import { Button } from './button'

export function AddLink() {
  return (
    <>
      <main className="bg-gray-100 flex flex-col content-start p-8 gap-6 isolate w-95 h-85 top-36 rounded-lg">
        <h1 className="w-79 h-6 font-sans font-bold text-lg flex items-center text-gray-600 flex-none">
          Novo link
        </h1>
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
      </main>
    </>
  )
}
