import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { useDiagnosticModal } from '../../context/useDiagnosticModal'
import { DiagnosticQuestionnaire } from './DiagnosticQuestionnaire'
import { DiagnosticTypeSelector } from './DiagnosticTypeSelector'
import {
  getQuestionsForClientType,
  questionnaireMeta,
} from './diagnosticQuestionBank'
import type { ClientType } from './types'
import { Button } from '../ui/Button'
import {
  computeDiagnosticScore,
  percentageToUrgency,
} from '../../lib/diagnosticScoring'
import type { DiagnosticResultsState } from '../../types/diagnosticResults'

type Step = 'type' | 'questions'

export function DiagnosticModal() {
  const { isOpen, close, pendingClientType, clearPendingClientType } =
    useDiagnosticModal()
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('type')
  const [clientType, setClientType] = useState<ClientType | null>(null)
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const prevActive = useRef<HTMLElement | null>(null)
  const wasOpen = useRef(false)

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      }
    },
    [close],
  )

  /* eslint-disable react-hooks/set-state-in-effect -- Inicializar modal al abrir: selector o cuestionario con perfil en contexto */
  useEffect(() => {
    if (isOpen && !wasOpen.current) {
      if (pendingClientType) {
        setClientType(pendingClientType)
        setStep('questions')
        clearPendingClientType()
      } else {
        setStep('type')
        setClientType(null)
      }
    }
    wasOpen.current = isOpen
  }, [isOpen, pendingClientType, clearPendingClientType])
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!isOpen) return
    prevActive.current = document.activeElement as HTMLElement
    const t = setTimeout(() => {
      const first = panelRef.current?.querySelector<HTMLElement>(
        'input, select, textarea, button',
      )
      first?.focus()
    }, 0)
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      clearTimeout(t)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      prevActive.current?.focus()
    }
  }, [isOpen, onKeyDown, step])

  function handleSelectType(t: ClientType) {
    setClientType(t)
    setStep('questions')
  }

  function handleBackToType() {
    setClientType(null)
    setStep('type')
  }

  function handleQuestionsComplete(answers: Record<string, string>) {
    if (!clientType) return
    const questions = getQuestionsForClientType(clientType)
    const { score, maxScore, percentage } = computeDiagnosticScore(
      questions,
      answers,
    )
    const urgency = percentageToUrgency(percentage)
    const payload: DiagnosticResultsState = {
      answers,
      score,
      maxScore,
      percentage,
      clientType,
      urgency,
    }
    navigate(`/resultados/${clientType}`, { state: payload })
    close()
  }

  if (!isOpen) return null

  const modalTitle =
    step === 'type'
      ? '¿Con qué perfil te identificas?'
      : clientType
        ? questionnaireMeta[clientType].title
        : 'Diagnóstico'

  const modalSubtitle =
    step === 'type'
      ? 'Elige un perfil, responde el cuestionario y verás tus resultados en una pantalla dedicada. Después podrás enviar tus datos de contacto.'
      : clientType
        ? questionnaireMeta[clientType].description
        : null

  const content = (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-4 animate-fade-in"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-slate-950/65 backdrop-blur-md transition-opacity"
        aria-hidden
        onClick={close}
      />
      <div
        ref={panelRef}
        className={`animate-modal relative z-[101] w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl ${
          step === 'type' ? 'max-w-5xl' : 'max-w-3xl'
        }`}
        style={{ boxShadow: 'var(--shadow-elegant)' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div
          className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600"
          aria-hidden
        />
        <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 bg-gradient-to-b from-slate-50/90 to-white px-5 py-5 sm:px-7 sm:py-6">
          <div className="min-w-0 flex-1 pr-2">
            <h2
              id={titleId}
              className="font-display text-2xl font-bold leading-tight tracking-tight text-brand-900 sm:text-3xl sm:leading-tight"
            >
              {modalTitle}
            </h2>
            {modalSubtitle ? (
              <p className="mt-2 text-pretty text-sm leading-relaxed text-slate-600 sm:mt-3 sm:text-base">
                {modalSubtitle}
              </p>
            ) : null}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="md"
            className="!h-11 !w-11 shrink-0 !p-0"
            onClick={close}
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" aria-hidden />
          </Button>
        </div>
        <div
          className={`max-h-[min(90vh,900px)] overflow-y-auto p-5 sm:px-7 ${
            step === 'type' ? 'sm:py-7 sm:pb-10' : 'sm:py-6'
          }`}
        >
          {step === 'type' ? (
            <DiagnosticTypeSelector onSelect={handleSelectType} />
          ) : null}
          {step === 'questions' && clientType ? (
            <DiagnosticQuestionnaire
              key={clientType}
              clientType={clientType}
              onComplete={handleQuestionsComplete}
              onBackToType={handleBackToType}
            />
          ) : null}
        </div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
