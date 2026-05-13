'use client'

import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'
import { SectionLabel } from './SectionLabel'
import CalendlyWidget from './CalendlyWidget'

export default function Contact() {
  const { lang } = useLanguage()
  const c = t.contact

  return (
    <section id="contact" className="mx-auto max-w-[1100px] px-6 py-24">
      <SectionLabel>{c.badge[lang]}</SectionLabel>

      {/* Header de sección */}
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-end">
        <div>
          <h2
            className="text-[2.6rem] font-semibold leading-tight text-[#1c1209] md:text-5xl"
            style={{ fontFamily: 'var(--font-caveat), cursive' }}
          >
            {c.title[lang]}
          </h2>
          <p
            className="mt-4 text-base leading-relaxed text-[#4a3520]"
            style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
          >
            {c.sub[lang]}
          </p>
        </div>

        {/* Trust signals */}
        <div
          className="flex flex-col gap-2 rounded-lg p-5"
          style={{ background: '#ede8db', border: '1px solid #c4b49a' }}
        >
          {[c.trust1[lang], c.trust2[lang], c.trust3[lang]].map((item) => (
            <p
              key={item}
              className="text-sm text-[#4a3520]"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
            >
              {item}
            </p>
          ))}
        </div>
      </div>

      {/* ── Calendly inline widget ── */}
      <div
        className="mt-10 overflow-hidden rounded-lg"
        style={{ border: '1px solid #c4b49a' }}
      >
        <CalendlyWidget />
      </div>

      {/* Fallback — email + LinkedIn */}
      <div
        className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg px-6 py-4"
        style={{ background: '#ede8db', border: '1px solid #c4b49a' }}
      >
        <div>
          <p
            className="text-xs text-[#7a6045] mb-1"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            {c.email_label[lang]}
          </p>
          <a
            href="mailto:jefferson.lopez.porras21@gmail.com"
            className="text-sm text-[#8b4513] transition-colors hover:text-[#b5642a]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            jefferson.lopez.porras21@gmail.com
          </a>
        </div>
        <a
          href="https://www.linkedin.com/in/jeff-lp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm italic transition-colors text-[#7a6045] hover:text-[#8b4513]"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
        >
          {c.linkedin_label[lang]}
        </a>
      </div>
    </section>
  )
}
