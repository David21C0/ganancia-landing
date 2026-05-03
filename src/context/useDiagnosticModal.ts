import { useContext } from 'react'
import { DiagnosticContext } from './diagnosticContextValue'

export function useDiagnosticModal() {
  const ctx = useContext(DiagnosticContext)
  if (!ctx) {
    throw new Error('useDiagnosticModal must be used within DiagnosticProvider')
  }
  return ctx
}
