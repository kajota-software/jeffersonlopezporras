'use client'

import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'
import { SectionLabel } from './SectionLabel'

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-3.5 w-3.5 shrink-0"
      viewBox="0 0 14 14"
      fill="none"
      style={{ color: '#8b4513' }}
    >
      <path
        d="M2.5 7.5L5.5 10.5L11.5 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface CardProps {
  price: string
  badge: string
  title: string
  sub: string
  desc: string
  features: string[]
  retainer: string
  retainerLabel: string
  featured?: boolean
}

function ServiceCard({
  price, badge, title, sub, desc, features, retainer, retainerLabel, featured = false,
}: CardProps) {
  return (
    <div
      className="group flex flex-col gap-5 rounded-lg p-7 transition-all duration-300 relative"
      style={{
        background: featured ? '#ede8db' : '#f5f0e8',
        border: featured ? '2px solid #9a8070' : '1px solid #c4b49a',
      }}
    >
      {/* Badge "Más solicitado" */}
      {badge && (
        <div
          className="absolute -top-3 left-6 px-3 py-1 rounded text-xs font-medium"
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            background: '#8b4513',
            color: '#f5f0e8',
          }}
        >
          {badge}
        </div>
      )}

      {/* Precio */}
      <div className="flex items-baseline gap-2 mt-1">
        <span
          className="text-3xl font-bold text-[#8b4513]"
          style={{ fontFamily: 'var(--font-caveat), cursive' }}
        >
          {price}
        </span>
        <span className="text-xs text-[#7a6045]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
          USD
        </span>
      </div>

      {/* Título y subtítulo */}
      <div>
        <h3
          className="text-2xl font-semibold leading-snug text-[#1c1209]"
          style={{ fontFamily: 'var(--font-caveat), cursive' }}
        >
          {title}
        </h3>
        <p
          className="mt-1 text-sm italic text-[#8b4513]"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
        >
          {sub}
        </p>
        <p
          className="mt-3 text-sm leading-relaxed text-[#4a3520]"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
        >
          {desc}
        </p>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-2.5 border-t border-[#c4b49a] pt-4">
        {features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-sm text-[#4a3520]"
            style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
          >
            <CheckIcon />
            {f}
          </li>
        ))}
      </ul>

      {/* Mantenimiento mensual */}
      <div
        className="mt-auto flex items-center gap-2 rounded-md px-3 py-2"
        style={{ background: 'rgba(139,69,19,0.07)', border: '1px solid rgba(139,69,19,0.18)' }}
      >
        <span className="text-base font-semibold text-[#8b4513]" style={{ fontFamily: 'var(--font-caveat), cursive' }}>
          +{retainer}
        </span>
        <span className="text-xs text-[#7a6045]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
          {retainerLabel}
        </span>
      </div>

      {/* CTA → Calendly */}
      <a
        href="#contact"
        className="block text-center rounded-lg py-2.5 text-sm font-medium transition-all duration-200"
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
          background: featured ? '#8b4513' : 'transparent',
          color: featured ? '#f5f0e8' : '#8b4513',
          border: featured ? 'none' : '1.5px solid #8b4513',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLAnchorElement
          el.style.background = '#b5642a'
          el.style.color = '#f5f0e8'
          el.style.border = 'none'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLAnchorElement
          el.style.background = featured ? '#8b4513' : 'transparent'
          el.style.color = featured ? '#f5f0e8' : '#8b4513'
          el.style.border = featured ? 'none' : '1.5px solid #8b4513'
        }}
      >
        {featured
          ? (typeof window !== 'undefined' && document.documentElement.lang === 'es' ? 'Quiero este paquete' : 'I want this package')
          : (typeof window !== 'undefined' && document.documentElement.lang === 'es' ? 'Agenda una llamada' : 'Schedule a call')}
      </a>
    </div>
  )
}

export default function Services() {
  const { lang } = useLanguage()
  const s = t.services

  const cards = [
    {
      price:    s.card1.price[lang],
      badge:    s.card1.badge[lang],
      title:    s.card1.title[lang],
      sub:      s.card1.sub[lang],
      desc:     s.card1.desc[lang],
      features: [s.card1.f1[lang], s.card1.f2[lang], s.card1.f3[lang], s.card1.f4[lang]],
      retainer: s.card1.retainer[lang],
      featured: false,
    },
    {
      price:    s.card2.price[lang],
      badge:    s.card2.badge[lang],
      title:    s.card2.title[lang],
      sub:      s.card2.sub[lang],
      desc:     s.card2.desc[lang],
      features: [s.card2.f1[lang], s.card2.f2[lang], s.card2.f3[lang], s.card2.f4[lang]],
      retainer: s.card2.retainer[lang],
      featured: true,
    },
    {
      price:    s.card3.price[lang],
      badge:    s.card3.badge[lang],
      title:    s.card3.title[lang],
      sub:      s.card3.sub[lang],
      desc:     s.card3.desc[lang],
      features: [s.card3.f1[lang], s.card3.f2[lang], s.card3.f3[lang], s.card3.f4[lang]],
      retainer: s.card3.retainer[lang],
      featured: false,
    },
  ]

  return (
    <section id="services" className="mx-auto max-w-[1100px] px-6 py-24">
      <SectionLabel>{s.badge[lang]}</SectionLabel>

      <h2
        className="mt-4 text-[2.6rem] font-semibold leading-tight text-[#1c1209] md:text-5xl"
        style={{ fontFamily: 'var(--font-caveat), cursive' }}
      >
        {s.title[lang]}
      </h2>

      <p
        className="mt-3 max-w-xl text-base text-[#4a3520]"
        style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
      >
        {s.sub[lang]}
      </p>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {cards.map((card) => (
          <ServiceCard
            key={card.title}
            {...card}
            retainerLabel={s.retainer_label[lang]}
          />
        ))}
      </div>

      {/* Nota sobre mantenimiento */}
      <p
        className="mt-6 text-xs text-center italic text-[#7a6045]"
        style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
      >
        {lang === 'es'
          ? 'Todos los paquetes incluyen 30 días de soporte post-lanzamiento. El mantenimiento mensual es opcional.'
          : 'All packages include 30 days of post-launch support. Monthly maintenance is optional.'}
      </p>
    </section>
  )
}
