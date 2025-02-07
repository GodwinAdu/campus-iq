"use client"
import { motion } from "framer-motion"
import { CountingNumbers } from "./ui/counting-numbers"

const stats = [
  { label: "Schools", value: 5000, icon: "🏫" },
  { label: "Students", value: 2000000, icon: "👨‍🎓" },
  { label: "Teachers", value: 150000, icon: "👩‍🏫" },
  { label: "Countries", value: 50, icon: "🌎" },
  { label: "Courses", value: 10000, icon: "📚" },
  { label: "Mobile App Downloads", value: 1000000, icon: "📱" },
]

export const AnimatedStatsGrid = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">EduManage Pro in Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                <CountingNumbers value={stat.value} duration={2} />
                {stat.label === "Countries" && "+"}
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

