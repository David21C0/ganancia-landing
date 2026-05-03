import { Headphones, LineChart, Stethoscope, type LucideIcon } from 'lucide-react'

export type ProcessStep = {
  num: 1 | 2 | 3
  title: string
  desc: string
  icon: LucideIcon
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: 1,
    icon: Stethoscope,
    title: 'Diagnóstico profesional en minutos',
    desc: 'Primero entendemos la situación con una mirada ordenada y realista.',
  },
  {
    num: 2,
    icon: LineChart,
    title: 'Plan de acción personalizado',
    desc: 'Luego definimos prioridades y un plan alineado a tu contexto.',
  },
  {
    num: 3,
    icon: Headphones,
    title: 'Seguimiento continuo',
    desc: 'Acompañamos la ejecución para que las decisiones no se queden solo en papel.',
  },
]
