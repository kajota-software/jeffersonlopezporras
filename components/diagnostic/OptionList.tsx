'use client'

import { useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import type { L } from '@/lib/translations'

// Opciones como filas de texto grandes; la elegida se resalta con fondo suave.
// Es un radiogroup: Tab entra al grupo, las flechas mueven el foco y Enter o Espacio eligen.
export default function OptionList({
  options,
  selected,
  onSelect,
  labelledBy,
}: {
  options: L[]
  selected: number | null
  onSelect: (index: number) => void
  labelledBy: string
}) {
  const { lang } = useLanguage()
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const focusable = selected ?? 0

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
    if (!step) return
    e.preventDefault()
    refs.current[(i + step + options.length) % options.length]?.focus()
  }

  return (
    <div role="radiogroup" aria-labelledby={labelledBy} className="flex flex-col">
      {options.map((option, i) => {
        const active = selected === i
        return (
          <div key={i} style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(28,18,9,0.08)' }}>
            <button
              ref={el => { refs.current[i] = el }}
              type="button"
              role="radio"
              aria-checked={active}
              tabIndex={i === focusable ? 0 : -1}
              onClick={() => onSelect(i)}
              onKeyDown={e => onKeyDown(e, i)}
              className="group my-1 flex min-h-12 w-full cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-4 text-left text-[17px] leading-snug transition-colors duration-200 hover:bg-[rgba(139,69,19,0.05)] md:py-5 md:text-lg"
              style={{
                background: active ? 'rgba(139,69,19,0.10)' : undefined,
                color: active ? '#8b4513' : '#1c1209',
                fontWeight: active ? 600 : 500,
              }}
            >
              <span>{option[lang]}</span>
              <span
                aria-hidden
                className={`shrink-0 transition-opacity duration-200 ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`}
                style={{ color: '#8b4513' }}
              >
                →
              </span>
            </button>
          </div>
        )
      })}
    </div>
  )
}
