import { useDiagnosticModal } from '../../context/useDiagnosticModal'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { SectionTitle } from '../ui/SectionTitle'

const items = [
  'Diagnóstico financiero inicial',
  'Planeación de pagos',
  'Reestructuración de obligaciones',
  'Flujo de caja y presupuesto',
  'Acompañamiento para empresas en crisis',
  'Organización financiera para personas y negocios',
] as const

export function Services() {
  const { open } = useDiagnosticModal()

  return (
    <section
      id="soluciones"
      className="scroll-mt-24 sm:scroll-mt-28 border-b border-slate-200/80 bg-white py-16 sm:py-20"
      aria-labelledby="soluciones-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          id="soluciones-heading"
          label="Oferta"
          title="Soluciones financieras con enfoque humano, estratégico y de acompañamiento"
          description="Alineamos el diagnóstico con acciones concretas y seguimiento, priorizando claridad y responsabilidad en cada etapa."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 list-none p-0">
          {items.map((text) => (
            <li key={text}>
              <Card className="h-full">
                <p className="text-sm font-medium text-slate-800">{text}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Acompañamos el proceso; los alcances se revisan con transparencia.
                </p>
              </Card>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Button type="button" size="lg" onClick={open}>
            Quiero evaluar mi situación
          </Button>
        </div>
      </div>
    </section>
  )
}
