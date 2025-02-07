"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

const features = [
  {
    title: "Smart Attendance",
    description: "AI-powered facial recognition for quick and accurate attendance tracking.",
    icon: "📸",
  },
  {
    title: "Predictive Analytics",
    description: "Forecast student performance and identify areas for improvement.",
    icon: "🔮",
  },
  {
    title: "Virtual Classrooms",
    description: "Seamless integration with popular video conferencing tools for remote learning.",
    icon: "🖥️",
  },
  {
    title: "Parent Dashboard",
    description: "Real-time updates on student progress, assignments, and school activities.",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    title: "Gamified Learning",
    description: "Engage students with interactive, game-based learning modules.",
    icon: "🎮",
  },
]

export const RotatingFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">Advanced Features</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="relative w-64 h-64 mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "absolute top-0 left-0 w-full h-full flex items-center justify-center bg-blue-600 rounded-2xl shadow-xl",
                    activeFeature === index ? "z-10" : "z-0",
                  )}
                  initial={{ rotateY: index * 72, opacity: 0 }}
                  animate={{
                    rotateY: index * 72 + activeFeature * -72,
                    opacity: activeFeature === index ? 1 : 0.5,
                    scale: activeFeature === index ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center p-6">
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-4 text-white">{features[activeFeature].title}</h3>
              <p className="text-gray-300 mb-6">{features[activeFeature].description}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => setActiveFeature((prev) => (prev - 1 + features.length) % features.length)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                >
                  Previous
                </button>
                <button
                  onClick={() => setActiveFeature((prev) => (prev + 1) % features.length)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                >
                  Next
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

