import { useLayoutEffect } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import { DiagnosticModal } from '../components/diagnostic/DiagnosticModal'
import { ResultsContactForm } from '../components/results/ResultsContactForm'
import { ResultsDisplaySection } from '../components/results/ResultsDisplaySection'
import { questionnaireMeta } from '../components/diagnostic/diagnosticQuestionBank'
import type { ClientType } from '../components/diagnostic/types'
import {
  getDiagnosticStatus,
} from '../lib/diagnosticScoring'
import { openPrintableReport } from '../lib/printDiagnosticReport'
import type { DiagnosticResultsState } from '../types/diagnosticResults'

const validTypes: ClientType[] = ['empresa', 'persona', 'negocio']

function isClientType(s: string | undefined): s is ClientType {
  return s !== undefined && (validTypes as string[]).includes(s)
}

export function ResultsPage() {
  const { clientType: param } = useParams()
  const location = useLocation()
  const state = location.state as DiagnosticResultsState | null

  const isValid =
    Boolean(state) &&
    isClientType(param) &&
    state!.clientType === param

  useLayoutEffect(() => {
    if (!isValid) return
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [isValid, location.pathname, location.key])

  if (!isValid) {
    return <Navigate to="/" replace />
  }

  const { score, maxScore, percentage, clientType, urgency } = state!
  const meta = questionnaireMeta[clientType]
  const status = getDiagnosticStatus(percentage)
  const quickSummary = `Diagnóstico completado. Estado: ${status.level}. Puntaje: ${score}/${maxScore} (${Math.round(percentage)}%). Nivel de urgencia estimado (orientativo a partir de tus respuestas); un asesor lo validará contigo.`

  return (
    <div className="page-grid-bg">
      <Navbar />
      <main>
        <ResultsDisplaySection
          categoryTitle={meta.title}
          score={score}
          maxScore={maxScore}
          percentage={percentage}
          statusLevel={status.level}
          statusDescription={status.description}
          tone={status.tone}
          urgency={urgency}
          recommendations={[...status.recommendations]}
          onDownloadPdf={() =>
            openPrintableReport({
              categoryTitle: meta.title,
              score,
              maxScore,
              percentage,
              statusLevel: status.level,
              statusDescription: status.description,
              urgency,
              recommendations: [...status.recommendations],
              clientType,
            })
          }
          contactFormSlot={
            <ResultsContactForm
              clientType={clientType}
              urgency={urgency}
              defaultMessage={quickSummary}
            />
          }
        />
      </main>
      <Footer />
      <DiagnosticModal />
    </div>
  )
}
