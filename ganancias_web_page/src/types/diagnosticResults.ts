import type { ClientType, UrgencyLevel } from '../components/diagnostic/types'

/**
 * Estado pasado por la ruta a `/resultados/:clientType` (react-router location.state).
 */
export type DiagnosticResultsState = {
  answers: Record<string, string>
  score: number
  maxScore: number
  percentage: number
  clientType: ClientType
  urgency: UrgencyLevel
}
