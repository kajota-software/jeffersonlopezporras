'use client'

import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'
import { SectionLabel } from './SectionLabel'

export default function Contact() {
  const { lang } = useLanguage()
  const c = t.contact

  return (
    <section id="contact" className="border-t border-[#c4b49a]" style={{ background: '#ede8db' }}>
      <div className="mx-auto max-w-[1100px] px-6 py-24">
        <SectionLabel>{c.badge[lang]}</SectionLabel>

        <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
          {/* Contacto principal */}
          <div className="flex flex-col gap-6">
            <h2
              className="text-[2.6rem] font-semibold leading-tight text-[#1c1209] md:text-5xl"
              style={{ fontFamily: 'var(--font-caveat), cursive' }}
            >
              {c.title[lang]}
            </h2>
            <p
              className="text-base leading-relaxed text-[#4a3520]"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
            >
              {c.sub[lang]}
            </p>

            {/* Email + LinkedIn */}
            <div className="flex flex-col gap-3">
              <a
                href="mailto:jefferson.lopez.porras21@gmail.com"
                className="inline-flex items-center gap-2 rounded-lg bg-[#8b4513] px-6 py-3 text-sm font-medium text-[#f5f0e8] transition-all duration-200 hover:bg-[#b5642a] hover:-translate-y-0.5 self-start"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              >
                {c.cta[lang]}
              </a>
              <a
                href="https://www.linkedin.com/in/jeff-lp"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start text-sm italic text-[#7a6045] transition-colors hover:text-[#8b4513]"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
              >
                {c.linkedin_label[lang]}
              </a>
            </div>

            <p
              className="text-xs text-[#7a6045]"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
            >
              jefferson.lopez.porras21@gmail.com
            </p>
          </div>

          {/* Servicios — discreto */}
          <div
            className="flex flex-col gap-4 rounded-lg p-6"
            style={{ background: '#f5f0e8', border: '1px solid #c4b49a' }}
          >
            <h3
              className="text-2xl font-semibold text-[#1c1209]"
              style={{ fontFamily: 'var(--font-caveat), cursive' }}
            >
              {c.services_title[lang]}
            </h3>
            <p
              className="text-sm leading-relaxed text-[#4a3520]"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
            >
              {c.services_text[lang]}
            </p>
            <a
              href="mailto:jefferson.lopez.porras21@gmail.com"
              className="self-start text-sm text-[#8b4513] transition-colors hover:text-[#b5642a]"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              {c.cta[lang]} →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
