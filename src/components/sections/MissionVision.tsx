import { Card } from '../ui/Card'

export function MissionVision() {
  return (
    <section
      id="mision"
      className="scroll-mt-24 sm:scroll-mt-28 bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="mision-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mx-auto max-w-2xl text-center">
          <h2
            id="mision-heading"
            className="font-display text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl"
          >
            Misión y visión
          </h2>
          <p className="mt-3 text-pretty text-base text-slate-600 sm:text-lg">
            Nuestra razón de ser y el rumbo al que apuntamos contigo, en orden
            y con el mismo criterio claro.
          </p>
        </header>

        <div className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-2 md:items-stretch md:gap-8">
          <Card
            padding="none"
            className="flex h-full flex-col border-emerald-200/90 bg-white/80 p-6 sm:p-8"
          >
            <div className="mb-1 flex items-center gap-3">
              <span
                className="font-display text-2xl font-bold tabular-nums text-emerald-600/90"
                aria-hidden
              >
                01
              </span>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
                Misión
              </h3>
            </div>
            <p className="mt-4 text-pretty text-base leading-relaxed text-slate-700 sm:text-lg">
              Acompañar a empresas, personas y negocios en la recuperación y
              fortalecimiento de su situación financiera mediante diagnósticos
              claros, planes de acción realistas y seguimiento continuo.
            </p>
          </Card>
          <Card
            padding="none"
            className="flex h-full flex-col border-slate-200/90 bg-white p-6 sm:p-8"
          >
            <div className="mb-1 flex items-center gap-3">
              <span
                className="font-display text-2xl font-bold tabular-nums text-slate-400"
                aria-hidden
              >
                02
              </span>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                Visión
              </h3>
            </div>
            <p className="mt-4 text-pretty text-base leading-relaxed text-slate-700 sm:text-lg">
              Ser un aliado financiero confiable para quienes necesitan tomar
              mejores decisiones, recuperar estabilidad y construir una
              relación más sana y estratégica con sus finanzas.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
