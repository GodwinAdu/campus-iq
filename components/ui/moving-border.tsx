"use client"

import React from "react"
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion"
import { cn } from "@/utils/cn"

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string
  children: React.ReactNode
  as?: any
  containerClassName?: string
  borderClassName?: string
  duration?: number
  className?: string
  [key: string]: any
}) {
  return (
    <Component
      className={cn("bg-transparent relative text-xl h-16 w-40 p-[1px] overflow-hidden ", containerClassName)}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div className="absolute inset-0" style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)]",
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased",
          className,
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  )
}

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
}: {
  children: React.ReactNode
  duration?: number
  rx?: string
  ry?: string
}) => {
  const pathRef = React.useRef<SVGPathElement>(null)
  const progress = useMotionValue<number>(0)

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength()
    if (length) {
      const pct = (time % duration) / duration
      progress.set(pct)
    }
  })

  const x = useTransform(progress, (val) => pathRef.current && getPointFromProgress(pathRef.current, val).x)
  const y = useTransform(progress, (val) => pathRef.current && getPointFromProgress(pathRef.current, val).y)

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
      >
        <path
          d={`M 0,50 C 0,0 0,0 50,0 S 100,0 100,50 100,100 50,100 0,100 0,50`}
          fill="none"
          ref={pathRef}
          rx={rx}
          ry={ry}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  )
}

const getPointFromProgress = (path: SVGPathElement, progress: number) => {
  const point = path.getPointAtLength(progress * path.getTotalLength())
  return point
}

