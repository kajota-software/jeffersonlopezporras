import type { Metadata } from 'next'
import '../globals.css'
import RootShell from '@/components/RootShell'
import { siteMetadata } from '@/lib/seo'

// Layout raíz en inglés: solo /en (el blog queda en español)
export const metadata: Metadata = siteMetadata('en')

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>
}
