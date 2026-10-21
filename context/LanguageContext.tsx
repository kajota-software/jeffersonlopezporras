'use client'

import { createContext, useContext, ReactNode } from 'react'

export type Lang = 'es' | 'en'

// El idioma lo define la ruta (/ o /en) y se renderiza en el servidor
const LanguageContext = createContext<{ lang: Lang }>({ lang: 'es' })

export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LanguageContext.Provider value={{ lang }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)
