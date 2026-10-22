import type { FormField } from '@/lib/admin/collections'

const INPUT =
  'w-full min-h-12 rounded-lg bg-[rgba(28,18,9,0.05)] px-4 py-3 text-base text-text-primary outline-none transition-shadow duration-200 focus:ring-2 focus:ring-accent/40 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-[#9b2c1f]/50 disabled:cursor-not-allowed'
const CHOICE = 'flex min-h-11 cursor-pointer items-center gap-3 text-[16px] text-text-primary'
const RADIO_LIMIT = 6 // con pocas opciones se muestran todas (más fácil en celular)

const INPUT_TYPE: Partial<Record<FormField['type'], { type: string; autoComplete?: string; inputMode?: 'tel' | 'email' | 'decimal' }>> = {
  text: { type: 'text' },
  email: { type: 'email', autoComplete: 'email', inputMode: 'email' },
  phone: { type: 'tel', autoComplete: 'tel', inputMode: 'tel' },
  number: { type: 'text', inputMode: 'decimal' },
  date: { type: 'date' },
}

// Preguntas de un formulario: lo usan /f/[slug] y la vista previa del constructor.
// Nombres de campo: a.<id>. Con `disabled` es solo de muestra.
export default function FormRenderer({ fields, errors = {}, disabled = false, idPrefix = 'q' }: {
  fields: FormField[]
  errors?: Record<string, string>
  disabled?: boolean
  idPrefix?: string
}) {
  return (
    <div className="flex flex-col gap-8">
      {fields.map((f, i) => {
        const name = `a.${f.id}`
        const id = `${idPrefix}-${f.id}`
        const error = errors[name]
        const describedBy = [f.help && `${id}-help`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
        const label = (
          <>
            <span className="mr-2 text-[13px] font-semibold tabular-nums text-accent">{i + 1}.</span>
            {f.label}
            {f.required && <span className="text-accent" aria-hidden> *</span>}
            {f.required && <span className="sr-only"> (obligatoria)</span>}
          </>
        )
        const help = f.help && <p id={`${id}-help`} className="mt-1.5 text-[14px] leading-[1.5] text-text-muted">{f.help}</p>
        const err = error && <p id={`${id}-error`} className="mt-2 text-[14px]" style={{ color: '#9b2c1f' }}>{error}</p>

        // Opciones (radios o casillas) dentro de un fieldset con legend
        if (f.type === 'multiselect' || (f.type === 'select' && f.options.length <= RADIO_LIMIT)) {
          const multi = f.type === 'multiselect'
          return (
            <fieldset key={f.id} aria-describedby={describedBy} aria-invalid={error ? true : undefined}>
              <legend className="text-[16px] font-medium leading-snug text-text-primary">{label}</legend>
              {help}
              <div className="mt-2 flex flex-col">
                {f.options.map(opt => (
                  <label key={opt} className={CHOICE}>
                    <input
                      type={multi ? 'checkbox' : 'radio'}
                      name={name}
                      value={opt}
                      disabled={disabled}
                      required={!multi && f.required}
                      className="h-5 w-5 shrink-0 cursor-pointer"
                      style={{ accentColor: '#8b4513' }}
                    />
                    {opt}
                  </label>
                ))}
              </div>
              {err}
            </fieldset>
          )
        }

        if (f.type === 'checkbox') {
          return (
            <div key={f.id}>
              <label className={CHOICE}>
                <input
                  type="checkbox"
                  name={name}
                  disabled={disabled}
                  aria-describedby={describedBy}
                  aria-invalid={error ? true : undefined}
                  className="h-5 w-5 shrink-0 cursor-pointer"
                  style={{ accentColor: '#8b4513' }}
                />
                <span>{label}</span>
              </label>
              {help}
              {err}
            </div>
          )
        }

        const common = { id, name, disabled, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined, required: f.required }
        return (
          <div key={f.id}>
            <label htmlFor={id} className="mb-2 block text-[16px] font-medium leading-snug text-text-primary">{label}</label>
            {help && <div className="-mt-1 mb-2">{help}</div>}
            {f.type === 'textarea' ? (
              <textarea {...common} rows={4} className={`${INPUT} leading-[1.6]`} />
            ) : f.type === 'select' ? (
              <select {...common} defaultValue="" className={INPUT}>
                <option value="" disabled>Elija una opción</option>
                {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : (
              <input {...common} {...INPUT_TYPE[f.type]} className={INPUT} />
            )}
            {err}
          </div>
        )
      })}
    </div>
  )
}
