
import { AdvancedContactForm } from "@/components/AdvancedContactForm"
import { FAQ } from "@/components/FAQ"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | EduManage Pro",
  description:
    "Get in touch with the EduManage Pro team for any inquiries or support. We're here to help you transform your school management.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="pt-16">
        <AdvancedContactForm />
        <FAQ />
      </div>
    </main>
  )
}

