'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'

// Celular con un chat de WhatsApp de un turista pidiendo reserva (HTML/CSS)
export default function PhoneMockup() {
  const { lang } = useLanguage()
  const c = t.hero.chat

  return (
    <div className="mx-auto w-full max-w-[260px]" role="img" aria-label={c.msg[lang]}>
      <div className="rounded-[2.6rem] p-2.5" style={{ background: '#1c1209', boxShadow: '0 30px 60px -20px rgba(28,18,9,0.35)' }}>
        <div className="overflow-hidden rounded-[2.1rem]" style={{ background: '#ece5dd' }}>
          {/* Barra de estado + encabezado del chat */}
          <div style={{ background: '#075e54' }}>
            <div className="flex items-center justify-between px-6 pt-3 text-[10px] font-semibold text-white">
              <span>{c.time}</span>
              <span className="h-4 w-16 rounded-full" style={{ background: '#1c1209' }} />
              <span className="flex items-end gap-[2px]" aria-hidden>
                {[4, 6, 8, 10].map(h => (
                  <span key={h} className="w-[3px] rounded-sm bg-white" style={{ height: h }} />
                ))}
              </span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                <path d="M15 5l-7 7 7 7" />
              </svg>
              <span className="grid h-8 w-8 place-items-center rounded-full text-[13px] font-semibold text-white" style={{ background: '#128c7e' }}>
                {c.contact[lang].charAt(0)}
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[13px] font-semibold text-white">{c.contact[lang]}</span>
                <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.75)' }}>{c.status[lang]}</span>
              </span>
            </div>
          </div>

          {/* Conversación */}
          <div className="flex min-h-[280px] flex-col justify-end gap-3 px-3 py-4 md:min-h-[320px]">
            <span className="mx-auto rounded-md px-3 py-1 text-[10px] font-medium" style={{ background: '#e1f2fb', color: '#4a5a66' }}>
              {c.today[lang]}
            </span>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.9 }}
              className="max-w-[85%] self-start rounded-lg rounded-tl-none bg-white px-3 py-2"
            >
              <p className="text-[13px] leading-snug" style={{ color: '#111b21' }}>{c.msg[lang]}</p>
              <p className="mt-1 text-right text-[10px]" style={{ color: '#8696a0' }}>{c.time}</p>
            </motion.div>
          </div>

          {/* Barra para escribir */}
          <div className="flex items-center gap-2 px-2 pb-5 pt-1">
            <span className="flex-1 rounded-full bg-white px-4 py-2 text-[12px]" style={{ color: '#8696a0' }}>
              {c.input[lang]}
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: '#128c7e' }} aria-hidden>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-2.1a7 7 0 0 0 6-6.9h-2z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
