'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

// Un solo IntersectionObserver para todos los elementos con aparición
let observer: IntersectionObserver | null = null

function observe(el: HTMLElement) {
  observer ??= new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        ;(entry.target as HTMLElement).dataset.shown = ''
        observer?.unobserve(entry.target) // una sola vez
      }
    },
    { rootMargin: '0px 0px -60px 0px' },
  )
  observer.observe(el)
  return () => observer?.unobserve(el)
}

// Aparición al hacer scroll: fade + 20px hacia arriba, una sola vez, solo con opacity y transform.
// No usar en contenido visible al cargar. Con prefers-reduced-motion, globals.css la anula.
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
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) return observe(ref.current)
  }, [])

  return (
    <div
      ref={ref}
      data-reveal
      className={className}
      style={delay ? { ...style, transitionDelay: `${delay}s` } : style}
    >
      {children}
    </div>
  )
}

// Escalonado entre elementos hermanos
export const stagger = (i: number) => i * 0.08
