"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

export const TextRevealCard = ({
  text,
  revealText,
  className,
}: {
  text: string
  revealText: string
  className?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn("h-40 w-80 bg-slate-900 rounded-lg overflow-hidden cursor-pointer", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="h-full w-full flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-white text-2xl font-bold">{text}</span>
      </motion.div>
      <motion.div
        className="h-full w-full flex items-center justify-center bg-slate-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-white text-2xl font-bold">{revealText}</span>
      </motion.div>
    </div>
  )
}

