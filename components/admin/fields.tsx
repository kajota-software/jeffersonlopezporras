import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { HELP, INPUT, LABEL } from '@/components/admin/styles'

type Common = { name: string; label: string; error?: string; help?: ReactNode; className?: string }

// Envoltura con label asociado, ayuda y error en texto conectado por aria-describedby
function Wrap({ name, label, error, help, className, children }: Common & { children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={`f-${name}`} className={LABEL}>{label}</label>
      {children}
      {help && !error && <p id={`f-${name}-help`} className={HELP}>{help}</p>}
      {error && <p id={`f-${name}-error`} className="mt-1.5 text-[13px]" style={{ color: '#9b2c1f' }}>{error}</p>}
    </div>
  )
}

const a11y = (name: string, error?: string, help?: ReactNode) => ({
  id: `f-${name}`,
  name,
  'aria-invalid': error ? true : undefined,
  'aria-describedby': error ? `f-${name}-error` : help ? `f-${name}-help` : undefined,
})

export function TextField({ name, label, error, help, className, ...rest }: Common & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrap name={name} label={label} error={error} help={help} className={className}>
      <input {...rest} {...a11y(name, error, help)} className={INPUT} />
    </Wrap>
  )
}

export function TextArea({ name, label, error, help, className, ...rest }: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrap name={name} label={label} error={error} help={help} className={className}>
      <textarea rows={4} {...rest} {...a11y(name, error, help)} className={`${INPUT} leading-[1.6]`} />
    </Wrap>
  )
}

export function SelectField({
  name, label, error, help, className, options, ...rest
}: Common & SelectHTMLAttributes<HTMLSelectElement> & { options: { value: string; label: string }[] }) {
  return (
    <Wrap name={name} label={label} error={error} help={help} className={className}>
      <select {...rest} {...a11y(name, error, help)} className={INPUT}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </Wrap>
  )
}

// Convierte un mapa { valor: etiqueta } en opciones de select
export const toOptions = (map: Record<string, string>) => Object.entries(map).map(([value, label]) => ({ value, label }))
