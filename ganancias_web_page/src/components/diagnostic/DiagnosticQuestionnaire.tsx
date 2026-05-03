import { useId, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { getQuestionsForClientType } from './diagnosticQuestionBank'
import type { ClientType } from './types'

type Props = {
  clientType: ClientType
  onComplete: (answers: Record<string, string>) => void
  onBackToType: () => void
}

function cn(...c: (string | undefined | false)[]) {
  return c.filter(Boolean).join(' ')
}

export function DiagnosticQuestionnaire({
  clientType,
  onComplete,
  onBackToType,
}: Props) {
  const questions = getQuestionsForClientType(clientType)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const listId = useId()
  const current = questions[index]
  const total = questions.length
  const progress = ((index + 1) / total) * 100
  const isLast = index === total - 1
  const selected = current ? answers[current.id] : undefined
  const canNext = selected !== undefined

  function setAnswer(value: string) {
    if (!current) return
    setAnswers((a) => ({ ...a, [current.id]: value }))
  }

  function next() {
    if (!canNext || !current) return
    if (isLast) {
      onComplete(answers)
      return
    }
    setIndex((i) => i + 1)
  }

  function backQ() {
    if (index === 0) {
      onBackToType()
      return
    }
    setIndex((i) => i - 1)
  }

  if (!current) return null

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-sm text-slate-500">
          <span>
            Pregunta {index + 1} de {total}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progreso del cuestionario"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Card
        className="animate-fade-in-up border-slate-200/80 shadow-sm"
        padding="lg"
      >
        <h3
          className="font-display text-lg font-semibold leading-snug text-brand-900 sm:text-xl"
          id={`${listId}-q`}
        >
          {current.question}
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Selecciona la opción que mejor describa tu situación
        </p>

        <ul
          className="mt-5 space-y-2.5 p-0"
          role="listbox"
          aria-labelledby={`${listId}-q`}
        >
          {current.options.map((opt) => {
            const isActive = selected === opt.value
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => setAnswer(opt.value)}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-xl border-2 p-3.5 text-left text-sm transition-all',
                    'hover:border-emerald-300/80 hover:bg-emerald-50/50',
                    'focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2',
                    isActive
                      ? 'border-emerald-500 bg-emerald-50/80 text-brand-900 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-800',
                  )}
                  role="option"
                  aria-selected={isActive}
                >
                  <span
                    className={cn(
                      'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold',
                      isActive
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-300 bg-white',
                    )}
                    aria-hidden
                  >
                    {isActive ? '✓' : ''}
                  </span>
                  <span className="font-medium leading-snug">{opt.label}</span>
                </button>
              </li>
            )
          })}
        </ul>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button type="button" variant="secondary" onClick={backQ}>
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {index === 0 ? 'Cambiar perfil' : 'Anterior'}
          </Button>
          <Button
            type="button"
            onClick={next}
            disabled={!canNext}
            className="sm:min-w-[200px]"
          >
            {isLast ? 'Ver resultados del diagnóstico' : 'Siguiente'}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </Card>
    </div>
  )
}
