import type { Metadata } from 'next'
import HomePage from '@/components/HomePage'
import { homeMetadata } from '@/lib/seo'

export const metadata: Metadata = homeMetadata('es')

export default function Home() {
  return <HomePage lang="es" />
}
