'use client'

import { useLanguage } from '@/context/LanguageContext'

interface PainPoint {
  icon: string
  title: Record<string, string>
  desc: Record<string, string>
}

const pains: PainPoint[] = [
  {
    icon: '🔍',
    title: {
      es: 'Eres invisible donde tus clientes buscan',
      en: 'You are invisible where your clients search',
    },
    desc: {
      es: 'Clientes potenciales buscan tu servicio todos los días. Si tu web no aparece — o no inspira confianza cuando aparece — van directo a tu competencia.',
      en: 'Potential clients search for your service every day. If your website does not show up — or does not look trustworthy when it does — they go straight to your competitor.',
    },
  },
  {
    icon: '💸',
    title: {
      es: 'Tu presupuesto en anuncios desaparece sin resultados claros',
      en: 'Your ad budget disappears with nothing to show',
    },
    desc: {
      es: 'Estás pagando por clics, pero la mayoría de esas personas nunca van a comprarte. Sin estructura y rastreo correcto, no sabes qué funciona y qué es dinero botado.',
      en: 'You are paying for clicks, but most of those people will never buy. Without the right structure and tracking, you have no idea what is actually working.',
    },
  },
  {
    icon: '⏳',
    title: {
      es: 'Los prospectos se van mientras tú estás operando el negocio',
      en: 'Leads slip through while you are busy running the business',
    },
    desc: {
      es: 'Cada consulta sin respuesta rápida, cada seguimiento manual, cada tarea repetitiva es un cliente perdido. Los negocios que más crecen tienen sistemas que corren solos.',
      en: 'Every unanswered inquiry, every slow follow-up, every manual task is a lost client. The businesses that grow fastest have systems that run even when the owner is not watching.',
    },
  },
]

const labels: Record<string, Record<string, string>> = {
  badge: { es: '¿Te suena familiar?', en: 'Sound familiar?' },
  title: {
    es: 'Tienes un buen negocio. Online, le estás cediendo clientes a tu competencia.',
    en: 'You run a great business. Online, you are losing clients to competitors who are worse.',
  },
  sub: {
    es: 'Estos son los tres problemas que más le cuestan a los negocios de servicio:',
    en: 'These are the three problems costing service businesses the most:',
  },
}

export default function Problem() {
  const { lang } = useLanguage()

  return (
    <section className="py-24 border-t border-[#c4b49a]" style={{ background: '#ede8db' }}>
      <div className="max-w-5xl mx-auto px-6">
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
            className="text-4xl md:text-5xl font-semibold mb-4 text-[#1c1209] leading-tight"
            style={{ fontFamily: 'var(--font-caveat), cursive' }}
          >
            {labels.title[lang]}
          </h2>
          <p className="text-base max-w-2xl mx-auto text-[#4a3520]" style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}>
            {labels.sub[lang]}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {pains.map((pain, i) => (
            <div
              key={i}
              className="rounded-lg p-7"
              style={{
                background: '#f5f0e8',
                border: '1px solid #c4b49a',
              }}
            >
              <div className="text-3xl mb-5">{pain.icon}</div>
              <h3
                className="text-xl font-semibold mb-3 text-[#1c1209]"
                style={{ fontFamily: 'var(--font-caveat), cursive' }}
              >
                {pain.title[lang]}
              </h3>
              <p className="text-sm leading-relaxed text-[#4a3520]" style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}>
                {pain.desc[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
