import { useState } from 'react'
import {
  BarChart3,
  Clock,
  ListTodo,
  Shield,
  TrendingUp,
} from 'lucide-react'
import { useDiagnosticModal } from '../../context/useDiagnosticModal'
import { Button } from '../ui/Button'
import {
  HERO_ILLUSTRATIVE_SCENARIOS,
  type IllustrativeRiskId,
} from './heroIllustrativeScenarios'

const highlights = [
  {
    title: 'Diagnóstico profesional en minutos',
    detail:
      'Cuestionario breve según tu perfil (empresa, persona o negocio) y resumen orientativo.',
    href: '/#diagnostico',
  },
  {
    title: 'Plan de acción personalizado',
    detail:
      'Prioridades claras y pasos concretos alineados a tu situación real.',
    href: '/#diagnostico',
  },
  {
    title: 'Seguimiento continuo',
    detail:
      'Acompañamiento para que las decisiones no se queden solo en papel.',
    href: '/#diagnostico',
  },
] as const

function cn(...c: (string | undefined | false)[]) {
  return c.filter(Boolean).join(' ')
}

function iconTone(id: IllustrativeRiskId) {
  switch (id) {
    case 'estable':
      return {
        bar: 'text-emerald-400',
        shield: 'text-emerald-300',
        trend: 'text-emerald-400',
        list: 'text-emerald-400',
        callout:
          'border-emerald-500/35 bg-gradient-to-r from-emerald-950/55 to-slate-900/80',
      }
    case 'moderado':
      return {
        bar: 'text-amber-400',
        shield: 'text-amber-200',
        trend: 'text-amber-300',
        list: 'text-amber-400',
        callout:
          'border-amber-500/35 bg-gradient-to-r from-amber-950/45 to-slate-900/80',
      }
    case 'alto':
      return {
        bar: 'text-orange-400',
        shield: 'text-orange-200',
        trend: 'text-orange-300',
        list: 'text-orange-400',
        callout:
          'border-orange-500/40 bg-gradient-to-r from-orange-950/50 to-slate-900/80',
      }
    case 'critico':
      return {
        bar: 'text-red-400',
        shield: 'text-red-200',
        trend: 'text-red-300',
        list: 'text-red-400',
        callout:
          'border-red-500/45 bg-gradient-to-r from-red-950/55 to-slate-900/85',
      }
    default:
      return {
        bar: 'text-emerald-400',
        shield: 'text-amber-200',
        trend: 'text-emerald-400',
        list: 'text-emerald-400',
        callout:
          'border-emerald-500/30 bg-gradient-to-r from-emerald-950/50 to-slate-900/80',
      }
  }
}

