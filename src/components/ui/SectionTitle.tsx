import type { ReactNode } from 'react'

type SectionTitleProps = {
  id?: string
  label?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

function cn(...c: (string | undefined | false)[]) {
  return c.filter(Boolean).join(' ')
}

export function SectionTitle({
  id: titleId,
  label,
  title,
  description,
  align = 'center',
  className = '',
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {label ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
          {label}
        </p>
      ) : null}
      <h2
        id={titleId}
        className="font-display text-3xl font-semibold leading-tight tracking-tight text-brand-900 sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed text-slate-600 sm:text-lg',
            align === 'center' && 'mx-auto max-w-2xl',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
