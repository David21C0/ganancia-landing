import { Building2, ShieldCheck, Sparkles } from 'lucide-react'

const items = [
  { icon: ShieldCheck, text: 'Proceso transparente y acompañamiento claro' },
  { icon: Building2, text: 'Enfoque para empresas, personas y negocios' },
  { icon: Sparkles, text: 'Diagnóstico estructurado y plan de acción realista' },
] as const

export function TrustBar() {
  return (
    <div className="border-b border-slate-200/60 bg-slate-50/90 py-3">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 sm:flex-row sm:flex-wrap sm:gap-8 sm:px-6">
        {items.map(({ icon: Icon, text }) => (
          <div
            key={text}
            className="flex items-center gap-2 text-sm font-medium text-slate-600"
          >
            <Icon className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
            {text}
          </div>
        ))}
      </div>
    </div>
  )
}
