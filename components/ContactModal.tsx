'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Transition } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useModal } from '@/context/ModalContext'
import { PHONE } from '@/lib/whatsapp'

const COUNTRY_CODES = [
  { code: '+506', flag: '🇨🇷', label: 'CR' },
  { code: '+57',  flag: '🇨🇴', label: 'CO' },
  { code: '+52',  flag: '🇲🇽', label: 'MX' },
  { code: '+507', flag: '🇵🇦', label: 'PA' },
  { code: '+1',   flag: '🇺🇸', label: 'US' },
  { code: '+54',  flag: '🇦🇷', label: 'AR' },
  { code: '+55',  flag: '🇧🇷', label: 'BR' },
  { code: '+56',  flag: '🇨🇱', label: 'CL' },
  { code: '+34',  flag: '🇪🇸', label: 'ES' },
]

const PLANS = {
  es: [
    { value: 'arranca', label: 'Arranca — $800 USD' },
    { value: 'crece',   label: 'Crece — $2,500 USD' },
    { value: 'sistema', label: 'Sistema — desde $5,000 USD' },
    { value: '',        label: 'No sé aún' },
  ],
  en: [
    { value: 'arranca', label: 'Arranca — $800 USD' },
    { value: 'crece',   label: 'Crece — $2,500 USD' },
    { value: 'sistema', label: 'Sistema — from $5,000 USD' },
    { value: '',        label: 'Not sure yet' },
  ],
}

const PAINS = {
  es: [
    'No tengo presencia digital que trabaje por mí',
    'Tengo algo online pero no convierte bien',
    'Pierdo tiempo respondiendo preguntas repetidas',
    'Necesito un sistema hecho para mi operación',
  ],
  en: [
    "I don't have a digital presence that works for me",
    "I have something online but it doesn't convert well",
    'I waste time answering the same questions over and over',
    'I need a system built for my specific operation',
  ],
}

const COPY = {
  title:    { es: 'Cuéntame sobre tu negocio',          en: 'Tell me about your business'      },
  subtitle: { es: 'Te respondo en menos de 24 horas.',  en: "I'll reply within 24 hours."      },
  name:     { es: 'Nombre completo',                    en: 'Full name'                        },
  email:    { es: 'Email',                              en: 'Email'                            },
  phone:    { es: 'Teléfono',                           en: 'Phone'                            },
  phonePh:  { es: '88668899',                           en: '4155550123'                       },
  business: { es: 'Nombre del negocio',                 en: 'Business name'                    },
  plan:     { es: 'Plan de interés',                    en: 'Plan of interest'                 },
  pains:    { es: '¿Cuál es tu situación?',             en: 'What is your situation?'          },
  submit:   { es: 'Continuar por WhatsApp →',           en: 'Continue on WhatsApp →'           },
  required: { es: 'Completa los campos requeridos.',    en: 'Please fill in the required fields.' },
}

const modalTr: Transition = { duration: 0.35, ease: 'easeOut' }

const INPUT: React.CSSProperties = {
  width: '100%',
  background: '#f0ebe0',
  border: '1px solid rgba(28,18,9,0.14)',
  borderRadius: '8px',
  padding: '10px 14px',
  fontSize: '14px',
  color: '#1c1209',
  outline: 'none',
  fontFamily: 'var(--font-inter), sans-serif',
}

const LABEL: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 600,
  color: '#7a6045',
  marginBottom: '6px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}

function buildMessage(data: {
  name: string; email: string; countryCode: string; phone: string
  business: string; plan: string; pains: string[]
}, lang: 'es' | 'en') {
  if (lang === 'es') {
    return `Hola Jefferson! 👋

*Nombre:* ${data.name}
*Email:* ${data.email}
*Teléfono:* ${data.countryCode} ${data.phone}
*Negocio:* ${data.business}
*Plan:* ${data.plan || 'No sé aún'}

*Mi situación:*
${data.pains.length ? data.pains.map(p => `• ${p}`).join('\n') : '• (sin especificar)'}`
  }
  return `Hi Jefferson! 👋

*Name:* ${data.name}
*Email:* ${data.email}
*Phone:* ${data.countryCode} ${data.phone}
*Business:* ${data.business}
*Plan:* ${data.plan || 'Not sure yet'}

*My situation:*
${data.pains.length ? data.pains.map(p => `• ${p}`).join('\n') : '• (not specified)'}`
}

