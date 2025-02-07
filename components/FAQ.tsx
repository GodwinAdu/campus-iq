"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What is EduManage Pro?",
    answer:
      "EduManage Pro is a comprehensive school management system designed to streamline administrative tasks, enhance communication, and improve educational processes for schools of all sizes.",
  },
  {
    question: "How does the pricing work?",
    answer:
      "We offer flexible pricing plans to suit schools of different sizes and needs. Our plans include Basic, Pro, and Enterprise options. Please visit our pricing page for detailed information.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a 14-day free trial for schools to experience the full features of EduManage Pro. No credit card is required to start your trial.",
  },
  {
    question: "How secure is our school's data?",
    answer:
      "We take data security very seriously. EduManage Pro uses industry-standard encryption protocols, regular security audits, and complies with data protection regulations to ensure your school's information is safe and secure.",
  },
  {
    question: "Can EduManage Pro integrate with other software we use?",
    answer:
      "Yes, EduManage Pro offers various integration options with popular educational tools and software. Our Enterprise plan includes custom integrations to fit your school's specific needs.",
  },
]

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-700">
      <button className="flex justify-between items-center w-full py-4 text-left" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-lg font-medium text-white">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="py-4 text-gray-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const FAQ = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}

