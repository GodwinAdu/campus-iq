"use client"

import type React from "react"

import { format } from "date-fns"
import type { Event } from "@/types/event"
import { cn } from "@/lib/utils"
import { Clock } from "lucide-react"

interface EventItemProps {
  event: Event
  onClick: (e: React.MouseEvent) => void
  isCompact?: boolean
}

export function EventItem({ event, onClick, isCompact = false }: EventItemProps) {
  const startTime = format(new Date(event.start), "h:mm a")
  const endTime = format(new Date(event.end), "h:mm a")

  const colorMap: Record<string, string> = {
    blue: "bg-primary/10 text-primary border-blue-300 dark:bg-blue-900/30 dark:text-primary/30 dark:border-blue-800 hover:bg-blue-200 dark:hover:bg-blue-900/50",
    green:
      "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800 hover:bg-green-200 dark:hover:bg-green-900/50",
    red: "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800 hover:bg-red-200 dark:hover:bg-red-900/50",
    yellow:
      "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800 hover:bg-yellow-200 dark:hover:bg-yellow-900/50",
    purple:
      "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800 hover:bg-purple-200 dark:hover:bg-purple-900/50",
  }

  return (
    <div
      className={cn(
        "rounded px-2 py-1 text-xs border-l-2 cursor-pointer truncate transition-colors shadow-sm",
        colorMap[event.color] || colorMap.blue,
      )}
      onClick={onClick}
    >
      {isCompact ? (
        <div className="truncate font-medium">{event.title}</div>
      ) : (
        <>
          <div className="font-medium truncate">{event.title}</div>
          <div className="text-xs opacity-80 flex items-center mt-0.5">
            <Clock className="h-3 w-3 mr-1 inline-block" />
            {`${startTime} - ${endTime}`}
          </div>
          {event.description && <div className="text-xs mt-1 opacity-80 line-clamp-1">{event.description}</div>}
        </>
      )}
    </div>
  )
}

