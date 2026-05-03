import { useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { useDiagnosticModal } from '../../context/useDiagnosticModal'

const nav = [
  { href: '/#inicio', label: 'Inicio' },
  { href: '/#soluciones', label: 'Soluciones' },
  { href: '/#mision', label: 'Misión' },
  { href: '/#diagnostico', label: 'Diagnóstico' },
  { href: '/#seguridad', label: 'Seguridad' },
  { href: '/#contacto', label: 'Contacto' },
] as const

function cn(...c: (string | undefined | false)[]) {
  return c.filter(Boolean).join(' ')
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { open: openDiagnostic } = useDiagnosticModal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-shadow duration-200',
        'border-b border-transparent bg-white/90 backdrop-blur-md',
        scrolled && 'border-slate-200/80 shadow-sm',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a
          href="/#inicio"
          className="group flex min-w-0 flex-shrink-0 flex-col gap-0.5"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-xl font-bold tracking-tight text-brand-900 sm:text-2xl">
            +Ganancias
          </span>
          <p
            className={cn(
              'mt-0.5 inline-flex max-w-[20rem] flex-wrap items-center gap-x-1.5 rounded-md border border-emerald-200/90',
              'bg-gradient-to-r from-emerald-50/95 via-white to-teal-50/90 px-2 py-1 shadow-sm ring-1 ring-emerald-100/80',
              'text-[11px] font-semibold tracking-wide text-emerald-950 sm:max-w-none sm:gap-x-2 sm:px-2.5 sm:py-1 sm:text-[0.8125rem]',
            )}
          >
            <span className="whitespace-nowrap">Diagnosticamos</span>
            <span className="select-none text-emerald-500" aria-hidden>
              •
            </span>
            <span className="whitespace-nowrap">Planificamos</span>
            <span className="select-none text-emerald-500" aria-hidden>
              •
            </span>
            <span className="whitespace-nowrap">Acompañamos</span>
          </p>
        </a>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navegación principal"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-brand-900"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="md"
            variant="diagnostico"
            className="!hidden !h-auto !min-h-[2.75rem] !items-center !py-2 !pl-4 !pr-5 sm:!inline-flex"
            onClick={openDiagnostic}
            aria-label="Abrir formulario: Realizar diagnóstico gratuito"
          >
            <span className="flex flex-col items-start justify-center gap-0.5 text-left leading-snug">
              <span className="text-sm font-semibold leading-tight">
                Realizar diagnóstico
              </span>
              <span className="text-[0.65rem] font-medium leading-tight text-white/90">
                Gratis · sin compromiso
              </span>
            </span>
          </Button>
          <Button
            type="button"
            size="md"
            variant="secondary"
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? 'Cerrar' : 'Menú'}
          </Button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Navegación móvil">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-100"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button
              type="button"
              variant="diagnostico"
              className="mt-2 !h-auto w-full !min-h-[3rem] !py-3"
              onClick={() => {
                setOpen(false)
                openDiagnostic()
              }}
            >
              <span className="flex flex-col items-center gap-0.5 text-center leading-snug">
                <span className="text-sm font-semibold">Realizar diagnóstico</span>
                <span className="text-[0.7rem] font-medium text-white/90">
                  Gratis · sin compromiso
                </span>
              </span>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
