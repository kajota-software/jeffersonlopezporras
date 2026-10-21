import type { MDXComponents } from 'mdx/types'
import type { ReactNode } from 'react'
import { Children, isValidElement } from 'react'
import Link from 'next/link'
import { slugify } from '@/lib/slug'
import CTA from '@/components/blog/CTA'
import Tabla from '@/components/blog/Tabla'

// Texto plano de un encabezado, para generar su ancla
function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textOf).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children)
  return Children.toArray(node).map(textOf).join('')
}

const BODY = 'text-[1.075rem] leading-[1.85] md:text-[1.125rem]'

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 id={slugify(textOf(children))} className="mt-16 mb-5 scroll-mt-24 text-[1.55rem] font-bold leading-[1.2] tracking-tight text-text-primary md:text-[1.85rem]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-10 mb-3 text-[1.2rem] font-semibold leading-snug text-text-primary md:text-[1.3rem]">{children}</h3>
  ),
  p: ({ children }) => <p className={`mb-6 ${BODY}`} style={{ color: '#33241a' }}>{children}</p>,
  ul: ({ children }) => <ul className={`mb-7 list-disc space-y-2.5 pl-6 marker:text-accent ${BODY}`} style={{ color: '#33241a' }}>{children}</ul>,
  ol: ({ children }) => <ol className={`mb-7 list-decimal space-y-2.5 pl-6 marker:font-semibold marker:text-accent ${BODY}`} style={{ color: '#33241a' }}>{children}</ol>,
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-text-primary">{children}</strong>,
  a: ({ href = '', children }) => {
    const className = 'font-medium underline decoration-[rgba(139,69,19,0.35)] underline-offset-4 transition-colors hover:decoration-accent'
    const style = { color: '#8b4513' }
    return href.startsWith('/') || href.startsWith('#') ? (
      <Link href={href} className={className} style={style}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>{children}</a>
    )
  },
  blockquote: ({ children }) => (
    <blockquote className="my-8 pl-5 [&>p]:mb-0" style={{ borderLeft: '2px solid #8b4513' }}>{children}</blockquote>
  ),
  code: ({ children }) => (
    <code className="break-all rounded px-1.5 py-0.5 text-[0.9em]" style={{ background: 'rgba(28,18,9,0.06)', color: '#1c1209' }}>{children}</code>
  ),
  hr: () => <hr className="my-12" style={{ border: 0, borderTop: '1px solid rgba(28,18,9,0.1)' }} />,
  CTA,
  Tabla,
}

export function useMDXComponents(): MDXComponents {
  return components
}
