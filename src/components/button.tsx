import type { ComponentProps } from 'react'

type ButtonProps = ComponentProps<'button'>

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className="flex h-12 items-center justify-center rounded-lg bg-blue-base px-4 text-sm font-bold text-white transition-colors hover:bg-blue-dark disabled:pointer-events-none disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  )
}
