import type { ClientType } from './types'

export type QuestionOption = {
  value: string
  label: string
  score: number
}

export type Question = {
  id: string
  question: string
  options: QuestionOption[]
}

export const questionnaireMeta: Record<
  ClientType,
  { title: string; description: string }
> = {
  empresa: {
    title: 'Diagnóstico empresarial',
    description: 'Evalúa la salud integral de tu organización en unas preguntas.',
  },
  persona: {
    title: 'Diagnóstico de perfil personal',
    description:
      'Evalúa tu situación financiera, ahorro e inversión con criterio.',
  },
  negocio: {
    title: 'Diagnóstico de negocio / emprendimiento',
    description: 'Analiza crecimiento, posicionamiento y salud de tu operación.',
  },
}

const empresa: Question[] = [
  {
    id: 'q1',
    question: '¿Cuál es el principal desafío que enfrenta tu empresa actualmente?',
    options: [
      { value: 'a', label: 'Falta de organización y procesos claros', score: 3 },
      { value: 'b', label: 'Dificultades financieras o de flujo de caja', score: 2 },
      { value: 'c', label: 'Problemas de comunicación interna', score: 5 },
      { value: 'd', label: 'Competencia en el mercado', score: 7 },
      { value: 'e', label: 'No tenemos desafíos significativos', score: 10 },
    ],
  },
  {
    id: 'q2',
    question: '¿Cómo calificarías la eficiencia de tus procesos operativos?',
    options: [
      { value: 'a', label: 'Muy ineficientes, con muchos cuellos de botella', score: 2 },
      { value: 'b', label: 'Poco eficientes, necesitan mejoras importantes', score: 4 },
      { value: 'c', label: 'Moderadamente eficientes, con margen de mejora', score: 6 },
      { value: 'd', label: 'Bastante eficientes, solo ajustes menores', score: 8 },
      { value: 'e', label: 'Muy eficientes y optimizados', score: 10 },
    ],
  },
  {
    id: 'q3',
    question: '¿Tu empresa tiene un plan estratégico definido y actualizado?',
    options: [
      { value: 'a', label: 'No tenemos ningún plan estratégico', score: 1 },
      { value: 'b', label: 'Tenemos uno, pero está desactualizado', score: 4 },
      { value: 'c', label: 'Tenemos uno básico sin revisión regular', score: 6 },
      { value: 'd', label: 'Sí, con revisiones anuales', score: 8 },
      { value: 'e', label: 'Sí, actualizado y con seguimiento trimestral', score: 10 },
    ],
  },
]

const persona: Question[] = [
  {
    id: 'q1',
    question: '¿Cómo calificarías tu nivel actual de conocimiento en inversiones?',
    options: [
      { value: 'a', label: 'Muy básico, no sé por dónde empezar', score: 2 },
      { value: 'b', label: 'Bajo, conozco solo ahorro tradicional', score: 4 },
      { value: 'c', label: 'Moderado, tengo algunas inversiones', score: 6 },
      { value: 'd', label: 'Alto, diversifico mis inversiones', score: 8 },
      { value: 'e', label: 'Muy alto, gestiono activamente mi portafolio', score: 10 },
    ],
  },
  {
    id: 'q2',
    question: '¿Tienes un plan financiero personal estructurado?',
    options: [
      { value: 'a', label: 'No tengo ningún plan financiero', score: 1 },
      { value: 'b', label: 'Solo controlo gastos básicos', score: 3 },
      { value: 'c', label: 'Tengo metas pero sin estrategia clara', score: 6 },
      { value: 'd', label: 'Plan documentado con objetivos a mediano plazo', score: 8 },
      { value: 'e', label: 'Estrategia integral con revisión periódica', score: 10 },
    ],
  },
  {
    id: 'q3',
    question: '¿Has evaluado proyectos económicos o emprendimientos personales?',
    options: [
      { value: 'a', label: 'Nunca he considerado emprender', score: 1 },
      { value: 'b', label: 'Tengo ideas pero no las he analizado', score: 4 },
      { value: 'c', label: 'He evaluado opciones sin concretar', score: 6 },
      { value: 'd', label: 'Tengo proyectos en marcha con seguimiento', score: 8 },
      { value: 'e', label: 'Gestiono múltiples proyectos rentables', score: 10 },
    ],
  },
]

const negocio: Question[] = [
  {
    id: 'q1',
    question: '¿Cuál es tu tasa de crecimiento en los últimos 12 meses?',
    options: [
      { value: 'a', label: 'Decrecimiento significativo (más de -10%)', score: 1 },
      { value: 'b', label: 'Decrecimiento leve (0% a -10%)', score: 3 },
      { value: 'c', label: 'Estable o crecimiento mínimo (0% a 5%)', score: 6 },
      { value: 'd', label: 'Crecimiento moderado (5% a 15%)', score: 8 },
      { value: 'e', label: 'Crecimiento acelerado (más de 15%)', score: 10 },
    ],
  },
  {
    id: 'q2',
    question: '¿Tienes definido tu diferenciador competitivo?',
    options: [
      { value: 'a', label: 'No sabemos qué nos diferencia', score: 2 },
      { value: 'b', label: 'Tenemos ideas pero no están claras', score: 4 },
      { value: 'c', label: 'Diferenciador identificado pero no comunicado', score: 6 },
      { value: 'd', label: 'Bien definido y comunicado internamente', score: 8 },
      { value: 'e', label: 'Claramente posicionado en el mercado', score: 10 },
    ],
  },
  {
    id: 'q3',
    question: '¿Qué tan diversificadas están tus fuentes de ingreso?',
    options: [
      { value: 'a', label: 'Un solo producto/servicio o cliente principal', score: 2 },
      { value: 'b', label: '2-3 fuentes con alta concentración', score: 4 },
      { value: 'c', label: 'Diversificación moderada', score: 6 },
      { value: 'd', label: 'Buena diversificación de ingresos', score: 8 },
      { value: 'e', label: 'Múltiples fuentes bien balanceadas', score: 10 },
    ],
  },
]

const byType: Record<ClientType, Question[]> = {
  empresa,
  persona,
  negocio,
}

export function getQuestionsForClientType(t: ClientType): Question[] {
  return byType[t]
}
