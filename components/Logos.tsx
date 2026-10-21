'use client'

import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'
import type { L } from '@/lib/translations'

export interface LogoItem {
  src: string
  alt: string
  invert: boolean
}

const logos: LogoItem[] = [
  { src: '/logos/fma.png',        alt: 'FitManage',       invert: false },
  { src: '/logos/sloth.png',      alt: 'Sloth RentACar',  invert: true  },
  { src: '/logos/logofbv.png',    alt: 'Finca Buena Vista', invert: false },
  { src: '/logos/serenia.png',    alt: 'Serenia CR',      invert: false },
  { src: '/logos/logoAltura.png', alt: 'Cliente 5',       invert: false },
]

function Logo({ src, alt, invert, className = 'px-10' }: LogoItem & { className?: string }) {
  return (
    <div
      className={`shrink-0 ${className} transition-opacity duration-300`}
      style={{ opacity: 0.35 }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = '0.75' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = '0.35' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        height={28}
        className="h-7 w-auto object-contain"
        style={{ filter: invert ? 'invert(1)' : 'none' }}
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement
          el.style.display = 'none'
          const div = document.createElement('div')
          div.style.cssText = 'width:80px;height:28px;background:rgba(28,18,9,0.08);border-radius:3px'
          el.parentElement?.appendChild(div)
        }}
      />
    </div>
  )
}

interface LogosProps {
  label?: L
  items?: LogoItem[]
  // Con pocos logos el carrusel deja huecos: mostrarlos fijos
  marquee?: boolean
}

export default function Logos({ label = t.logos.label, items = logos, marquee = true }: LogosProps) {
  const { lang } = useLanguage()

  return (
    <section
      className="py-12 overflow-hidden"
      style={{
        borderTop: '1px solid rgba(28,18,9,0.09)',
        borderBottom: '1px solid rgba(28,18,9,0.09)',
      }}
    >
      <p
        className="text-center mb-8"
        style={{ fontSize: '11px', color: '#7a6045', textTransform: 'uppercase', letterSpacing: '0.07em' }}
      >
        {label[lang]}
      </p>

      {marquee ? (
        <div className="relative flex overflow-hidden">
          <div className="marquee-track flex items-center">
            {[...items, ...items].map((logo, i) => (
              <Logo key={i} {...logo} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-y-6 px-6">
          {items.map((logo) => (
            <Logo key={logo.alt} {...logo} className="px-4 md:px-10" />
          ))}
        </div>
      )}
    </section>
  )
}
