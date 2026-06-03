'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Transition } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'

const answerTr: Transition = { duration: 0.3, ease: 'easeInOut' }

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(28,18,9,0.09)' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-5 text-left cursor-pointer"
        aria-expanded={isOpen}
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

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={answerTr}
            style={{ overflow: 'hidden' }}
          >
            <p className="pb-5 text-[14px] leading-[1.75]" style={{ color: '#7a6045' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const { lang } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-28 section-border">
      <div className="mx-auto max-w-[720px] px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: '#1c1209' }}>
          {lang === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions'}
        </h2>

        <div style={{ borderTop: '1px solid rgba(28,18,9,0.09)' }}>
          {t.faq.questions.map((item, i) => (
            <FAQItem
              key={i}
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
