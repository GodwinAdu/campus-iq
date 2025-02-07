"use client"
import type React from "react"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export const MacbookScroll = ({
  src,
  showGradient,
  title,
}: {
  src: string
  showGradient?: boolean
  title?: string | React.ReactNode
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const translateY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div ref={ref} className="h-[300vh] flex items-start justify-center">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div
          style={{
            translateY,
          }}
          className="translate-y-[-50%]"
        >
          {title && <h2 className="text-3xl font-bold text-center mb-8 text-white">{title}</h2>}
          <div className="mx-auto max-w-5xl">
            <div className="p-4 bg-gray-200 rounded-t-2xl">
              <div className="flex justify-start space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
            </div>
            <div
              className="relative bg-gray-100 aspect-[16/10] rounded-b-2xl overflow-hidden"
              style={{
                boxShadow: "0 0 0 1px rgba(0,0,0,0.1), 0 2px 8px -2px rgba(0,0,0,0.1), 0 4px 16px -4px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={src || "/placeholder.svg"}
                alt="Macbook scroll demo"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              {showGradient && <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

