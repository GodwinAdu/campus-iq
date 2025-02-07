"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

export const Sparkles = ({
  children,
  className,
  ...props
}: { children: React.ReactNode; className?: string; [key: string]: any }) => {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; size: number }[]>([])

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = []
      for (let i = 0; i < 20; i++) {
        newSparkles.push({
          id: Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
        })
      }
      setSparkles(newSparkles)
    }

    generateSparkles()
    const interval = setInterval(generateSparkles, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={cn("relative", className)} {...props}>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full bg-yellow-300"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
        />
      ))}
      {children}
    </div>
  )
}

export const SparklesCore = ({
  children,
  className,
  ...props
}: { children?: React.ReactNode; className?: string; [key: string]: any }) => {
  return (
    <Sparkles className={cn("w-full h-full", className)} {...props}>
      {children}
    </Sparkles>
  )
}

