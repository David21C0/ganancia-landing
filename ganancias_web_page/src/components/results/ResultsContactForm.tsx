import { useState, type FormEvent } from 'react'
import { FormInput, FormTextarea } from '../forms/fields'
import { Button } from '../ui/Button'
import { getDiagnosticCopy } from '../diagnostic/diagnosticConfig'
import { formatUrgency } from '../../lib/diagnosticScoring'
import type { ClientType, UrgencyLevel } from '../diagnostic/types'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i

type Props = {
  clientType: ClientType
  urgency: UrgencyLevel
  defaultMessage?: string
}

export function ResultsContactForm({
  clientType,
  urgency,
  defaultMessage = '',
}: Props) {
  const copy = getDiagnosticCopy(clientType)
  const [name, setName] = useState('')
  const [orgName, setOrgName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState(defaultMessage)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const err: Record<string, string> = {}
    if (!name.trim()) err.name = 'Indica tu nombre.'
    if (copy.showOrg && !orgName.trim()) err.orgName = 'Indica el nombre requerido.'
    if (!email.trim()) err.email = 'Indica tu correo.'
    else if (!emailRe.test(email.trim())) err.email = 'Correo no válido.'
    if (!phone.trim()) err.phone = 'Indica un teléfono.'
    if (!message.trim()) err.message = 'Escribe un breve mensaje o contexto.'
    setErrors(err)
    if (Object.keys(err).length) return
    setStatus('sending')
    setTimeout(() => setStatus('success'), 600)
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-xl border border-emerald-200 bg-emerald-50/90 p-4 text-center text-sm"
        role="status"
      >
        <p className="font-semibold text-emerald-900">
          Información recibida. Un asesor se pondrá en contacto.
        </p>
      </div>
    )
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit} noValidate>
      <div className="rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2 text-sm">
        <span className="text-slate-500">Urgencia estimada: </span>
        <span className="font-semibold text-brand-900">
          {formatUrgency(urgency)}
        </span>
      </div>
      <FormInput
        label={copy.nameLabel}
        name="r_name"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
          setErrors((o) => ({ ...o, name: '' }))
        }}
        error={errors.name}
        required
        disabled={status === 'sending'}
        autoComplete="name"
      />
      {copy.showOrg ? (
        <FormInput
          label={copy.orgLabel}
          name="r_org"
          value={orgName}
          onChange={(e) => {
            setOrgName(e.target.value)
            setErrors((o) => ({ ...o, orgName: '' }))
          }}
          error={errors.orgName}
          required
          disabled={status === 'sending'}
        />
      ) : null}
      <FormInput
        label="Correo"
        name="r_email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          setErrors((o) => ({ ...o, email: '' }))
        }}
        error={errors.email}
        required
        disabled={status === 'sending'}
        autoComplete="email"
      />
      <FormInput
        label="Teléfono"
        name="r_phone"
        type="tel"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value)
          setErrors((o) => ({ ...o, phone: '' }))
        }}
        error={errors.phone}
        required
        disabled={status === 'sending'}
        autoComplete="tel"
      />
      <FormTextarea
        label="Mensaje o contexto para el asesor"
        name="r_msg"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value)
          setErrors((o) => ({ ...o, message: '' }))
        }}
        error={errors.message}
        required
        disabled={status === 'sending'}
        rows={3}
        placeholder="Prioridades, plazos o dudas que quieras compartir…"
      />
      <input type="hidden" name="urgency" value={urgency} />
      <Button
        type="submit"
        className="w-full"
        disabled={status === 'sending'}
        variant="diagnostico"
        aria-busy={status === 'sending'}
      >
        {status === 'sending' ? 'Enviando…' : 'Enviar información y solicitar asesoría'}
      </Button>
    </form>
  )
}
