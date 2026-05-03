import { Check } from 'lucide-react'
import { useDiagnosticModal } from '../../context/useDiagnosticModal'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

const points = [
  'Confidencialidad en la información entregada',
  'Uso exclusivo para diagnóstico y asesoría',
  'Comunicación clara antes de cualquier proceso',
  'No se comparten datos sin autorización',
  'Enfoque ético y responsable',
] as const

export function SecurityInfo() {
  const { open } = useDiagnosticModal()

  return (
    <section
      id="seguridad"
      className="scroll-mt-24 sm:scroll-mt-28 border-t border-white/5 bg-brand-900 py-16 text-white sm:py-20 lg:py-24"
      aria-labelledby="seguridad-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="seguridad-heading"
            className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Tu información financiera y estratégica merece protección
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-slate-200/90 sm:text-lg">
            En +Ganancias tratamos la información suministrada con
            responsabilidad, confidencialidad y finalidad exclusiva de
            diagnóstico y acompañamiento. La transparencia y la protección de
            datos son parte esencial de nuestro proceso.
          </p>
        </div>
        <Card
          className="mt-10 border-white/10 !bg-white/5 text-white"
          padding="none"
        >
          <ul
            className="mx-auto max-w-2xl space-y-0 px-1 py-2 sm:px-2"
            role="list"
          >
            {points.map((p) => (
              <li
                key={p}
                className="flex items-start gap-4 border-b border-white/10 px-4 py-4 last:border-0 sm:px-6 sm:py-5"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/25 text-emerald-200">
                  <Check className="h-4 w-4" aria-hidden />
                </span>
                <span className="text-pretty text-sm leading-relaxed text-slate-100 sm:text-base">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </Card>
        <p className="mt-10 flex justify-center sm:mt-12">
          <Button
            type="button"
            variant="secondary"
            className="!border-white/20 !bg-white/10 !text-white hover:!bg-white/20"
            onClick={open}
            aria-label="Conocer cómo protegemos tu información, abriendo el diagnóstico inicial"
          >
            Conocer cómo protegemos tu información
          </Button>
        </p>
      </div>
    </section>
  )
}