export default function ContactModal() {
  const { isOpen, closeModal, selectedPlan } = useModal()
  const { lang } = useLanguage()

  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [countryCode, setCC]    = useState('+506')
  const [phone, setPhone]       = useState('')
  const [business, setBusiness] = useState('')
  const [plan, setPlan]         = useState('')
  const [pains, setPains]       = useState<string[]>([])
  const [error, setError]       = useState(false)

  useEffect(() => {
    if (isOpen) { setPlan(selectedPlan); setError(false) }
  }, [isOpen, selectedPlan])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeModal])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const togglePain = (pain: string) =>
    setPains(prev => prev.includes(pain) ? prev.filter(p => p !== pain) : [...prev, pain])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !business.trim()) { setError(true); return }
    const planLabel = PLANS[lang].find(p => p.value === plan)?.label ?? (lang === 'es' ? 'No sé aún' : 'Not sure yet')
    const msg = buildMessage({ name, email, countryCode, phone, business, plan: planLabel, pains }, lang)
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, '_blank')
    closeModal()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeModal}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'rgba(28,14,6,0.65)',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={modalTr}
            style={{
              position: 'fixed', inset: 0, zIndex: 101,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '16px', pointerEvents: 'none',
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                pointerEvents: 'auto',
                width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto',
                background: '#f5f0e8',
                border: '1px solid rgba(28,18,9,0.12)',
                borderRadius: '20px',
                padding: '32px',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1c1209', margin: 0 }}>
                    {COPY.title[lang]}
                  </h2>
                  <p style={{ fontSize: '13px', color: '#7a6045', marginTop: '4px' }}>
                    {COPY.subtitle[lang]}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  style={{
                    background: 'rgba(28,18,9,0.06)',
                    border: '1px solid rgba(28,18,9,0.1)',
                    borderRadius: '8px',
                    width: '32px', height: '32px',
                    cursor: 'pointer', color: '#7a6045', fontSize: '20px',
                    lineHeight: 1, flexShrink: 0, marginLeft: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  aria-label="Cerrar"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={LABEL}>{COPY.name[lang]} *</label>
                  <input type="text" value={name} onChange={e => { setName(e.target.value); setError(false) }}
                    placeholder={lang === 'es' ? 'María García' : 'Maria Garcia'} style={INPUT} required />
                </div>

                <div>
                  <label style={LABEL}>{COPY.email[lang]} *</label>
                  <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(false) }}
                    placeholder="maria@minegocio.com" style={INPUT} required />
                </div>

                <div>
                  <label style={LABEL}>{COPY.phone[lang]}</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select value={countryCode} onChange={e => setCC(e.target.value)}
                      style={{ ...INPUT, width: '110px', flexShrink: 0 }}>
                      {COUNTRY_CODES.map(c => (
                        <option key={c.code} value={c.code} style={{ background: '#f5f0e8' }}>
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                      placeholder={COPY.phonePh[lang]} style={{ ...INPUT, flex: 1 }} />
                  </div>
                </div>

                <div>
                  <label style={LABEL}>{COPY.business[lang]} *</label>
                  <input type="text" value={business} onChange={e => { setBusiness(e.target.value); setError(false) }}
                    placeholder={lang === 'es' ? 'Nombre de tu negocio' : 'Your business name'} style={INPUT} required />
                </div>

                <div>
                  <label style={LABEL}>{COPY.plan[lang]}</label>
                  <select value={plan} onChange={e => setPlan(e.target.value)} style={INPUT}>
                    {PLANS[lang].map(p => (
                      <option key={p.value} value={p.value} style={{ background: '#f5f0e8' }}>{p.label}</option>
                    ))}
                  </select>
                </div>

                {/* Pain checkboxes */}
                <div>
                  <label style={{ ...LABEL, marginBottom: '10px' }}>{COPY.pains[lang]}</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {PAINS[lang].map((pain) => {
                      const checked = pains.includes(pain)
                      return (
                        <label
                          key={pain}
                          style={{
                            display: 'flex', alignItems: 'flex-start', gap: '12px',
                            cursor: 'pointer', padding: '10px 12px', borderRadius: '8px',
                            border: checked ? '1px solid rgba(139,69,19,0.3)' : '1px solid rgba(28,18,9,0.1)',
                            background: checked ? 'rgba(139,69,19,0.06)' : 'rgba(28,18,9,0.025)',
                            transition: 'all 200ms ease',
                          }}
                        >
                          <div
                            style={{
                              width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0, marginTop: '1px',
                              border: checked ? '2px solid #8b4513' : '2px solid rgba(28,18,9,0.2)',
                              background: checked ? '#8b4513' : 'transparent',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'all 200ms ease',
                            }}
                          >
                            {checked && (
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          <input type="checkbox" checked={checked} onChange={() => togglePain(pain)} style={{ display: 'none' }} />
                          <span style={{ fontSize: '13px', color: checked ? '#1c1209' : '#4a3520', lineHeight: 1.5 }}>
                            {pain}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>

                {error && (
                  <p style={{ fontSize: '13px', color: '#a84513', margin: 0 }}>
                    {COPY.required[lang]}
                  </p>
                )}

                <button
                  type="submit"
                  style={{
                    marginTop: '4px', background: '#8b4513', border: 'none',
                    borderRadius: '10px', padding: '14px 24px',
                    fontSize: '15px', fontWeight: 600, color: '#fff',
                    cursor: 'pointer', transition: 'background 200ms ease',
                    fontFamily: 'var(--font-inter), sans-serif',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#b5642a' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#8b4513' }}
                >
                  {COPY.submit[lang]}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
