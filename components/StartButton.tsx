'use client'

import { useLanguage } from '@/context/LanguageContext'
import { useDiagnostic } from '@/context/DiagnosticContext'
import { t } from '@/lib/translations'

// Botón "Hacer mi diagnóstico gratis" + línea de confianza. Todos los CTA abren el diagnóstico.
export default function StartButton({ center, large, showTrust = true }: { center?: boolean; large?: boolean; showTrust?: boolean }) {
  const { lang } = useLanguage()
  const { open } = useDiagnostic()

  return (
    <div className={`flex flex-col gap-3 ${center ? 'items-center text-center' : 'items-start'}`}>
      <button
        type="button"
        onClick={open}
        className={`w-full cursor-pointer rounded-xl bg-accent font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-bright sm:w-auto ${large ? 'px-10 py-4 text-base' : 'px-7 py-3.5 text-[15px]'}`}
      >
        {t.cta.start[lang]}
      </button>
      {showTrust && (
        <p className="text-[13px]" style={{ color: '#7a6045' }}>{t.cta.trust[lang]}</p>
      )}
    </div>
  )
}
