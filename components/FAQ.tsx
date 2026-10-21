'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'
import type { L } from '@/lib/translations'

function FAQItem({ id, q, a, isOpen, onToggle }: { id: string; q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(28,18,9,0.09)' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-5 text-left cursor-pointer"
        aria-expanded={isOpen}
        aria-controls={id}
        style={{ background: 'none', border: 'none' }}
      >
        <span className="text-[15px] font-medium" style={{ color: '#1c1209' }}>{q}</span>
        <span
          className="shrink-0 text-xl font-light transition-transform duration-200"
          style={{
            color: '#8b4513',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            lineHeight: 1,
          }}
          aria-hidden
        >
          +
        </span>
      </button>

      {/* La respuesta siempre está en el HTML; solo se muestra u oculta */}
      <div id={id} hidden={!isOpen} className="faq-answer">
        <p className="pb-5 text-[15px] leading-[1.75]" style={{ color: '#4a3520' }}>{a}</p>
      </div>
    </div>
  )
}

interface FAQProps {
  id?: string
  title?: L
  questions?: { q: L; a: L }[]
}

const DEFAULT_TITLE: L = { es: 'Preguntas frecuentes', en: 'Frequently asked questions' }

export default function FAQ({ id = 'faq', title = DEFAULT_TITLE, questions = t.faq.questions }: FAQProps) {
  const { lang } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id={id} className="py-28 section-border">
      <div className="mx-auto max-w-[720px] px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: '#1c1209' }}>
          {title[lang]}
        </h2>

        <div style={{ borderTop: '1px solid rgba(28,18,9,0.09)' }}>
          {questions.map((item, i) => (
            <FAQItem
              key={i}
              id={`${id}-${i}`}
              q={item.q[lang]}
              a={item.a[lang]}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
