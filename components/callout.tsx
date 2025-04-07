import type React from "react"
import { AlertCircle, Info, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalloutProps {
  icon?: "info" | "warning" | "tip"
  title?: string
  children: React.ReactNode
  className?: string
}

export function Callout({ icon = "info", title, children, className }: CalloutProps) {
  const icons = {
    info: <Info className="h-4 w-4" />,
    warning: <AlertCircle className="h-4 w-4" />,
    tip: <Lightbulb className="h-4 w-4" />,
  }

  const styles = {
    info: "bg-blue-50 border-blue-200 dark:bg-blue-950/50 dark:border-blue-800 text-blue-800 dark:text-blue-300",
    warning:
      "bg-amber-50 border-amber-200 dark:bg-amber-950/50 dark:border-amber-800 text-amber-800 dark:text-amber-300",
    tip: "bg-green-50 border-green-200 dark:bg-green-950/50 dark:border-green-800 text-green-800 dark:text-green-300",
  }

  return (
    <div className={cn("my-6 rounded-md border p-4 flex items-start", styles[icon], className)}>
      <div className="mr-2 mt-0.5">{icons[icon]}</div>
      <div>
        {title && <p className="font-medium mb-1">{title}</p>}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  )
}

