'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type Lang = 'es' | 'en'

interface LanguageContextType {
  lang: Lang
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'es',
  toggle: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es')
  const toggle = () => setLang((prev) => (prev === 'es' ? 'en' : 'es'))
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
