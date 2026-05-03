import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react'

function fieldClass(error?: string) {
  return [
    'w-full rounded-xl border bg-white px-4 py-3 text-slate-900',
    'placeholder:text-slate-400',
    'ring-offset-2 transition-shadow',
    'focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 focus:outline-none',
    error ? 'border-red-400' : 'border-slate-200',
  ].join(' ')
}

type FieldLabelProps = {
  children: ReactNode
  id: string
  required?: boolean
}

export function FieldLabel({ children, id, required }: FieldLabelProps) {
  return (
    <label
      htmlFor={id}
      className="mb-1.5 block text-sm font-medium text-slate-800"
    >
      {children}
      {required ? <span className="text-red-500"> *</span> : null}
    </label>
  )
}

type InputFieldProps = {
  id?: string
  label: ReactNode
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

export function FormInput({ id: idProp, label, error, className, ...rest }: InputFieldProps) {
  const genId = useId()
  const id = idProp ?? genId
  const errId = `${id}-error`

  return (
    <div>
      <FieldLabel id={id} required={rest.required}>
        {label}
      </FieldLabel>
      <input
        id={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errId : undefined}
        className={fieldClass(error) + (className ? ` ${className}` : '')}
        {...rest}
      />
      {error ? (
        <p id={errId} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

type TextareaFieldProps = {
  id?: string
  label: ReactNode
  error?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export function FormTextarea({
  id: idProp,
  label,
  error,
  className,
  ...rest
}: TextareaFieldProps) {
  const genId = useId()
  const id = idProp ?? genId
  const errId = `${id}-error`

  return (
    <div>
      <FieldLabel id={id} required={rest.required}>
        {label}
      </FieldLabel>
      <textarea
        id={id}
        rows={4}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errId : undefined}
        className={fieldClass(error) + (className ? ` min-h-[120px] ${className}` : ' min-h-[120px]')}
        {...rest}
      />
      {error ? (
        <p id={errId} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

type SelectFieldProps = {
  id?: string
  label: ReactNode
  error?: string
  children: ReactNode
} & SelectHTMLAttributes<HTMLSelectElement>

export function FormSelect({
  id: idProp,
  label,
  error,
  className,
  children,
  ...rest
}: SelectFieldProps) {
  const genId = useId()
  const id = idProp ?? genId
  const errId = `${id}-error`

  return (
    <div>
      <FieldLabel id={id} required={rest.required}>
        {label}
      </FieldLabel>
      <select
        id={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errId : undefined}
        className={fieldClass(error) + (className ? ` ${className}` : '')}
        {...rest}
      >
        {children}
      </select>
      {error ? (
        <p id={errId} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
