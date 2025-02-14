
import { AdvancedDemo } from "@/components/AdvancedDemo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Interactive Demo | EduManage Pro",
  description: "Experience EduManage Pro's powerful features with our interactive demo.",
}

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="pt-16">
        <AdvancedDemo />
      </div>
    </main>
  )
}

