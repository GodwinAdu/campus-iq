import type React from "react"

interface StepProps {
  children: React.ReactNode
  number?: number
  title?: string
}

export function Step({ children, number, title }: StepProps) {
  return (
    <div className="step relative [counter-increment:step]">
      <div className="absolute -left-[41px] flex h-7 w-7 items-center justify-center rounded-full border bg-background text-center font-mono text-sm font-medium">
        {number || <span className="text-xs">{number}</span>}
      </div>
      {title && <h3 className="font-medium">{title}</h3>}
      <div className="ml-4">{children}</div>
    </div>
  )
}

