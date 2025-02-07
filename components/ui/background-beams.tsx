"use client"
import { useEffect, useRef } from "react"
import { useMousePosition } from "@/utils/mouse-position"

export const BackgroundBeams = () => {
  const beams = useRef<HTMLDivElement>(null)
  const { x, y } = useMousePosition()

  useEffect(() => {
    if (!beams.current) return

    const handleMouseMove = () => {
      if (!x || !y) return
      const rect = beams.current!.getBoundingClientRect()
      const localX = x - rect.left
      const localY = y - rect.top

      beams.current!.style.setProperty("--x", `${localX}px`)
      beams.current!.style.setProperty("--y", `${localY}px`)
    }

    handleMouseMove()
  }, [x, y])

  return (
    <div ref={beams} className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      <div className="absolute inset-0 z-30 bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),rgba(0,_30,_255,_0.15),transparent_50%)]" />
    </div>
  )
}

