'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useDiagnostic } from '@/context/DiagnosticContext'
import type { Step } from '@/context/DiagnosticContext'
import { diag } from '@/lib/translations'
import {
  estimate, recommendPlan, findings, formatUSD, fill, Q, TOTAL_QUESTIONS, OTHER_BUSINESS,
} from '@/lib/diagnostic'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { track, trackWhatsAppClick } from '@/lib/analytics'
import OptionList from './OptionList'

const COUNTRY_CODES = [
  { code: '+506', label: 'CR' },
  { code: '+1',   label: 'US/CA' },
  { code: '+507', label: 'PA' },
  { code: '+505', label: 'NI' },
  { code: '+52',  label: 'MX' },
  { code: '+57',  label: 'CO' },
  { code: '+34',  label: 'ES' },
  { code: '+44',  label: 'UK' },
  { code: '+49',  label: 'DE' },
]

const LABEL_CLASS = 'text-[11px] font-semibold uppercase tracking-[0.08em]'
const PRIMARY_BTN =
  'inline-block w-full cursor-pointer rounded-xl bg-accent px-8 py-4 text-center text-base font-semibold text-white transition-colors duration-200 hover:bg-accent-bright sm:w-auto'
const INPUT_BASE =
  'min-w-0 rounded-lg bg-[rgba(28,18,9,0.05)] px-4 py-3 text-base text-text-primary outline-none transition-shadow duration-200 focus:ring-2 focus:ring-accent/40'
const INPUT_CLASS = `${INPUT_BASE} w-full`

const stepKey = (s: Step) => (s.kind === 'question' ? `q${s.index}` : s.kind)

// ── Pantallas ────────────────────────────────────────────────────────

function QuestionScreen({ index }: { index: number }) {
  const { lang } = useLanguage()
  const { answers, answer } = useDiagnostic()
  const [picked, setPicked] = useState<number | null>(null)
  const question = diag.questions[index]

  const select = (option: number) => {
    if (picked !== null) return
    setPicked(option)
    // Pausa breve para que se vea la selección antes de avanzar
    setTimeout(() => answer(index, option), 220)
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold leading-snug text-text-primary md:mb-8 md:text-[1.9rem]">
        {question.q[lang]}
      </h2>
      <OptionList options={question.options} selected={picked ?? answers[index]} onSelect={select} />
    </div>
  )
}

function AnalyzingScreen() {
  const { lang } = useLanguage()
  const { finishAnalysis } = useDiagnostic()
  const [msg, setMsg] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setMsg(1), 950),
      setTimeout(() => setMsg(2), 1900),
      setTimeout(finishAnalysis, 2800),
    ]
    return () => timers.forEach(clearTimeout)
  }, [finishAnalysis])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <div className="h-[2px] w-48 overflow-hidden rounded-full" style={{ background: 'rgba(28,18,9,0.08)' }}>
        <motion.div
          className="h-full bg-accent"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.7, ease: 'easeInOut' }}
        />
      </div>
      <div className="mt-8 h-14">
        <AnimatePresence mode="wait">
          <motion.p
            key={msg}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-lg font-medium text-text-primary md:text-xl"
          >
            {diag.analyzing[msg][lang]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}

