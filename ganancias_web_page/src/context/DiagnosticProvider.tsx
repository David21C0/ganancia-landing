import { useCallback, useMemo, useState, type ReactNode } from 'react'
import type { ClientType } from '../components/diagnostic/types'
import { DiagnosticContext } from './diagnosticContextValue'

export function DiagnosticProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [pendingClientType, setPendingClientType] = useState<ClientType | null>(null)

  const open = useCallback(() => {
    setPendingClientType(null)
    setIsOpen(true)
  }, [])

  const openWithClientType = useCallback((t: ClientType) => {
    setPendingClientType(t)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setPendingClientType(null)
  }, [])

  const toggle = useCallback(() => {
    setIsOpen((v) => {
      if (v) setPendingClientType(null)
      return !v
    })
  }, [])

  const clearPendingClientType = useCallback(() => {
    setPendingClientType(null)
  }, [])

  const value = useMemo(
    () => ({
      isOpen,
      open,
      openWithClientType,
      close,
      toggle,
      pendingClientType,
      clearPendingClientType,
    }),
    [
      isOpen,
      open,
      openWithClientType,
      close,
      toggle,
      pendingClientType,
      clearPendingClientType,
    ],
  )

  return (
    <DiagnosticContext.Provider value={value}>
      {children}
    </DiagnosticContext.Provider>
  )
}
