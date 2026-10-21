'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from 'react'
import { emptyAnswers, OTHER_BUSINESS, Q, TOTAL_QUESTIONS } from '@/lib/diagnostic'
import type { Answers } from '@/lib/diagnostic'
import { track } from '@/lib/analytics'

export type Step =
  | { kind: 'question'; index: number }
  | { kind: 'analyzing' }
  | { kind: 'result' }
  | { kind: 'contact' }

export interface ContactForm {
  name: string
  business: string
  countryCode: string
  phone: string
  email: string
  consent: boolean
}

interface DiagnosticState {
  answers: Answers
  step: Step
  form: ContactForm
  started: boolean
}

interface DiagnosticContextType extends DiagnosticState {
  isOpen: boolean
  open: () => void
  close: () => void
  answer: (index: number, option: number) => void
  back: () => void
  finishAnalysis: () => void
  goToContact: () => void
  updateForm: (patch: Partial<ContactForm>) => void
  restart: () => void
}

// v2: se agregó la pregunta de cómo lleva reservas y cobros (9 preguntas)
const STORAGE_KEY = 'diagnostico-v2'

const initialState = (): DiagnosticState => ({
  answers: emptyAnswers(),
  step: { kind: 'question', index: 0 },
  form: { name: '', business: '', countryCode: '+506', phone: '', email: '', consent: false },
  started: false,
})

const DiagnosticContext = createContext<DiagnosticContextType | null>(null)

export function DiagnosticProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [state, setState] = useState<DiagnosticState>(initialState)
  const loaded = useRef(false)

  // Lee el progreso guardado en esta sesión la primera vez que se usa el diagnóstico
  const restore = (): DiagnosticState | null => {
    if (loaded.current) return null
    loaded.current = true
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      const saved = JSON.parse(raw) as DiagnosticState
      // Si se cerró durante el análisis, retoma en el resultado
      if (saved.step.kind === 'analyzing') saved.step = { kind: 'result' }
      return saved
    } catch {
      return null
    }
  }

  useEffect(() => {
    if (!loaded.current) return
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch {}
  }, [state])

  const markStarted = (current: DiagnosticState) => {
    if (!current.started) track('diagnostic_start')
  }

  const open = () => {
    const current = restore() ?? state
    markStarted(current)
    setState({ ...current, started: true })
    setIsOpen(true)
  }

  const answer = (index: number, option: number) => {
    const current = restore() ?? state
    markStarted(current)
    track('diagnostic_step', { step: index + 1, total: TOTAL_QUESTIONS })

    const answers = [...current.answers]
    answers[index] = option
    let step: Step
    if (index === Q.type && option === OTHER_BUSINESS) step = { kind: 'contact' }
    else if (index < TOTAL_QUESTIONS - 1) step = { kind: 'question', index: index + 1 }
    else step = { kind: 'analyzing' }

    setState({ ...current, answers, step, started: true })
    setIsOpen(true)
  }

  const back = () => {
    setState(s => {
      const { step } = s
      if (step.kind === 'question' && step.index > 0) return { ...s, step: { kind: 'question', index: step.index - 1 } }
      if (step.kind === 'result') return { ...s, step: { kind: 'question', index: TOTAL_QUESTIONS - 1 } }
      if (step.kind === 'contact') {
        return s.answers[Q.type] === OTHER_BUSINESS
          ? { ...s, step: { kind: 'question', index: 0 } }
          : { ...s, step: { kind: 'result' } }
      }
      return s
    })
  }

  // Estables: los usan efectos del diagnóstico (foco, temporizador del análisis)
  const close = useCallback(() => setIsOpen(false), [])
  const finishAnalysis = useCallback(() => setState(s => ({ ...s, step: { kind: 'result' } })), [])

  const value: DiagnosticContextType = {
    ...state,
    isOpen,
    open,
    close,
    answer,
    back,
    finishAnalysis,
    goToContact: () => setState(s => ({ ...s, step: { kind: 'contact' } })),
    updateForm: patch => setState(s => ({ ...s, form: { ...s.form, ...patch } })),
    restart: () => setState({ ...initialState(), started: true }),
  }

  return <DiagnosticContext.Provider value={value}>{children}</DiagnosticContext.Provider>
}

export function useDiagnostic() {
  const ctx = useContext(DiagnosticContext)
  if (!ctx) throw new Error('useDiagnostic debe usarse dentro de DiagnosticProvider')
  return ctx
}
