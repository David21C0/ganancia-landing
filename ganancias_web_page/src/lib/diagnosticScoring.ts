import type { UrgencyLevel } from '../components/diagnostic/types'

type ScoringQuestion = {
  id: string
  options: { value: string; score: number }[]
}

export function computeDiagnosticScore(
  questions: ScoringQuestion[],
  answers: Record<string, string>,
) {
  let score = 0
  for (const q of questions) {
    const v = answers[q.id]
    const opt = q.options.find((o) => o.value === v)
    if (opt) score += opt.score
  }
  const maxPerQuestion = 10
  const maxScore = questions.length * maxPerQuestion
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0
  return { score, maxScore, percentage }
}

/**
 * A menor puntuación (peor desempeño en el cuestionario), mayor urgencia de acompañamiento.
 */
export function percentageToUrgency(percentage: number): UrgencyLevel {
  if (percentage >= 70) return 'bajo'
  if (percentage >= 55) return 'medio'
  if (percentage >= 40) return 'alto'
  return 'critico'
}

const urgencyLabel: Record<UrgencyLevel, string> = {
  bajo: 'Bajo',
  medio: 'Medio',
  alto: 'Alto',
  critico: 'Crítico',
}

export function formatUrgency(urgency: UrgencyLevel): string {
  return urgencyLabel[urgency]
}

export type StatusTone = 'success' | 'warning' | 'danger'

type StatusInfo = {
  level: string
  tone: StatusTone
  description: string
  recommendations: [string, string, string]
}

/**
 * Misma lógica de umbrales que synergy-quest-pro (ResultsDisplay).
 */
export function getDiagnosticStatus(percentage: number): StatusInfo {
  if (percentage >= 70) {
    return {
      level: 'Potenciado',
      tone: 'success',
      description:
        'Tu organización o perfil muestra indicadores favorables. Con ajustes puntuales, puedes reforzar la sostenibilidad.',
      recommendations: [
        'Mantén el foco en las decisiones y hábitos que hoy te funcionan',
        'Identifica riesgos residuales y revísalos periódicamente',
        'Acompaña los cambios con un plan sencillo y medible',
      ],
    }
  }
  if (percentage >= 40) {
    return {
      level: 'Estable',
      tone: 'warning',
      description:
        'Hay bases sólidas, pero existen frentes que conviene atender con prioridad y claridad.',
      recommendations: [
        'Prioriza los temas con mayor impacto o exposición inmediata',
        'Baja la complejidad: define 2 o 3 acciones con plazo y responsable',
        'Establece un tablero mínimo (flujo, obligaciones, riesgos) para dar seguimiento',
      ],
    }
  }
  return {
    level: 'En Riesgo',
    tone: 'danger',
    description:
      'Se han identificado señales que requieren atención oportuna para contener riesgos y retomar gobernanza en las finanzas.',
    recommendations: [
      'Aborda primero la liquidez, obligaciones inmediatas y caja',
      'Busca asesoría acompañada: diagnóstico, priorización y un plan concreto',
      'Comunica con transparencia a partes clave; evita aplazar decisiones críticas',
    ],
  }
}
