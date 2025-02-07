import AdvancedNavbar from "@/components/AdvancedNavbar"
import Features from "@/components/Features"
import AdvancedFooter from "@/components/AdvancedFooter"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Features | EduManage Pro",
  description: "Explore the powerful features of EduManage Pro for school management.",
}

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <AdvancedNavbar />
      <div className="pt-16">
        <Features />
      </div>
      <AdvancedFooter />
    </main>
  )
}

