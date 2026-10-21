import type { Metadata } from 'next'
import '../globals.css'
import RootShell from '@/components/RootShell'
import { siteMetadata } from '@/lib/seo'

// Layout raíz en español: inicio y blog
export const metadata: Metadata = siteMetadata('es')

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="es">{children}</RootShell>
}
