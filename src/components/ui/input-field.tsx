import type { ComponentProps } from 'react'
import { WarningIcon } from '@phosphor-icons/react'

type InputFieldProps = ComponentProps<'input'> & {
  label: string
  prefix?: string
  error?: string
}

export function InputField({
  label,
  prefix,
  error,
  id,
  ...props
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2 ">
      <label
        htmlFor={id}
        className="text-xs font-bold uppercase text-gray-500 tracking-wide"
      >
        {label}
      </label>

      <div
        className={`flex h-12 items-center rounded-lg border bg-gray-100 px-4 transition-colors focus-within:border-blue-base ${
          error ? 'border-feedback' : 'border-gray-300'
        }`}
      >
        {prefix && (
          <span className="text-md select-none text-gray-400">{prefix}</span>
        )}
        <input
          id={id}
          className="text-md h-full flex-1 bg-transparent p-0 text-gray-600 outline-none placeholder:text-gray-400"
          {...props}
        />
      </div>

      {error && (
        <span className="flex items-center gap-1 text-sm text-gray-500">
          <WarningIcon size={12} weight="regular" className="text-feedback" />
          {error}
        </span>
      )}
    </div>
  )
}
