import { Briefcase, Sparkles, User } from 'lucide-react'
import type { ClientType } from './types'

const options: {
  id: ClientType
  title: string
  description: string
  icon: typeof User
}[] = [
  {
    id: 'persona',
    title: 'Persona',
    description:
      'Finanzas personales, deudas, presupuesto y hábitos con enfoque individual.',
    icon: User,
  },
  {
    id: 'empresa',
    title: 'Empresa',
    description:
      'Estructura corporativa, flujo, obligaciones y plan de recuperación.',
    icon: Briefcase,
  },
  {
    id: 'negocio',
    title: 'Negocio / emprendimiento',
    description:
      'Operación del negocio, liquidez, costos e ingresos con visión práctica.',
    icon: Sparkles,
  },
]

type Props = {
  onSelect: (type: ClientType) => void
}

function cn(...c: (string | undefined | false)[]) {
  return c.filter(Boolean).join(' ')
}

export function DiagnosticTypeSelector({ onSelect }: Props) {
  return (
    <div className="animate-fade-in">
      <p className="mx-auto max-w-2xl text-center text-base text-slate-600 sm:text-lg">
        Así preparamos el formulario adecuado. Podrás cambiar de perfil si lo
        necesitas.
      </p>
      <ul
        className="mt-8 grid list-none grid-cols-1 gap-5 p-0 sm:mt-10 sm:grid-cols-3 sm:gap-6"
        role="list"
      >
        {options.map((o, i) => {
          const Icon = o.icon
          return (
            <li
              key={o.id}
              className="animate-fade-in-up h-full"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <button
                type="button"
                onClick={() => onSelect(o.id)}
                className={cn(
                  'group relative flex h-full w-full min-h-[12rem] flex-col text-left',
                  'rounded-2xl border-2 border-slate-200/90 bg-gradient-to-b from-white to-slate-50/90 p-6',
                  'shadow-sm transition-all duration-300',
                  'hover:-translate-y-1.5 hover:border-emerald-400/90 hover:shadow-lg',
                  'hover:shadow-[0_20px_50px_-20px_rgba(16,185,129,0.35)]',
                  'focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2',
                )}
              >
                <span
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100 text-emerald-800 shadow-inner transition-transform group-hover:scale-105"
                  aria-hidden
                >
                  <Icon className="h-8 w-8" />
                </span>
                <span className="font-display text-xl font-bold text-brand-900 sm:text-2xl">
                  {o.title}
                </span>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
                  {o.description}
                </p>
                <span className="mt-auto flex items-center pt-5 text-base font-semibold text-emerald-700">
                  Seleccionar
                  <span
                    className="ml-1.5 inline-block transition-transform group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
