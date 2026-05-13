'use client'

import { useLanguage } from '@/context/LanguageContext'

const clients = [
  { name: 'FitManage.app', sub: { es: 'SaaS · LATAM', en: 'SaaS · LATAM' } },
  { name: 'Finca Buena Vista', sub: { es: 'Hospedaje · Turrialba', en: 'Lodging · Turrialba' } },
  { name: 'Serenia CR', sub: { es: 'Bienestar · Costa Rica', en: 'Wellness · Costa Rica' } },
]

const titles: Record<string, string> = {
  es: 'Negocios que usan lo que construí',
  en: 'Businesses built on what I have shipped',
}

export default function Logos() {
  const { lang } = useLanguage()

  return (
    <section className="py-14 border-y border-[#c4b49a]" style={{ background: '#ede8db' }}>
      <div className="max-w-4xl mx-auto px-6">
        <p
          className="text-center text-xs uppercase tracking-widest mb-10 italic text-[#7a6045]"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
        >
          {titles[lang]}
        </p>

        <div className="flex items-center justify-center gap-12 flex-wrap">
          {clients.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity duration-300">
              <span
                className="text-xl font-semibold text-[#1c1209]"
                style={{ fontFamily: 'var(--font-caveat), cursive' }}
              >
                {c.name}
              </span>
              <span
                className="text-[10px] tracking-wider text-[#7a6045] uppercase"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              >
                {c.sub[lang]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
