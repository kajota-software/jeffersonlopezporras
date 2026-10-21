'use client'

import { useLanguage } from '@/context/LanguageContext'
import { useDiagnostic } from '@/context/DiagnosticContext'
import { t, diag } from '@/lib/translations'
import { fill, TOTAL_QUESTIONS } from '@/lib/diagnostic'
import Reveal from '@/components/Reveal'
import OptionList from '@/components/diagnostic/OptionList'

// Muestra la primera pregunta en la página; al responder, el diagnóstico sigue en pantalla completa
export default function DiagnosticSection() {
  const { lang } = useLanguage()
  const { answers, answer } = useDiagnostic()
  const s = t.diagnosticSection

  return (
    <section id="diagnostico" className="py-24 md:py-32 section-border" style={{ background: 'rgba(139,69,19,0.04)' }}>
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        <Reveal>
          <h2 className="font-bold leading-[1.1] tracking-tight text-text-primary" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            {s.h2[lang]}
          </h2>
          <p className="mt-5 text-[1.075rem] leading-[1.75]" style={{ color: '#4a3520' }}>{s.sub[lang]}</p>
          <p className="mt-5 text-[13px]" style={{ color: '#7a6045' }}>{t.cta.trust[lang]}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="text-[13px] tabular-nums" style={{ color: '#7a6045' }}>
            {fill(diag.ui.progress[lang], { n: 1, total: TOTAL_QUESTIONS })}
          </p>
          <h3 className="mt-3 mb-5 text-2xl font-bold leading-snug text-text-primary">{diag.questions[0].q[lang]}</h3>
          <OptionList options={diag.questions[0].options} selected={answers[0]} onSelect={i => answer(0, i)} />
        </Reveal>
      </div>
    </section>
  )
}
