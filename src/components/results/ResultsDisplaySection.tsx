import type { ReactNode } from 'react'
import { AlertCircle, AlertTriangle, CheckCircle2, Download, TrendingUp } from 'lucide-react'
import type { StatusTone } from '../../lib/diagnosticScoring'
import { formatUrgency } from '../../lib/diagnosticScoring'
import type { UrgencyLevel } from '../diagnostic/types'
import { Button } from '../ui/Button'

const toneStyles: Record<
  StatusTone,
  { card: string; progress: string; num: string; percent: string; banner: string; bannerIcon: string; label: string }
> = {
  success: {
    card: 'bg-emerald-600 text-white',
    progress: 'bg-emerald-500',
    num: 'bg-emerald-600',
    percent: 'text-emerald-800',
    banner:
      'border-emerald-500/50 bg-gradient-to-r from-emerald-50 to-teal-50/90 ring-2 ring-emerald-200/80',
    bannerIcon: 'bg-emerald-500 text-white shadow-md shadow-emerald-900/20',
    label: 'text-emerald-800',
  },
  warning: {
    card: 'bg-amber-500 text-white',
    progress: 'bg-amber-500',
    num: 'bg-amber-500',
    percent: 'text-amber-900',
    banner:
      'border-amber-400/80 bg-gradient-to-r from-amber-50 to-orange-50/90 ring-2 ring-amber-300/90',
    bannerIcon: 'bg-amber-500 text-white shadow-md shadow-amber-900/20',
    label: 'text-amber-900',
  },
  danger: {
    card: 'bg-red-600 text-white',
    progress: 'bg-red-500',
    num: 'bg-red-600',
    percent: 'text-red-800',
    banner:
      'border-red-500/60 bg-gradient-to-r from-red-50 to-rose-50/90 ring-2 ring-red-300/90',
    bannerIcon: 'bg-red-600 text-white shadow-md shadow-red-900/20',
    label: 'text-red-900',
  },
}

const icons = {
  success: CheckCircle2,
  warning: TrendingUp,
  danger: AlertCircle,
} as const

const urgencyPill: Record<
  UrgencyLevel,
  { className: string; short: string }
> = {
  bajo: {
    className:
      'bg-emerald-100 text-emerald-900 ring-2 ring-emerald-300/80 border border-emerald-200/80',
    short: 'Prioridad baja',
  },
  medio: {
    className:
      'bg-amber-100 text-amber-950 ring-2 ring-amber-400/90 border border-amber-300/80',
    short: 'Revisar con calma',
  },
  alto: {
    className:
      'bg-orange-100 text-orange-950 ring-2 ring-orange-400/90 border border-orange-300/80',
    short: 'Requiere plan pronto',
  },
  critico: {
    className:
      'bg-red-100 text-red-950 ring-2 ring-red-500/80 border-2 border-red-400/90 shadow-md shadow-red-900/10',
    short: 'Atención prioritaria',
  },
}

type Props = {
  categoryTitle: string
  score: number
  maxScore: number
  percentage: number
  statusLevel: string
  statusDescription: string
  tone: StatusTone
  urgency: UrgencyLevel
  recommendations: string[]
  onDownloadPdf: () => void
  contactFormSlot: ReactNode
}

