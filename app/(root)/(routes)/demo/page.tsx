import AdvancedNavbar from "@/components/AdvancedNavbar"
import { AdvancedDemo } from "@/components/AdvancedDemo"
import AdvancedFooter from "@/components/AdvancedFooter"
import { AIChatbot } from "@/components/AIChatbot"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Interactive Demo | EduManage Pro",
  description: "Experience EduManage Pro's powerful features with our interactive demo.",
}

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <AdvancedNavbar />
      <div className="pt-16">
        <AdvancedDemo />
      </div>
      <AdvancedFooter />
      <AIChatbot />
    </main>
  )
}

