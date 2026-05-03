import { useState, type FormEvent } from 'react'
import { Mail, MapPin, MessageSquare, Phone } from 'lucide-react'
import { FormInput, FormSelect, FormTextarea } from '../forms/fields'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import type { ClientType } from '../diagnostic/types'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i

type FormData = {
  name: string
  email: string
  phone: string
  clientType: ClientType
  message: string
}

const empty: FormData = {
  name: '',
  email: '',
  phone: '',
  clientType: 'persona',
  message: '',
}

type FieldErrors = Partial<Record<keyof FormData, string>>

function validate(data: FormData): FieldErrors {
  const e: FieldErrors = {}
  if (!data.name.trim()) e.name = 'Indica tu nombre.'
  if (!data.email.trim()) e.email = 'Indica tu correo.'
  else if (!emailRe.test(data.email.trim())) e.email = 'Correo no válido.'
  if (!data.phone.trim()) e.phone = 'Indica un teléfono.'
  if (!data.message.trim()) e.message = 'Escribe un mensaje breve.'
  return e
}

const clientOptions: { value: ClientType; label: string }[] = [
  { value: 'empresa', label: 'Empresa' },
  { value: 'persona', label: 'Persona' },
  { value: 'negocio', label: 'Negocio' },
]

const waNumber = '573000000000'
const emailStatic = 'contacto@masganancias.com'

export function Contact() {
  const [data, setData] = useState<FormData>(empty)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }))
    setErrors((er) => ({ ...er, [key]: undefined }))
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault()
    const e = validate(data)
    setErrors(e)
    if (Object.keys(e).length > 0) return
    setStatus('submitting')
    setTimeout(() => {
      setStatus('success')
    }, 500)
  }

  return (
    <section
      id="contacto"
      className="scroll-mt-24 sm:scroll-mt-28 bg-slate-50 py-16 sm:py-20"
      aria-labelledby="contacto-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2
          id="contacto-heading"
          className="text-center text-3xl font-bold text-brand-900 sm:text-4xl"
        >
          Hablemos de tu situación financiera
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
          Cada caso requiere una mirada clara, responsable y estratégica.
          Déjanos tus datos y un asesor podrá orientarte sobre el mejor
          camino.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Card className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Datos de contacto
            </h3>
            <ul className="space-y-3 text-sm text-slate-700" role="list">
              <li className="flex items-start gap-3">
                <Mail
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                  aria-hidden
                />
                <a
                  href={`mailto:${emailStatic}`}
                  className="font-medium text-brand-900 hover:text-emerald-700"
                >
                  {emailStatic}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                  aria-hidden
                />
                <a
                  href={`https://wa.me/${waNumber}`}
                  className="font-medium text-brand-900 hover:text-emerald-700"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  +57 300 000 0000 (WhatsApp)
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                  aria-hidden
                />
                <span>Colombia</span>
              </li>
            </ul>
          </Card>

          <Card>
            {status === 'success' ? (
              <div
                className="rounded-xl border border-emerald-200 bg-emerald-50/90 p-6 text-center"
                role="status"
              >
                <MessageSquare
                  className="mx-auto h-10 w-10 text-emerald-600"
                  aria-hidden
                />
                <p className="mt-3 font-semibold text-emerald-900">
                  Solicitud recibida. Pronto un asesor se pondrá en contacto.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                noValidate
                aria-label="Formulario de contacto"
              >
                <FormInput
                  label="Nombre"
                  name="c_name"
                  autoComplete="name"
                  value={data.name}
                  onChange={(ev) => setField('name', ev.target.value)}
                  error={errors.name}
                  required
                  disabled={status === 'submitting'}
                />
                <FormInput
                  label="Correo"
                  name="c_email"
                  type="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(ev) => setField('email', ev.target.value)}
                  error={errors.email}
                  required
                  disabled={status === 'submitting'}
                />
                <FormInput
                  label="Teléfono"
                  name="c_phone"
                  type="tel"
                  autoComplete="tel"
                  value={data.phone}
                  onChange={(ev) => setField('phone', ev.target.value)}
                  error={errors.phone}
                  required
                  disabled={status === 'submitting'}
                />
                <FormSelect
                  label="Tipo de cliente"
                  name="c_clientType"
                  value={data.clientType}
                  onChange={(ev) =>
                    setField('clientType', ev.target.value as ClientType)
                  }
                  error={errors.clientType}
                  required
                  disabled={status === 'submitting'}
                >
                  {clientOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </FormSelect>
                <FormTextarea
                  label="Mensaje"
                  name="c_message"
                  value={data.message}
                  onChange={(ev) => setField('message', ev.target.value)}
                  error={errors.message}
                  required
                  disabled={status === 'submitting'}
                  rows={4}
                />
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="submit"
                    className="sm:flex-1"
                    disabled={status === 'submitting'}
                    aria-busy={status === 'submitting'}
                  >
                    {status === 'submitting' ? 'Enviando…' : 'Enviar petición'}
                  </Button>
                  <a
                    href={`https://wa.me/${waNumber}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 text-sm font-medium text-brand-900 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                  >
                    Contactar por WhatsApp
                  </a>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
