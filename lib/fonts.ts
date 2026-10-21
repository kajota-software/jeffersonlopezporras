import { Inter } from 'next/font/google'

// Solo los pesos que usa el sitio (normal, medium, semibold, bold)
export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})
