"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

export const CountingNumbers = ({
  value,
  className,
  duration = 1000,
}: {
  value: number
  className?: string
}) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      let start = 0
      const end = Number.parseInt(value.toString(), 10)
      const stepTime = Math.abs(Math.floor(duration / end))

      const timer = setInterval(() => {
        start += 1
        setCount(start)
        if (start === end) {
          clearInterval(timer)
          setHasAnimated(true)
        }
      }, stepTime)

      return () => clearInterval(timer)
    }
  }, [isInView, value, duration, hasAnimated])

  return (
    <span className={className} ref={ref}>
      {count}
    </span>
  )
}

