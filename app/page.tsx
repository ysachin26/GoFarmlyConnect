import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import HeroContentSection from "@/components/hero-content-section"
import CompanyTieup from "@/components/company-tieup"
import Services from "@/components/services"
import Features from "@/components/features"
import Testimonials from "@/components/testimonials"
import LearnWithUs from "@/components/learn-with-us"
import FAQ from "@/components/faq"
import ContactUs from "@/components/contact-us"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.08),_transparent_35%),linear-gradient(180deg,_#f8faf8_0%,_#ffffff_28%,_#f3f6f3_100%)] text-slate-900">
      <Navbar />
      <HeroSection />
      <HeroContentSection />
      <CompanyTieup />
      <Services />
      <Features />
      <Testimonials />
      <LearnWithUs />
      <FAQ />
      <ContactUs />
      <Footer />
    </div>
  )
}
