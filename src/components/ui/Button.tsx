import type { ButtonHTMLAttributes, ReactNode } from 'react'

const variants = {
  primary:
    'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md hover:from-emerald-500 hover:to-teal-500 focus-visible:ring-2 focus-visible:ring-emerald-500',
  diagnostico: 'btn-cta-diag',
  secondary:
    'bg-white text-brand-900 border-2 border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50',
  gold:
    'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md hover:from-amber-400 hover:to-amber-500',
  ghost:
    'text-brand-800 hover:bg-slate-100 border border-transparent',
  link: 'text-emerald-700 hover:text-emerald-800 underline-offset-2 hover:underline p-0 h-auto',
} as const

const sizes = {
  sm: 'h-9 px-4 text-sm gap-1.5 rounded-lg',
  md: 'h-11 px-6 text-sm font-medium rounded-xl gap-2',
  lg: 'h-12 px-8 text-base font-semibold rounded-xl gap-2',
} as const

type Variant = keyof typeof variants
type Size = keyof typeof sizes

export type ButtonProps = {
  children: ReactNode
  className?: string
  variant?: Variant
  size?: Size
} & ButtonHTMLAttributes<HTMLButtonElement>

function cn(...c: (string | undefined | false)[]) {
  return c.filter(Boolean).join(' ')
}

export function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center font-semibold',
        'disabled:pointer-events-none disabled:opacity-50',
        'focus-visible:outline-none',
        variant === 'diagnostico'
          ? 'focus-visible:ring-0 focus-visible:ring-offset-0'
          : 'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500',
        variants[variant],
        variant !== 'link' ? sizes[size] : 'inline-flex items-center',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
