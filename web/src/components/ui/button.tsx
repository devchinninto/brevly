import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'flex h-12 items-center justify-center rounded-lg px-4 text-sm  transition-colors disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      primary: 'bg-blue-base font-bold  text-white hover:bg-blue-dark',
      secondary:
        'bg-gray-200 text-gray-500 hover:bg-gray-300 w-[fit-content] h-[32px]'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export function Button({
  children,
  className,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button className={button({ variant, className })} {...props}>
      {children}
    </button>
  )
}
