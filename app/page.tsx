import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Logos from '@/components/Logos'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import Projects from '@/components/Projects'
import HowItWorks from '@/components/HowItWorks'
import Offer from '@/components/Offer'
import Packages from '@/components/Packages'
import About from '@/components/About'
import FAQ from '@/components/FAQ'
import DiagnosticSection from '@/components/DiagnosticSection'
import ContactCTA from '@/components/ContactCTA'
import Footer from '@/components/Footer'
import { t } from '@/lib/translations'

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: t.faq.questions.map(({ q, a }) => ({
    '@type': 'Question',
    name: q.es,
    acceptedAnswer: { '@type': 'Answer', text: a.es },
  })),
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
      />
      <Nav />
      <Hero />
      <Logos />
      <Problem />
      <Solution />
      <Projects />
      <HowItWorks />
      <Offer />
      <Packages />
      <About />
      <FAQ />
      <DiagnosticSection />
      <ContactCTA />
      <Footer />
    </>
  )
}
