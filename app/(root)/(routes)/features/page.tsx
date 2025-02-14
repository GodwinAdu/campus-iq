
import Features from "@/components/Features"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Features | EduManage Pro",
  description: "Explore the powerful features of EduManage Pro for school management.",
}

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="pt-16">
        <Features />
      </div>
    </main>
  )
}

