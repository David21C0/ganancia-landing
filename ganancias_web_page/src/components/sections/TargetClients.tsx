import { Briefcase, Store, User } from 'lucide-react'
import { useDiagnosticModal } from '../../context/useDiagnosticModal'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { SectionTitle } from '../ui/SectionTitle'
import type { ClientType } from '../diagnostic/types'

const clients: {
  clientType: ClientType
  title: string
  icon: typeof User
  copy: string
}[] = [
  {
    clientType: 'empresa',
    title: 'Empresas',
    icon: Briefcase,
    copy:
      'Diagnóstico financiero, revisión de flujo de caja, priorización de obligaciones y plan de recuperación.',
  },
  {
    clientType: 'persona',
    title: 'Personas',
    icon: User,
    copy:
      'Organización de deudas, presupuesto personal, hábitos financieros y acompañamiento para recuperar estabilidad.',
  },
  {
    clientType: 'negocio',
    title: 'Negocios',
    icon: Store,
    copy:
      'Control de ingresos y egresos, análisis de rentabilidad, liquidez y acciones prácticas para sostener la operación.',
  },
]

export function TargetClients() {
  const { openWithClientType } = useDiagnosticModal()

  return (
    <section
      className="border-b border-slate-200/80 bg-white py-16 sm:py-20"
      aria-labelledby="clientes-objetivo-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          id="clientes-objetivo-heading"
          label="A quién acompañamos"
          title="Cada perfil, una hoja de ruta clara"
          description="Creamos un plan realista y priorizamos acciones acorde a tu contexto, sin promesas vacías."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 list-none p-0">
          {clients.map(({ clientType, title, icon: Icon, copy }) => (
            <li key={clientType}>
              <Card className="flex h-full flex-col">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="text-xl font-bold text-brand-900">{title}</h3>
                <p className="mt-2 grow text-sm leading-relaxed text-slate-600">
                  {copy}
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  className="mt-6 w-full"
                  onClick={() => openWithClientType(clientType)}
                  aria-label={`Solicitar orientación: ${title}`}
                >
                  Solicitar orientación
                </Button>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
