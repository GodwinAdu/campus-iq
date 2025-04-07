import type React from "react"

interface StepsProps {
  children: React.ReactNode
}

export function Steps({ children }: StepsProps) {
  return <div className="steps space-y-8 ml-4 border-l pl-8 [counter-reset:step]">{children}</div>
}

