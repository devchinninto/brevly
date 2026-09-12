import { useEffect } from 'react'
import {
  CheckCircleIcon,
  WarningCircleIcon,
  type IconWeight
} from '@phosphor-icons/react'

type ToastVariant = 'error' | 'success'

interface ToastProps {
  title: string
  description: string
  variant?: ToastVariant
  onClose: () => void
}

const variantStyles: Record<
  ToastVariant,
  {
    icon: React.ComponentType<{
      size?: number
      weight?: IconWeight
      className?: string
    }>
    border: string
    background: string
    icon_color: string
  }
> = {
  error: {
    icon: WarningCircleIcon,
    border: 'border-feedback/20',
    background: 'bg-feedback/10',
    icon_color: 'text-feedback'
  },
  success: {
    icon: CheckCircleIcon,
    border: 'border-blue-dark',
    background: 'bg-blue-base/10',
    icon_color: 'text-blue-dark'
  }
}

export function Toast({
  title,
  description,
  variant = 'error',
  onClose
}: ToastProps) {
  useEffect(() => {
    const timeout = setTimeout(onClose, 5000)
    return () => clearTimeout(timeout)
  }, [onClose])

  const { icon: Icon, border, background, icon_color } = variantStyles[variant]

  return (
    <div
      role="alert"
      className={`fixed bottom-8 right-8 flex w-full max-w-80 items-start gap-3 rounded-lg border ${border} ${background} p-4 shadow-lg`}
    >
      <Icon
        size={20}
        weight="fill"
        className={`mt-0.5 shrink-0 ${icon_color}`}
      />
      <div className="flex flex-1 flex-col gap-1">
        <strong className="text-sm font-bold text-gray-600">{title}</strong>
        <span className="text-sm text-gray-500">{description}</span>
      </div>
    </div>
  )
}
