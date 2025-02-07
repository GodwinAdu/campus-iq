"use client"

import { motion } from "framer-motion"
import { Button } from "./ui/moving-border"

export default function CTA() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8"
        >
          Ready to Transform Your School Management?
        </motion.h2>
        <p className="text-xl mb-8">Book a demo today and see EduManage Pro in action!</p>
        <Button
          borderRadius="1.75rem"
          className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          Schedule Demo
        </Button>
      </div>
    </section>
  )
}