function ResultScreen() {
  const { lang } = useLanguage()
  const { answers, goToContact, restart } = useDiagnostic()
  const r = diag.result
  const { lost, yearly } = estimate(answers)
  const planKey = recommendPlan(answers)
  const plan = diag.plans[planKey]
  const found = findings(answers)
  const type = diag.typeShort[answers[Q.type] ?? 0][lang]

  useEffect(() => {
    track('diagnostic_result', { plan: planKey, lost, yearly })
  }, [planKey, lost, yearly])

  return (
    <div>
      <p className={LABEL_CLASS} style={{ color: '#8b4513' }}>{r.eyebrow[lang]}</p>
      <h2 className="mt-3 text-2xl font-bold leading-snug text-text-primary md:text-[1.9rem]">
        {fill((lost === 1 ? r.titleOne : r.titleMany)[lang], { type, n: lost })}
      </h2>

      <p className="mt-8 font-bold tracking-tight" style={{ color: '#8b4513' }}>
        <span className="text-5xl tabular-nums md:text-6xl">≈ {formatUSD(yearly)}</span>
        <span className="ml-2 text-xl md:text-2xl">{r.yearly[lang]}</span>
      </p>
      <p className="mt-2 text-[13px]" style={{ color: '#7a6045' }}>{r.estimate[lang]}</p>
      {answers[Q.channel] === 0 && (
        <p className="mt-5 text-[15px] leading-[1.7]" style={{ color: '#4a3520' }}>{r.platformNote[lang]}</p>
      )}

      <p className={`${LABEL_CLASS} mt-12`} style={{ color: '#7a6045' }}>{r.findingsLabel[lang]}</p>
      <ol className="mt-3">
        {found.map((f, i) => (
          <li
            key={i}
            className="flex gap-4 py-4 text-[16px] leading-[1.6] text-text-primary"
            style={{ borderTop: '1px solid rgba(28,18,9,0.08)' }}
          >
            <span className="shrink-0 pt-0.5 text-[13px] font-semibold tabular-nums" style={{ color: '#8b4513' }}>
              0{i + 1}
            </span>
            {f[lang]}
          </li>
        ))}
      </ol>

      <p className="mt-8 text-lg font-medium leading-[1.6] text-text-primary md:text-xl">{r.transformation[lang]}</p>

      <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(28,18,9,0.12)' }}>
        <p className={LABEL_CLASS} style={{ color: '#7a6045' }}>{r.planLabel[lang]}</p>
        <h3 className="mt-2 text-2xl font-bold text-text-primary md:text-3xl">{plan.name[lang]}</h3>
        <p className="mt-2 text-[15px] leading-[1.7]" style={{ color: '#4a3520' }}>{plan.summary[lang]}</p>
        <p className="mt-5 text-[13px]" style={{ color: '#7a6045' }}>{r.investLabel[lang]}</p>
        <p className="mt-1 text-xl font-bold md:text-2xl" style={{ color: '#8b4513' }}>{plan.price[lang]}</p>
        {plan.guarantee && (
          <p className="mt-5 text-[14px] leading-[1.7]" style={{ color: '#4a3520' }}>{r.guarantee[lang]}</p>
        )}
      </div>

      <div className="mt-10 flex flex-col items-start gap-5">
        <button type="button" onClick={goToContact} className={PRIMARY_BTN}>{r.cta[lang]}</button>
        <button type="button" onClick={restart} className="cursor-pointer text-[13px] underline-offset-4 hover:underline" style={{ color: '#7a6045' }}>
          {r.restart[lang]}
        </button>
      </div>
    </div>
  )
}

function ContactScreen() {
  const { lang } = useLanguage()
  const { answers, form, updateForm } = useDiagnostic()
  const [error, setError] = useState<string | null>(null)
  const c = diag.contact
  const planKey = recommendPlan(answers)
  const plan = diag.plans[planKey]

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.business.trim() || form.phone.replace(/\D/g, '').length < 6) {
      setError(c.errFields[lang]); return
    }
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      setError(c.errEmail[lang]); return
    }
    if (!form.consent) { setError(c.errConsent[lang]); return }

    const opt = (q: number) => {
      const a = answers[q]
      return a === null ? '—' : diag.questions[q].options[a][lang]
    }
    const isCustom = answers[Q.type] === OTHER_BUSINESS
    const { lost, yearly } = estimate(answers)
    const message = fill(diag.message[lang], {
      name: form.name.trim(),
      business: form.business.trim(),
      type: diag.typeShort[answers[Q.type] ?? 0][lang],
      phone: `${form.countryCode} ${form.phone.trim()}`,
      email: form.email.trim() || '—',
      a2: opt(Q.channel), a3: opt(Q.web), a4: opt(Q.google), a5: opt(Q.reply),
      a6: opt(Q.price), a7: opt(Q.volume), a8: opt(Q.goal),
      result: isCustom ? '—' : fill(diag.resultLine[lang], { n: lost, amount: formatUSD(yearly) }),
      plan: plan.name[lang],
      price: plan.price[lang],
    })

    trackWhatsAppClick('diagnostic', { plan: planKey })
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

  const field = (key: 'name' | 'business' | 'email', label: string, type = 'text', autoComplete?: string) => (
    <label className="block">
      <span className="mb-2 block text-[13px] font-medium" style={{ color: '#4a3520' }}>{label}</span>
      <input
        type={type}
        value={form[key]}
        autoComplete={autoComplete}
        onChange={e => { updateForm({ [key]: e.target.value }); setError(null) }}
        className={INPUT_CLASS}
      />
    </label>
  )

  return (
    <form onSubmit={submit} noValidate>
      <p className="text-lg font-medium leading-[1.6] text-text-primary md:text-xl">
        {fill(c.intro[lang], { plan: plan.name[lang], price: plan.investPhrase[lang] })}
      </p>

      <div className="mt-8 flex flex-col gap-5">
        {field('name', `${c.name[lang]} *`, 'text', 'name')}
        {field('business', `${c.business[lang]} *`, 'text', 'organization')}
        <div>
          <span className="mb-2 block text-[13px] font-medium" style={{ color: '#4a3520' }}>{c.phone[lang]} *</span>
          <div className="flex gap-2">
            <select
              value={form.countryCode}
              onChange={e => updateForm({ countryCode: e.target.value })}
              aria-label={c.phone[lang]}
              className={`${INPUT_BASE} w-[132px] shrink-0 px-3`}
            >
              {COUNTRY_CODES.map(cc => (
                <option key={cc.code} value={cc.code}>{cc.code} {cc.label}</option>
              ))}
            </select>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              value={form.phone}
              onChange={e => { updateForm({ phone: e.target.value }); setError(null) }}
              aria-label={c.phone[lang]}
              className={`${INPUT_BASE} flex-1`}
            />
          </div>
        </div>
        {field('email', c.email[lang], 'email', 'email')}

        <label className="flex cursor-pointer items-start gap-3 pt-1">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={e => { updateForm({ consent: e.target.checked }); setError(null) }}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer"
            style={{ accentColor: '#8b4513' }}
          />
          <span className="text-[15px] leading-[1.5] text-text-primary">{c.consent[lang]}</span>
        </label>
      </div>

      {error && <p className="mt-5 text-[14px]" style={{ color: '#a84513' }} role="alert">{error}</p>}

      <button type="submit" className={`${PRIMARY_BTN} mt-8`}>{c.submit[lang]}</button>
    </form>
  )
}

