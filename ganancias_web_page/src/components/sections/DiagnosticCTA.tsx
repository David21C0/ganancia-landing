import { useDiagnosticModal } from '../../context/useDiagnosticModal'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { SectionTitle } from '../ui/SectionTitle'
import { PROCESS_STEPS } from './processStepsData'

export function DiagnosticCTA() {
  const { open } = useDiagnosticModal()

  return (
    <section
      id="diagnostico"
      className="scroll-mt-24 sm:scroll-mt-28 relative overflow-hidden border-y border-slate-200/80 bg-gradient-to-b from-emerald-50/95 via-white to-teal-50/90 py-20 sm:py-24 lg:py-28"
      aria-labelledby="diagnostico-cta-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(16,185,129,0.12),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_85%,rgba(20,184,166,0.1),transparent_50%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-800">
              Diagnóstico
            </p>
            <h2
              id="diagnostico-cta-heading"
              className="font-display mt-2 text-3xl font-bold leading-tight tracking-tight text-brand-900 sm:text-4xl lg:text-5xl"
            >
              Un diagnóstico claro es el primer paso
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-slate-600 sm:text-xl">
              Completar el formulario no sustituye la asesoría; nos ayuda a
              orientar tu caso con responsabilidad.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:flex-col lg:items-stretch xl:items-center">
            <Button
              type="button"
              size="lg"
              variant="diagnostico"
              onClick={open}
              className="h-14 w-full min-w-[240px] px-10 text-base sm:h-16 sm:text-lg lg:max-w-md lg:self-end xl:max-w-none"
            >
              <span className="flex flex-col items-center gap-0.5 leading-tight sm:items-start">
                <span>Realizar diagnóstico</span>
                <span className="text-[0.7rem] font-semibold uppercase tracking-wide opacity-95 sm:text-xs">
                  Gratis · sin compromiso
                </span>
              </span>
            </Button>
            <p className="max-w-sm text-center text-sm text-slate-500 lg:max-w-none lg:self-end lg:text-left xl:text-center">
              En pocos minutos verás un resumen orientativo; un asesor
              validará contigo el alcance.
            </p>
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <SectionTitle
            id="proceso-heading"
            label="Cómo trabajamos"
            title="Tres pasos, un mismo compromiso"
            description="Primero entendemos la situación. Luego definimos prioridades. Finalmente acompañamos la ejecución para que las decisiones no se queden solo en papel."
          />
        </div>

        <ol className="mt-12 grid list-none grid-cols-1 gap-6 p-0 sm:mt-14 lg:grid-cols-3">
          {PROCESS_STEPS.map((step) => {
            const Icon = step.icon
            return (
              <li key={step.num}>
                <Card className="relative h-full border-slate-200/90 pt-2 shadow-sm sm:pt-3">
                  <div className="mb-3 flex items-center justify-between">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-900"
                      aria-hidden
                    >
                      {step.num}
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-brand-800">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-brand-900 sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {step.desc}
                  </p>
                </Card>
              </li>
            )
          })}
        </ol>
        <p className="mt-10 text-center text-sm text-slate-500 sm:mt-12 lg:mx-auto lg:max-w-2xl">
          Cada plan se ajusta al contexto. No ofrecemos resultados
          financieros garantizados: trabajamos con criterio y transparencia.
        </p>
      </div>
    </section>
  )
}
