"use client"

import { motion } from "framer-motion"
import { CountingNumbers } from "./ui/counting-numbers"

const stats = [
  { label: "Schools Using EduManage Pro", value: 5000 },
  { label: "Students Managed", value: 2000000 },
  { label: "Hours Saved Weekly", value: 100000 },
  { label: "Increase in Efficiency", value: 35, unit: "%" },
]

export default function Stats() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-4xl font-bold mb-2">
                <CountingNumbers value={stat.value} duration={2} className="text-blue-500" />
                {stat.unit}
              </h3>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