// ── Contenedor ───────────────────────────────────────────────────────

export default function Diagnostic() {
  const { lang } = useLanguage()
  const { isOpen, close, back, step } = useDiagnostic()
  const closeRef = useRef<HTMLButtonElement>(null)
  const ui = diag.ui

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, close])

  const bodyRef = useRef<HTMLDivElement>(null)
  useEffect(() => { bodyRef.current?.scrollTo(0, 0) }, [step])

  const canGoBack =
    (step.kind === 'question' && step.index > 0) || step.kind === 'result' || step.kind === 'contact'

  const progress = step.kind === 'question' ? (step.index + 1) / TOTAL_QUESTIONS : 1
  const label =
    step.kind === 'question'
      ? fill(ui.progress[lang], { n: step.index + 1, total: TOTAL_QUESTIONS })
      : step.kind === 'contact'
        ? ui.contactStep[lang]
        : step.kind === 'result'
          ? ui.resultStep[lang]
          : ''

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[100] hidden md:block"
            style={{ background: 'rgba(28,14,6,0.55)', backdropFilter: 'blur(4px)' }}
          />

          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={diag.result.eyebrow[lang]}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="pointer-events-none fixed inset-0 z-[101] flex md:items-center md:justify-center md:p-6"
          >
            <div className="pointer-events-auto flex h-[100dvh] w-full flex-col overflow-hidden bg-bg md:h-[min(800px,92vh)] md:max-w-[760px] md:rounded-2xl">
              {/* Progreso + navegación */}
              <div className="shrink-0">
                <div className="h-[2px] w-full" style={{ background: 'rgba(28,18,9,0.08)' }}>
                  <motion.div
                    className="h-full bg-accent"
                    initial={false}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
                <div className="grid grid-cols-[1fr_auto_1fr] items-center px-3 py-3 md:px-6">
                  <div>
                    {canGoBack && (
                      <button
                        type="button"
                        onClick={back}
                        className="cursor-pointer rounded-lg px-3 py-2 text-[14px] font-medium transition-colors hover:bg-[rgba(28,18,9,0.05)]"
                        style={{ color: '#4a3520' }}
                      >
                        ← {ui.back[lang]}
                      </button>
                    )}
                  </div>
                  <span className="text-[13px] tabular-nums" style={{ color: '#7a6045' }}>
                    {label}
                  </span>
                  <div className="flex justify-end">
                    <button
                      ref={closeRef}
                      type="button"
                      onClick={close}
                      aria-label={ui.close[lang]}
                      className="grid h-10 w-10 cursor-pointer place-items-center rounded-lg text-2xl leading-none transition-colors hover:bg-[rgba(28,18,9,0.05)]"
                      style={{ color: '#4a3520' }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>

              <div ref={bodyRef} className="flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stepKey(step)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="mx-auto w-full max-w-[600px] px-5 pt-6 pb-12 md:pt-10"
                  >
                    {step.kind === 'question' && <QuestionScreen index={step.index} />}
                    {step.kind === 'analyzing' && <AnalyzingScreen />}
                    {step.kind === 'result' && <ResultScreen />}
                    {step.kind === 'contact' && <ContactScreen />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
