export type ClientType = 'empresa' | 'persona' | 'negocio'

export type UrgencyLevel = 'bajo' | 'medio' | 'alto' | 'critico'

export type DiagnosticFormData = {
  name: string
  orgName: string
  clientType: ClientType
  email: string
  phone: string
  situation: string
  urgency: UrgencyLevel
}

export function emptyDiagnosticForm(clientType: ClientType = 'persona'): DiagnosticFormData {
  return {
    name: '',
    orgName: '',
    clientType,
    email: '',
    phone: '',
    situation: '',
    urgency: 'medio',
  }
}
