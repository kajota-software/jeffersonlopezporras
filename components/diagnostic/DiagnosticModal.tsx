'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useDiagnostic } from '@/context/DiagnosticContext'

// El diagnóstico (y framer-motion) se descarga recién al abrirlo o al acercarse a su sección
export const loadDiagnostic = () => import('./Diagnostic')
const Diagnostic = dynamic(loadDiagnostic, { ssr: false })

export default function DiagnosticModal() {
  const { isOpen } = useDiagnostic()
  const [mounted, setMounted] = useState(false)

  // Una vez abierto se queda montado para que la animación de cierre funcione
  if (isOpen && !mounted) setMounted(true)

  return mounted ? <Diagnostic /> : null
}
