import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Logos from '@/components/Logos'
import Problem from '@/components/Problem'
import Projects from '@/components/Projects'
import Packages from '@/components/Packages'
import HowItWorks from '@/components/HowItWorks'
import About from '@/components/About'
import FAQ from '@/components/FAQ'
import ContactCTA from '@/components/ContactCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Logos />
      <Problem />
      <Projects />
      <Packages />
      <HowItWorks />
      <About />
      <FAQ />
      <ContactCTA />
      <Footer />
    </>
  )
}
