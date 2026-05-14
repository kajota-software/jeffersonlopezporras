'use client'

import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'

export default function Footer() {
  const { lang } = useLanguage()

  return (
    <footer className="border-t border-[#c4b49a]" style={{ background: '#ede8db' }}>
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 px-6 py-6">
        <span
          className="text-sm text-[#7a6045]"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
        >
          {t.footer.left[lang]}
        </span>

        <div className="flex items-center gap-6">
          <a
            href="https://fitmanage.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium transition-colors duration-200 text-[#8b4513] hover:text-[#b5642a]"
            style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: '1.05rem' }}
          >
            {t.footer.fitmanage[lang]}
          </a>
          <a
            href="https://www.linkedin.com/in/jeff-lp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors duration-200 text-[#7a6045] hover:text-[#8b4513]"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            LinkedIn
          </a>
          <a
            href="mailto:jefferson.lopez.porras21@gmail.com"
            className="text-sm transition-colors duration-200 text-[#7a6045] hover:text-[#8b4513]"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