export function ResultsDisplaySection({
  categoryTitle,
  score,
  maxScore,
  percentage,
  statusLevel,
  statusDescription,
  tone,
  urgency,
  recommendations,
  onDownloadPdf,
  contactFormSlot,
}: Props) {
  const styles = toneStyles[tone]
  const StatusIcon = icons[tone]
  const roundedPct = Math.round(percentage)
  const urgencyStyle = urgencyPill[urgency]
  const showCaution = tone === 'danger' || tone === 'warning'

  return (
    <div
      className="min-h-screen scroll-mt-0 bg-gradient-to-br from-slate-100/90 to-slate-50/80 pt-20 pb-16 sm:pt-24"
      id="resultados-inicio"
    >
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-6 text-center sm:mb-8">
          <h1 className="font-display text-2xl font-bold text-brand-900 sm:text-4xl">
            Resultados del Diagnóstico
          </h1>
          <p className="mt-2 text-base text-slate-600 sm:text-lg">{categoryTitle}</p>
        </div>

        <div
          className={`mb-8 rounded-2xl border-2 p-5 sm:p-7 ${styles.banner} animate-fade-in`}
          role="status"
          aria-live="polite"
        >
          {showCaution ? (
            <p className="mb-3 flex items-center justify-center gap-2 text-center text-xs font-bold uppercase tracking-widest text-slate-700 sm:justify-start sm:text-left">
              <AlertTriangle
                className="h-5 w-5 shrink-0 text-amber-600"
                aria-hidden
              />
              {tone === 'danger' ? 'Revisión prioritaria' : 'Aviso — conviene atender'}
            </p>
          ) : null}
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-6">
            <div
              className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl sm:h-28 sm:w-28 ${styles.bannerIcon}`}
            >
              <StatusIcon
                className="h-12 w-12 sm:h-14 sm:w-14"
                aria-hidden
                strokeWidth={2}
              />
            </div>
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p
                className={`text-xs font-bold uppercase tracking-wider sm:text-sm ${styles.label}`}
              >
                Estado del diagnóstico
              </p>
              <h2
                className={`font-display mt-1 text-2xl font-bold sm:text-3xl md:text-4xl ${styles.label} leading-tight`}
              >
                {statusLevel}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                {statusDescription}
              </p>
            </div>
            <div className="flex w-full max-w-sm flex-col items-stretch gap-2 sm:items-end sm:text-right">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Urgencia estimada
              </p>
              <div
                className={`rounded-xl px-4 py-3 text-center sm:min-w-[200px] ${urgencyStyle.className}`}
              >
                <p className="text-xl font-extrabold sm:text-2xl">
                  {formatUrgency(urgency)}
                </p>
                <p className="mt-0.5 text-xs font-medium opacity-90">
                  {urgencyStyle.short}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="animate-fade-in-up mb-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[var(--shadow-elegant)]">
          <div className="p-6 sm:px-8 sm:pb-8 sm:pt-6">
            <h3 className="text-center text-sm font-semibold uppercase tracking-wide text-slate-500">
              Puntuación del cuestionario
            </h3>
            <div className="mt-3 mb-2 flex justify-between text-sm text-slate-600">
              <span className="font-medium">Total</span>
              <span className="font-bold text-brand-900">
                {score} / {maxScore}
              </span>
            </div>
            <div className="relative h-4 overflow-hidden rounded-full bg-slate-200">
              <div
                className={`absolute top-0 left-0 h-4 rounded-full ${styles.progress} transition-all shadow-sm`}
                style={{ width: `${Math.min(100, percentage)}%` }}
              />
            </div>
            <p
              className={`mt-4 text-center text-3xl font-extrabold sm:text-4xl ${styles.percent}`}
            >
              {roundedPct}%
            </p>
          </div>
        </div>

        <div
          className="animate-fade-in-up mb-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
        >
          <div className="border-b border-slate-100 px-6 py-4 sm:px-8 sm:py-5">
            <h2 className="font-display text-2xl font-bold text-brand-900">
              Recomendaciones clave
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Plan de acción sugerido según tu diagnóstico
            </p>
          </div>
          <ul className="space-y-3 p-6 sm:p-8 sm:pt-4" role="list">
            {recommendations.map((r, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl bg-slate-50/90 p-4"
              >
                <span
                  className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${styles.num}`}
                >
                  {i + 1}
                </span>
                <span className="text-base text-slate-800">{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid animate-fade-in-up gap-4 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <h2 className="font-display text-2xl font-bold leading-tight text-brand-900 sm:text-3xl">
              Siguiente paso
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Envíanos tu información y un asesor podrá orientarte
            </p>
            <div className="mt-4 border-t border-slate-100 pt-4">
              {contactFormSlot}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-brand-900">
              Guardar resultados
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Genera un documento o imprime como PDF desde el navegador
            </p>
            <Button
              type="button"
              variant="secondary"
              className="mt-6 w-full"
              onClick={onDownloadPdf}
            >
              <Download className="h-4 w-4" aria-hidden />
              Descargar PDF
            </Button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          <a
            href="/"
            className="font-medium text-emerald-800 hover:text-emerald-900 hover:underline"
          >
            ← Volver al inicio
          </a>
        </p>
      </div>
    </div>
  )
}
