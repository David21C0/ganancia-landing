import type { HTMLAttributes, ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
} & HTMLAttributes<HTMLDivElement>

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
} as const

function cn(...c: (string | undefined | false)[]) {
  return c.filter(Boolean).join(' ')
}

export function Card({
  children,
  className = '',
  padding = 'md',
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow hover:shadow-[var(--shadow-elegant)]',
        paddings[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
