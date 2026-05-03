import { createContext } from 'react'
import type { ClientType } from '../components/diagnostic/types'

export type DiagnosticContextValue = {
  isOpen: boolean
  open: () => void
  openWithClientType: (t: ClientType) => void
  close: () => void
  toggle: () => void
  pendingClientType: ClientType | null
  clearPendingClientType: () => void
}

export const DiagnosticContext = createContext<DiagnosticContextValue | null>(null)
