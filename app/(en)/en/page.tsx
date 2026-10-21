import type { Metadata } from 'next'
import HomePage from '@/components/HomePage'
import { homeMetadata } from '@/lib/seo'

export const metadata: Metadata = homeMetadata('en')

export default function HomeEn() {
  return <HomePage lang="en" />
}