export function Hero() {
  const { open: openDiagnostic } = useDiagnosticModal()
  const [riskId, setRiskId] = useState<IllustrativeRiskId>('moderado')
  const scenario =
    HERO_ILLUSTRATIVE_SCENARIOS.find((s) => s.id === riskId) ??
    HERO_ILLUSTRATIVE_SCENARIOS[1]
  const tone = iconTone(scenario.id)

  return (
    <section
      id="inicio"
      className="relative flex min-h-[min(90svh,960px)] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-brand-950 via-brand-900 to-slate-950 pt-24 sm:pt-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero-growth-bg.jpg)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-950/88 via-brand-900/78 to-emerald-950/72"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_45%,rgba(255,215,0,0.08),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.15),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_55%_at_50%_0%,rgba(16,185,129,0.08),transparent_50%)]"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 sm:px-6">
        <div className="flex w-full max-w-5xl flex-col items-center gap-10 pb-4 sm:gap-12 sm:pb-6">
          <div className="flex w-full flex-col items-center px-0 pt-0 text-center sm:px-2 lg:pt-2">
            <p
              className="mx-auto max-w-2xl animate-fade-in text-sm font-medium tracking-wide text-emerald-200/95"
              style={{ animationDelay: '0ms' }}
            >
              Entendemos tu situación. Priorizamos acciones. Acompañamos el
              proceso.
            </p>
            <h1
              className="font-display mx-auto mt-4 max-w-4xl animate-fade-in-up text-[clamp(2rem,1rem+3.2vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-white sm:mt-5 lg:text-6xl lg:leading-[1.04] xl:max-w-5xl xl:text-[3.75rem]"
              style={{ animationDelay: '60ms' }}
            >
              Obtén tu diagnóstico y{' '}
              <span className="text-gradient-hero block sm:inline">
                actúa de inmediato
              </span>
            </h1>
            <p
              className="mx-auto mt-4 max-w-2xl animate-fade-in-up text-base leading-relaxed text-slate-200/95 sm:mt-5 sm:max-w-3xl sm:text-lg"
              style={{ animationDelay: '100ms' }}
            >
              Asesoría, diagnóstico, plan de acción y seguimiento especializado
              para empresas, personas y negocios.
            </p>
            <ul
              className="mt-6 grid w-full max-w-5xl grid-cols-1 gap-3 sm:mt-7 sm:grid-cols-3 sm:gap-3 lg:max-w-6xl"
              aria-label="Destacados del servicio"
            >
              {highlights.map((h, i) => (
                <li
                  key={h.title}
                  className="animate-fade-in-up min-w-0"
                  style={{ animationDelay: `${120 + i * 40}ms` }}
                >
                  <a
                    href={h.href}
                    className={cn(
                      'group flex h-full min-h-[9.5rem] flex-col items-center justify-between rounded-2xl border border-white/15 bg-white/[0.08] px-3 py-4 text-center shadow-sm backdrop-blur-sm transition sm:min-h-[10.5rem] sm:px-4',
                      'hover:border-emerald-400/45 hover:bg-white/[0.12] hover:shadow-md hover:shadow-emerald-900/20',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300',
                    )}
                  >
                    <span className="text-sm font-semibold leading-snug text-white sm:text-[0.85rem]">
                      {h.title}
                    </span>
                    <span className="mt-2 flex-1 text-xs leading-relaxed text-slate-300/95 group-hover:text-slate-100 sm:mt-3 sm:text-[0.8rem]">
                      {h.detail}
                    </span>
                    <span className="mt-3 shrink-0 text-xs font-semibold text-emerald-300/95">
                      Ver cómo trabajamos →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex w-full max-w-md flex-col items-stretch gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
              <Button
                type="button"
                size="lg"
                variant="diagnostico"
                onClick={openDiagnostic}
                className="animate-fade-in-up w-full min-w-[200px] sm:w-auto"
                style={{ animationDelay: '200ms' }}
                aria-label="Realizar diagnóstico financiero gratuito"
              >
                <span className="flex flex-col items-center gap-0.5 leading-tight sm:px-1">
                  <span>Realizar diagnóstico</span>
                  <span className="text-[0.7rem] font-semibold uppercase tracking-wide opacity-95">
                    Gratis · sin compromiso
                  </span>
                </span>
              </Button>
              <Button
                type="button"
                size="lg"
                variant="secondary"
                onClick={() => {
                  const el = document.getElementById('contacto')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="animate-fade-in-up w-full border-white/20 !bg-white/10 !text-white !shadow-none hover:!bg-white/18 sm:w-auto"
                style={{ animationDelay: '240ms' }}
              >
                Hablar con un asesor
              </Button>
            </div>
          </div>

          <div
            className="relative w-full max-w-2xl sm:max-w-3xl"
            role="region"
            aria-label="Ejemplo interactivo de resumen según nivel de riesgo"
          >
            <div className="mb-2 flex flex-col items-center gap-2 sm:mb-3">
              <p className="text-center text-[10px] font-medium uppercase tracking-[0.25em] text-slate-400/95">
                Resumen ilustrativo
              </p>
              <p className="text-center text-xs text-slate-500">
                Datos ficticios: elige un escenario para ver cómo cambia el
                panel (no es tu resultado real).
              </p>
            </div>
            <div
              className="mb-3 flex flex-wrap justify-center gap-2"
              role="tablist"
              aria-label="Escenarios de ejemplo"
            >
              {HERO_ILLUSTRATIVE_SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={riskId === s.id}
                  onClick={() => setRiskId(s.id)}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-xs font-semibold transition sm:text-sm',
                    riskId === s.id
                      ? 'border-white/40 bg-white/20 text-white shadow-sm'
                      : 'border-white/10 bg-white/[0.06] text-slate-300 hover:border-white/25 hover:bg-white/10 hover:text-white',
                  )}
                >
                  {s.tab}
                </button>
              ))}
            </div>
            <div
              className={cn(
                'mx-auto w-full max-w-md rounded-2xl border p-1 transition-[box-shadow,border-color] duration-300',
                'bg-slate-900/45 shadow-2xl backdrop-blur-xl sm:max-w-2xl',
                scenario.outerRing,
              )}
            >
              <div className="overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/90 to-slate-950 p-4 sm:p-6">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 sm:mb-4">
                  <p className="text-[0.7rem] font-medium uppercase tracking-widest text-slate-500 sm:text-xs">
                    Panel de resumen
                  </p>
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium ring-1 sm:text-xs',
                      scenario.badgeClass,
                    )}
                  >
                    Vista ilustrativa
                  </span>
                </div>
                <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                  <div className="rounded-xl bg-white/[0.06] p-2.5 ring-1 ring-white/10 sm:p-3">
                    <p className="text-[0.65rem] text-slate-500 sm:text-xs">
                      Estado financiero
                    </p>
                    <p
                      className={cn(
                        'mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-white sm:text-base',
                      )}
                    >
                      <BarChart3
                        className={cn('h-4 w-4 shrink-0 sm:h-5 sm:w-5', tone.bar)}
                      />
                      {scenario.estado}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/[0.06] p-2.5 ring-1 ring-white/10 sm:p-3">
                    <p className="text-[0.65rem] text-slate-500 sm:text-xs">
                      Nivel de riesgo
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold sm:text-base">
                      <Shield
                        className={cn('h-4 w-4 shrink-0 sm:h-5 sm:w-5', tone.shield)}
                      />
                      {scenario.riesgo}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/[0.06] p-2.5 ring-1 ring-white/10 sm:col-span-2 sm:p-3">
                    <p className="text-[0.65rem] text-slate-500 sm:text-xs">
                      Flujo de caja (mes)
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-200/95 sm:text-sm">
                      <TrendingUp
                        className={cn(
                          'h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4',
                          tone.trend,
                        )}
                      />
                      {scenario.flujo}
                    </p>
                  </div>
                  <div
                    className={cn(
                      'flex items-start gap-2.5 rounded-xl p-2.5 sm:col-span-2 sm:gap-3 sm:p-3',
                      tone.callout,
                    )}
                  >
                    <ListTodo
                      className={cn('h-4 w-4 shrink-0 sm:h-5 sm:w-5', tone.list)}
                    />
                    <div>
                      <p className="text-[0.65rem] font-medium text-white/90 sm:text-xs">
                        {scenario.accion}
                      </p>
                      <p className="mt-0.5 text-xs text-white/85 sm:text-sm">
                        {scenario.accionDetalle}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[0.65rem] text-slate-500 sm:mt-4 sm:text-xs">
                  <Clock className="h-3 w-3 shrink-0" />
                  Solo demostración visual. Tu resultado real aparece al
                  completar el diagnóstico.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-[1] mt-auto w-full sm:mt-6" aria-hidden>
        <svg
          className="h-10 w-full fill-slate-50 sm:h-12"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
        >
          <path d="M0,40 C300,10 500,50 800,30 C1000,15 1100,0 1200,10 L1200,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  )
}
