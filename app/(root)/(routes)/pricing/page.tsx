
import Pricing from "@/components/Pricing"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing | EduManage Pro",
  description: "Explore our flexible pricing plans for EduManage Pro, designed to suit schools of all sizes.",
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">

      <div className="pt-16">
        <Pricing />
      </div>
    </main>
  )
}

