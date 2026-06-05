import { Navbar } from "@/components/navbar"
import { HeroCarousel } from "@/components/hero-carousel"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { MissionSection } from "@/components/mission-section"
import { TeamSection } from "@/components/team-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroCarousel />
      <AboutSection />
      <ServicesSection />
      <MissionSection />
      <TeamSection />
      <ContactSection />
      <Footer />
      <Chatbot />
    </main>
  )
}
