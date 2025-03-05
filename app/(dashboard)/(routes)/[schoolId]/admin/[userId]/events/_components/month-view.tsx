"use client"

import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    format,
    isSameMonth,
    isSameDay,
    isToday,
} from "date-fns"
import type { Event } from "@/types/event"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import { EventItem } from "./event-item"

interface MonthViewProps {
    currentDate: Date
    events: Event[]
    onEventClick: (event: Event) => void
    onDateClick: (date: Date) => void
}

export function MonthView({ currentDate, events, onEventClick, onDateClick }: MonthViewProps) {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(monthStart)
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 })
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })

    const days = eachDayOfInterval({
        start: calendarStart,
        end: calendarEnd,
    })

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const getEventsForDay = (day: Date) => {
        return events.filter((event) => {
            const eventStart = new Date(event.start)
            return isSameDay(eventStart, day)
        })
    }

    return (
        <div className="h-full flex flex-col">
            <div className="grid grid-cols-7 border-b sticky top-0 bg-background z-10">
                {weekdays.map((day) => (
                    <div key={day} className="py-2 text-center font-medium text-muted-foreground">
                        {day}
                    </div>
                ))}
            </div>
            <div className="flex-1 grid grid-cols-7 auto-rows-fr">
                {days.map((day, dayIdx) => {
                    const dayEvents = getEventsForDay(day)
                    const isCurrentMonth = isSameMonth(day, monthStart)

                    return (
                        <div
                            key={day.toString()}
                            className={cn("min-h-[100px] border-b border-r p-1 relative group", !isCurrentMonth && "bg-muted/30")}
                            onClick={() => onDateClick(day)}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <div
                                    className={cn(
                                        "flex justify-center items-center h-6 w-6 rounded-full text-sm",
                                        isToday(day) && "bg-primary text-primary-foreground font-medium",
                                    )}
                                >
                                    {format(day, "d")}
                                </div>
                                <button
                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-muted"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onDateClick(day)
                                    }}
                                    aria-label="Add event"
                                >
                                    <Plus className="h-3 w-3 text-muted-foreground" />
                                </button>
                            </div>
                            <div className="space-y-1 max-h-[calc(100%-2rem)] overflow-y-auto">
                                {dayEvents.slice(0, 3).map((event) => (
                                    <EventItem
                                        key={event.id}
                                        event={event}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onEventClick(event)
                                        }}
                                        isCompact
                                    />
                                ))}
                                {dayEvents.length > 3 && (
                                    <div className="text-xs text-muted-foreground px-2 py-0.5 bg-muted/50 rounded">
                                        +{dayEvents.length - 3} more
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

