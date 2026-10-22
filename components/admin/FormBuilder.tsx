'use client'

import { useMemo, useState } from 'react'
import FormRenderer from '@/components/forms/FormRenderer'
import SubmitButton from '@/components/admin/SubmitButton'
import FormNotice from '@/components/admin/FormNotice'
import { useActionForm } from '@/components/admin/useActionForm'
import { BTN_SECONDARY, DIVIDER, INPUT, LABEL, META } from '@/components/admin/styles'
import { FORM_FIELD_TYPE, FORM_FIELD_TYPES } from '@/lib/admin/constants'
import type { FormFieldType } from '@/lib/admin/constants'
import { CLIENT_TARGETS, PROJECT_TARGETS, newFieldId } from '@/lib/admin/templates/form'
import type { FormField } from '@/lib/admin/collections'
import type { ActionState } from '@/lib/admin/action-state'

const WITH_OPTIONS: FormFieldType[] = ['select', 'multiselect']

// Constructor: las preguntas se editan en memoria y se guardan todas juntas
export default function FormBuilder({ initial, action }: {
  initial: FormField[]
  action: (prev: ActionState, fd: FormData) => Promise<ActionState>
}) {
  const { state, pending, formRef, onSubmit } = useActionForm(action)
  const [fields, setFields] = useState<FormField[]>(initial)
  const [saved, setSaved] = useState(JSON.stringify(initial))
  const [preview, setPreview] = useState(false)
  const json = useMemo(() => JSON.stringify(fields), [fields])
  const dirty = json !== saved
  // El error aplica a lo que se intentó guardar; si después se edita, vuelve el aviso de cambios
  const [errorJson, setErrorJson] = useState<string | null>(null)
  const hasError = !state.ok && !!state.message && errorJson === json

  // Al guardar bien, lo actual pasa a ser "lo guardado" (ajuste de estado durante el render, sin efecto)
  const [lastState, setLastState] = useState(state)
  if (state !== lastState) {
    setLastState(state)
    if (state.ok) setSaved(json)
    else setErrorJson(json)
  }

  const update = (i: number, patch: Partial<FormField>) => setFields(list => list.map((f, j) => (j === i ? { ...f, ...patch } : f)))
  const move = (i: number, dir: -1 | 1) =>
    setFields(list => {
      const next = [...list]
      const j = i + dir
      if (j < 0 || j >= next.length) return list
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
  const remove = (i: number) => {
    if (confirm(`¿Eliminar la pregunta ${i + 1}?`)) setFields(list => list.filter((_, j) => j !== i))
  }
  const add = () => setFields(list => [...list, { id: newFieldId(), type: 'text', label: '', help: '', required: false, options: [], mapsTo: null }])

  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
      <input type="hidden" name="fields" value={json} />

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => setPreview(p => !p)} aria-pressed={preview} className={BTN_SECONDARY}>
          {preview ? 'Volver a editar' : 'Vista previa'}
        </button>
        <span className={META}>{fields.length} {fields.length === 1 ? 'pregunta' : 'preguntas'}</span>
      </div>

      {preview ? (
        <div className="py-2">
          {fields.length === 0 ? <p className={META}>Todavía no hay preguntas.</p> : <FormRenderer fields={fields} disabled idPrefix="preview" />}
        </div>
      ) : (
        <ol className="flex flex-col">
          {fields.map((f, i) => (
            <li key={f.id} className="flex flex-col gap-4 py-6" style={{ borderTop: DIVIDER }}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[13px] font-semibold tabular-nums text-accent">Pregunta {i + 1}</span>
                <div className="flex gap-2">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className={BTN_SECONDARY} aria-label={`Subir pregunta ${i + 1}`}>Subir</button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === fields.length - 1} className={BTN_SECONDARY} aria-label={`Bajar pregunta ${i + 1}`}>Bajar</button>
                  <button type="button" onClick={() => remove(i)} className={BTN_SECONDARY} aria-label={`Eliminar pregunta ${i + 1}`}>Eliminar</button>
                </div>
              </div>

              <div>
                <label htmlFor={`label-${f.id}`} className={LABEL}>Pregunta</label>
                <input id={`label-${f.id}`} value={f.label} onChange={e => update(i, { label: e.target.value })} className={INPUT} placeholder="¿Cómo se llama su negocio?" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor={`type-${f.id}`} className={LABEL}>Tipo de respuesta</label>
                  <select id={`type-${f.id}`} value={f.type} onChange={e => update(i, { type: e.target.value as FormFieldType })} className={INPUT}>
                    {FORM_FIELD_TYPES.map(t => <option key={t} value={t}>{FORM_FIELD_TYPE[t]}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor={`maps-${f.id}`} className={LABEL}>Al importar, se guarda en</label>
                  <select id={`maps-${f.id}`} value={f.mapsTo ?? ''} onChange={e => update(i, { mapsTo: e.target.value || null })} className={INPUT}>
                    <option value="">No se guarda (solo se lee)</option>
                    <optgroup label="Cliente">
                      {CLIENT_TARGETS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </optgroup>
                    <optgroup label="Proyecto">
                      {PROJECT_TARGETS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </optgroup>
                  </select>
                </div>
              </div>

              {WITH_OPTIONS.includes(f.type) && (
                <div>
                  <label htmlFor={`options-${f.id}`} className={LABEL}>Opciones</label>
                  <textarea
                    id={`options-${f.id}`}
                    rows={3}
                    // Se guarda tal cual al escribir; las líneas vacías se limpian al validar en el servidor
                    value={f.options.join('\n')}
                    onChange={e => update(i, { options: e.target.value.split('\n') })}
                    onBlur={() => update(i, { options: f.options.map(o => o.trim()).filter(Boolean) })}
                    aria-describedby={`options-${f.id}-help`}
                    className={`${INPUT} leading-[1.6]`}
                  />
                  <p id={`options-${f.id}-help`} className="mt-1.5 text-[12px] text-text-muted">Una opción por línea.</p>
                </div>
              )}

              <div>
                <label htmlFor={`help-${f.id}`} className={LABEL}>Ayuda (opcional)</label>
                <input id={`help-${f.id}`} value={f.help} onChange={e => update(i, { help: e.target.value })} className={INPUT} placeholder="Texto pequeño debajo de la pregunta" />
              </div>

              <label className="flex min-h-11 w-fit cursor-pointer items-center gap-3 text-[15px] text-text-primary">
                <input type="checkbox" checked={f.required} onChange={e => update(i, { required: e.target.checked })} className="h-5 w-5 cursor-pointer" style={{ accentColor: '#8b4513' }} />
                Obligatoria
              </label>
            </li>
          ))}
        </ol>
      )}

      {!preview && (
        <button type="button" onClick={add} className={`${BTN_SECONDARY} w-fit`}>Agregar pregunta</button>
      )}

      <div className="sticky bottom-0 -mx-4 flex flex-wrap items-center gap-4 bg-bg px-4 py-4 sm:mx-0 sm:px-0" style={{ borderTop: DIVIDER }}>
        <SubmitButton pending={pending}>Guardar preguntas</SubmitButton>
        {/* Un error siempre se muestra; si no hay error, el aviso de cambios pendientes */}
        {hasError || !dirty ? <FormNotice state={state} /> : !pending && <p className="text-[14px] font-medium text-accent">Hay cambios sin guardar.</p>}
      </div>
    </form>
  )
}
