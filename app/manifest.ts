import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Jefferson López',
    short_name: 'Jefferson López',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f0e8',
    theme_color: '#111418',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { src: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { src: '/brand/icono-jl-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
