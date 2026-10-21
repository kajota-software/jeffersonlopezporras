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
import Guides from '@/components/Guides'
import FAQ from '@/components/FAQ'
import DiagnosticSection from '@/components/DiagnosticSection'
import ContactCTA from '@/components/ContactCTA'
import Footer from '@/components/Footer'
import type { Lang } from '@/context/LanguageContext'
import { homeJsonLd, jsonLdString } from '@/lib/seo'

// Inicio en español (/) e inglés (/en): mismo contenido, idioma según la ruta
export default function HomePage({ lang }: { lang: Lang }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(homeJsonLd(lang)) }} />
      <Nav />
      <main>
        <Hero />
        <Logos />
        <Problem />
        <Solution />
        <Projects />
        <HowItWorks />
        <Offer />
        <Packages />
        <About />
        <Guides lang={lang} />
        <FAQ />
        <DiagnosticSection />
        <ContactCTA />
      </main>
      <Footer />
    </>
  )
}
