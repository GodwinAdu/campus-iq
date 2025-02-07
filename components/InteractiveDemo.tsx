"use client"
import { Tabs } from "./ui/tabs"

const demoTabs = [
  {
    title: "Student Management",
    value: "student",
    content: (
      <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
        <p>Effortlessly manage student records, attendance, and performance.</p>
      </div>
    ),
  },
  {
    title: "Curriculum Planning",
    value: "curriculum",
    content: (
      <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-green-700 to-emerald-900">
        <p>Design and track curriculum implementation with ease.</p>
      </div>
    ),
  },
  {
    title: "Financial Tools",
    value: "finance",
    content: (
      <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-700 to-cyan-900">
        <p>Streamline financial processes and gain insights into your school's finances.</p>
      </div>
    ),
  },
]

export default function InteractiveDemo() {
  return (
    <section id="demo" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Experience EduManage Pro</h2>
        <Tabs tabs={demoTabs} />
      </div>
    </section>
  )
}

