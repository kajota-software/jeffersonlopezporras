'use client'

import { useLanguage } from '@/context/LanguageContext'
import type { L } from '@/lib/translations'

// Opciones como filas de texto grandes; la elegida se resalta con fondo suave
export default function OptionList({
  options,
  selected,
  onSelect,
}: {
  options: L[]
  selected: number | null
  onSelect: (index: number) => void
}) {
  const { lang } = useLanguage()

  return (
    <ul className="flex flex-col">
      {options.map((option, i) => {
        const active = selected === i
        return (
          <li key={i} style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(28,18,9,0.08)' }}>
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-pressed={active}
              className="group my-1 flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-4 text-left text-[17px] leading-snug transition-colors duration-200 hover:bg-[rgba(139,69,19,0.05)] md:py-5 md:text-lg"
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
          </li>
        )
      })}
    </ul>
  )
}
