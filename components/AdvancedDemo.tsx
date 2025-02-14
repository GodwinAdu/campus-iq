"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs } from "./ui/tabs"
import { Button } from "./ui/moving-border"
import { BackgroundBeams } from "./ui/background-beams"

const features = [
  {
    title: "Student Management",
    description: "Effortlessly manage student records, attendance, and performance tracking.",
    demo: (
      <div className="bg-gray-800 p-4 rounded-lg">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-2 border-b border-gray-700">ID</th>
              <th className="p-2 border-b border-gray-700">Name</th>
              <th className="p-2 border-b border-gray-700">Grade</th>
              <th className="p-2 border-b border-gray-700">Attendance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">001</td>
              <td className="p-2">John Doe</td>
              <td className="p-2">A</td>
              <td className="p-2">95%</td>
            </tr>
            <tr>
              <td className="p-2">002</td>
              <td className="p-2">Jane Smith</td>
              <td className="p-2">B+</td>
              <td className="p-2">92%</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    title: "Curriculum Planning",
    description: "Plan and track curriculum implementation with ease.",
    demo: (
      <div className="bg-gray-800 p-4 rounded-lg">
        <ul className="space-y-2">
          <li className="flex items-center justify-between">
            <span>Mathematics - Algebra</span>
            <span className="bg-green-500 text-white px-2 py-1 rounded">Completed</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Science - Biology</span>
            <span className="bg-yellow-500 text-white px-2 py-1 rounded">In Progress</span>
          </li>
          <li className="flex items-center justify-between">
            <span>History - World War II</span>
            <span className="bg-blue-500 text-white px-2 py-1 rounded">Upcoming</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Financial Tools",
    description: "Streamline financial processes and gain insights into your school's finances.",
    demo: (
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex justify-between mb-4">
          <span>Total Revenue</span>
          <span className="text-green-500">$500,000</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Total Expenses</span>
          <span className="text-red-500">$350,000</span>
        </div>
        <div className="flex justify-between">
          <span>Net Profit</span>
          <span className="text-blue-500">$150,000</span>
        </div>
      </div>
    ),
  },
]

export const AdvancedDemo = () => {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <section className="py-20 relative overflow-hidden">
      <BackgroundBeams />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">Experience Campus<span className="text-primary">IQ</span> Pro</h2>
        <p className="text-xl text-gray-300 text-center mb-12">
          Explore our cutting-edge features designed to revolutionize school management
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Tabs
              tabs={features.map((feature) => ({
                title: feature.title,
                value: feature.title.toLowerCase().replace(" ", "-"),
                content: (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                    {feature.demo}
                  </motion.div>
                ),
              }))}
            />
          </div>
          <div className="lg:pl-12">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 p-8 rounded-lg shadow-2xl"
            >
              <h3 className="text-2xl font-semibold mb-4 text-white">{features[activeFeature].title}</h3>
              <p className="text-gray-300 mb-6">{features[activeFeature].description}</p>
              {features[activeFeature].demo}
            </motion.div>
          </div>
        </div>
        <div className="mt-16 text-center">
          <Button
            borderRadius="1.75rem"
            className="bg-white dark:bg-gray-800 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            Start Free Trial
          </Button>
        </div>
      </div>
    </section>
  )
}

