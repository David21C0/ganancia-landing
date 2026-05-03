export type IllustrativeRiskId = 'estable' | 'moderado' | 'alto' | 'critico'

export type IllustrativeScenario = {
  id: IllustrativeRiskId
  tab: string
  estado: string
  riesgo: string
  flujo: string
  accion: string
  accionDetalle: string
  outerRing: string
  badgeClass: string
}

export const HERO_ILLUSTRATIVE_SCENARIOS: IllustrativeScenario[] = [
  {
    id: 'estable',
    tab: 'Ej. estable',
    estado: 'En buen camino',
    riesgo: 'Bajo',
    flujo: 'Liquidez suficiente para el corto plazo',
    accion: 'Optimizar y planificar',
    accionDetalle:
      'Mantener hábitos y revisar oportunidades de crecimiento con tu asesor.',
    outerRing: 'border-emerald-500/35 shadow-emerald-900/25',
    badgeClass: 'bg-emerald-500/25 text-emerald-200 ring-emerald-400/40',
  },
  {
    id: 'moderado',
    tab: 'Ej. moderado',
    estado: 'Requiere atención',
    riesgo: 'Moderado',
    flujo: 'Tendencia bajo control con medidas puntuales',
    accion: 'Próxima acción recomendada',
    accionDetalle:
      'Completar el diagnóstico inicial y revisar prioridades con tu asesor.',
    outerRing: 'border-amber-500/35 shadow-amber-950/20',
    badgeClass: 'bg-amber-500/25 text-amber-200 ring-amber-400/40',
  },
  {
    id: 'alto',
    tab: 'Ej. alto',
    estado: 'Priorizar ajustes',
    riesgo: 'Alto',
    flujo: 'Presión en liquidez; conviene ordenar pagos',
    accion: 'Plan de contención',
    accionDetalle:
      'Definir calendario de pagos y reducir fugas de caja con seguimiento cercano.',
    outerRing: 'border-orange-500/40 shadow-orange-950/25',
    badgeClass: 'bg-orange-500/25 text-orange-100 ring-orange-400/45',
  },
  {
    id: 'critico',
    tab: 'Ej. crítico',
    estado: 'Intervención urgente',
    riesgo: 'Crítico',
    flujo: 'Riesgo de quiebra de tesorería si no se actúa',
    accion: 'Contacto prioritario',
    accionDetalle:
      'Diagnóstico completo y revisión inmediata con especialista.',
    outerRing: 'border-red-500/45 shadow-red-950/30',
    badgeClass: 'bg-red-500/25 text-red-100 ring-red-400/50',
  },
]
