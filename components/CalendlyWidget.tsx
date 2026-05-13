'use client'

import Script from 'next/script'

export default function CalendlyWidget() {
  return (
    <>
      <div
        className="calendly-inline-widget w-full rounded-lg overflow-hidden"
        data-url="https://calendly.com/jeffersonlopez690/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=ede8db&text_color=1c1209&primary_color=8b4513"
        style={{ minWidth: '320px', height: '700px' }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </>
  )
}
