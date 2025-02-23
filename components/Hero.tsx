"use client"

import { motion } from "framer-motion"
import { TypewriterEffect } from "./ui/typewriter-effect"
import { BackgroundBeams } from "./ui/background-beams"
import Link from "next/link"

const words = [{ text: "Revolutionize" }, { text: "your" }, { text: "school" }, { text: "management" }]

export default function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10"
      >
        <h1 className="text-6xl font-bold mb-4 text-white">Campus<span className="text-blue-500">IQ</span></h1>
        <TypewriterEffect words={words} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            href="/features"
            className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Explore Features
          </Link>
          <Link
            href="/sign-in"
            className="mt-8 ml-5 inline-block bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Sign In
          </Link>
        </motion.div>
      </motion.div>
      <BackgroundBeams />
    </section>
  )
}

