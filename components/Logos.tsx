'use client'

import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'
import type { L } from '@/lib/translations'

export interface LogoItem {
  src: string
  alt: string
  invert: boolean
  // Medidas del archivo original, para reservar el espacio antes de que cargue
  width: number
  height: number
}

const logos: LogoItem[] = [
  { src: '/logos/fma.png',        alt: 'FitManage',         invert: false, width: 360,  height: 360 },
  { src: '/logos/sloth.png',      alt: 'Sloth RentACar',    invert: true,  width: 720,  height: 220 },
  { src: '/logos/logofbv.png',    alt: 'Finca Buena Vista', invert: false, width: 360,  height: 360 },
  { src: '/logos/serenia.png',    alt: 'Serenia CR',        invert: false, width: 360,  height: 360 },
  { src: '/logos/logoAltura.png', alt: 'Altura',            invert: false, width: 391,  height: 360 },
]

// Las copias del carrusel (decorative) se ocultan a lectores de pantalla
function Logo({ src, alt, invert, width, height, decorative = false, className = 'px-10' }: LogoItem & { decorative?: boolean; className?: string }) {
  return (
    <div className={`shrink-0 ${className} opacity-35 transition-opacity duration-300 hover:opacity-75`} aria-hidden={decorative || undefined}>
      <Image
        src={src}
        alt={decorative ? '' : alt}
        width={width}
        height={height}
        sizes={`${Math.round((width / height) * 28)}px`}
        className="h-7 w-auto object-contain"
        style={{ filter: invert ? 'invert(1)' : 'none' }}
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
              <Logo key={i} {...logo} decorative={i >= items.length} />
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
