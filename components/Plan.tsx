'use client'

import { useLanguage } from '@/context/LanguageContext'

const labels: Record<string, Record<string, string>> = {
  badge: { es: 'Cómo funciona', en: 'How it works' },
  title: { es: '3 pasos para tener tu presencia digital lista', en: '3 steps to get your digital presence ready' },
}

const steps: Array<{
  num: string
  title: Record<string, string>
  desc: Record<string, string>
}> = [
  {
    num: '1',
    title: {
      es: 'Agenda una llamada gratis de 30 min',
      en: 'Book a free 30-min call',
    },
    desc: {
      es: 'Me cuentas tu negocio, cuántos clientes llegan online hoy y qué te gustaría mejorar. Sin tecnicismos. Al final de la llamada sabrás exactamente qué necesitas.',
      en: 'Tell me about your business, how many clients come from online today, and what you would like to improve. No tech jargon. By the end of the call you will know exactly what you need.',
    },
  },
  {
    num: '2',
    title: {
      es: 'Yo diseño, construyo y lanzo todo',
      en: 'I design, build and launch everything',
    },
    desc: {
      es: 'Tú apruebas el diseño y yo me encargo del resto: código, dominio, hosting y puesta en producción. En semanas, no meses. Sin que tengas que entender nada técnico.',
      en: 'You approve the design and I handle the rest: code, domain, hosting and production deployment. In weeks, not months. Without you having to understand anything technical.',
    },
  },
  {
    num: '3',
    title: {
      es: 'Tu negocio crece con una base digital sólida',
      en: 'Your business grows with a solid digital foundation',
    },
    desc: {
      es: 'Más clientes te encuentran online. Las reservas llegan solas. El agente IA atiende preguntas mientras duermes. Tú te enfocas en lo que sabes hacer bien.',
      en: 'More clients find you online. Bookings come on their own. The AI agent handles questions while you sleep. You focus on what you do best.',
    },
  },
]

export default function Plan() {
  const { lang } = useLanguage()

  return (
    <section className="py-24 border-t border-[#c4b49a]" style={{ background: '#ede8db' }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs italic px-3.5 py-1.5 mb-5"
            style={{
              fontFamily: 'var(--font-lora), Georgia, serif',
              color: '#8b4513',
              background: 'rgba(139, 69, 19, 0.07)',
              border: '1.5px solid rgba(139, 69, 19, 0.25)',
              borderRadius: '4px',
            }}
          >
            {labels.badge[lang]}
          </span>
          <h2
            className="text-4xl md:text-5xl font-semibold text-[#1c1209]"
            style={{ fontFamily: 'var(--font-caveat), cursive' }}
          >
            {labels.title[lang]}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div key={step.num} className="flex flex-col">
              {/* Número en Caveat */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mb-5"
                style={{
                  background: 'rgba(139, 69, 19, 0.1)',
                  border: '1.5px solid rgba(139, 69, 19, 0.25)',
                  color: '#8b4513',
                  fontFamily: 'var(--font-caveat), cursive',
                }}
              >
                {step.num}
              </div>
              <h3
                className="font-semibold mb-2 text-xl text-[#1c1209]"
                style={{ fontFamily: 'var(--font-caveat), cursive' }}
              >
                {step.title[lang]}
              </h3>
              <p
                className="text-sm leading-relaxed text-[#4a3520]"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
              >
                {step.desc[lang]}
              </p>
            </div>
          ))}
        </div>

        {/* CTA inline */}
        <div className="mt-14 text-center">
          <a
            href="#contact"
            className="inline-block rounded-lg bg-[#8b4513] px-8 py-3 text-sm font-medium text-[#f5f0e8] transition-all duration-200 hover:bg-[#b5642a] hover:-translate-y-0.5"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            {lang === 'es' ? 'Empezar — agenda tu llamada gratis' : 'Get started — book your free call'}
          </a>
        </div>
      </div>
    </section>
  )
}
