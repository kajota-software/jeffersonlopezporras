import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

// Google Analytics 4: solo se carga si existe NEXT_PUBLIC_GA_ID, después de que la página es interactiva
export default function Analytics() {
  if (!GA_ID) return null
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  )
}
