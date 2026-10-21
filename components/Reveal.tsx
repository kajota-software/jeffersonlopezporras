'use client'

import { motion, MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

// Aparición al hacer scroll: fade + 20px hacia arriba, una sola vez.
// Con prefers-reduced-motion, globals.css anula la animación ([data-reveal]).
export default function Reveal({
  children,
  delay = 0,
  className,
  style,
}: {
  children: ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// Escalonado entre elementos hermanos
export const stagger = (i: number) => i * 0.08

// Respeta prefers-reduced-motion en todas las animaciones de framer-motion
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
