"use client"

import { SparklesCore } from "./ui/sparkles"
import { motion } from "framer-motion"
import { HoverEffect } from "./ui/card-hover-effect"

const features = [
  {
    title: "Student Information System",
    description: "Centralized database for student records, attendance, and performance tracking.",
    icon: "👨‍🎓",
  },
  {
    title: "Curriculum Management",
    description: "Plan, organize, and track curriculum implementation across all grade levels.",
    icon: "📚",
  },
  {
    title: "Financial Management",
    description: "Handle tuition, fees, and budgeting with our integrated financial tools.",
    icon: "💰",
  },
  {
    title: "Communication Portal",
    description: "Seamless communication between teachers, students, and parents.",
    icon: "💬",
  },
  {
    title: "Timetable Scheduling",
    description: "AI-powered scheduling system for optimal class and resource allocation.",
    icon: "🕒",
  },
  {
    title: "Performance Analytics",
    description: "Advanced analytics and reporting for data-driven decision making.",
    icon: "📊",
  },
  {
    title: "Online Learning Integration",
    description: "Seamlessly integrate with popular e-learning platforms for hybrid education.",
    icon: "💻",
  },
  {
    title: "Attendance Tracking",
    description: "Automated attendance tracking with real-time notifications for parents.",
    icon: "✅",
  },
  {
    title: "Library Management",
    description: "Digitize your library catalog and manage book checkouts effortlessly.",
    icon: "📖",
  },
  {
    title: "Transportation Tracking",
    description: "Monitor school buses in real-time and ensure student safety during transit.",
    icon: "🚌",
  },
  {
    title: "Health Records",
    description: "Maintain student health records and manage school clinic operations.",
    icon: "🏥",
  },
  {
    title: "Event Management",
    description: "Plan and organize school events, from small gatherings to large ceremonies.",
    icon: "🎉",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 relative">
      <div className="absolute inset-0 h-full w-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Powerful Features
        </motion.h2>
        <HoverEffect items={features} />
      </div>
    </section>
  )
}

