import AdvancedNavbar from "@/components/AdvancedNavbar"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import { RotatingFeatures } from "@/components/RotatingFeatures"
import { AnimatedStatsGrid } from "@/components/AnimatedStatsGrid"
import { SuccessStories } from "@/components/SuccessStories"
import Testimonials from "@/components/Testimonials"
import Pricing from "@/components/Pricing"
import CTA from "@/components/CTA"
import AnimatedBackground from "@/components/AnimatedBackground"
import InteractiveDemo from "@/components/InteractiveDemo"
import AIAssistant from "@/components/AIAssistant"



export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />
      <Hero />
      <AnimatedStatsGrid />
      <Features />
      <RotatingFeatures />
      <InteractiveDemo />
      <SuccessStories />
      <Testimonials />
      <Pricing />
      <AIAssistant />
      <CTA />
    </main>
  )
}

