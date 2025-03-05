"use client"

import {
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    format,
    isSameDay,
    isToday,
    getHours,
    getMinutes,
    setHours,
    differenceInMinutes,
} from "date-fns"
import type { Event } from "@/types/event"
import { cn } from "@/lib/utils"
import { EventItem } from "./event-item"

interface WeekViewProps {
    currentDate: Date
    events: Event[]
    onEventClick: (event: Event) => void
    onDateClick: (date: Date) => void
}

export function WeekView({ currentDate, events, onEventClick, onDateClick }: WeekViewProps) {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 })
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 })

    const days = eachDayOfInterval({
        start: weekStart,
        end: weekEnd,
    })

    const hours = Array.from({ length: 24 }, (_, i) => i)

    const getEventsForDay = (day: Date) => {
        return events.filter((event) => {
            const eventStart = new Date(event.start)
            return isSameDay(eventStart, day)
        })
    }

    const calculateEventPosition = (event: Event) => {
        const eventStart = new Date(event.start)
        const eventEnd = new Date(event.end)

        const startHour = getHours(eventStart)
        const startMinute = getMinutes(eventStart)
        const durationMinutes = differenceInMinutes(eventEnd, eventStart)

        const top = ((startHour * 60 + startMinute) / (24 * 60)) * 100
        const height = (durationMinutes / (24 * 60)) * 100

        return { top: `${top}%`, height: `${height}%` }
    }

    return (
        <div className="h-full flex flex-col">
            <div className="grid grid-cols-8 border-b sticky top-0 bg-background z-10">
                <div className="py-2 text-center font-medium text-muted-foreground border-r">Time</div>
                {days.map((day) => (
                    <div key={day.toString()} className={cn("py-2 text-center font-medium", isToday(day) && "bg-primary/10")}>
                        <div>{format(day, "EEE")}</div>
                        <div
                            className={cn(
                                "flex justify-center items-center h-6 w-6 mx-auto rounded-full text-sm",
                                isToday(day) && "bg-primary text-primary-foreground font-medium",
                            )}
                        >
                            {format(day, "d")}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-thin">
                <div className="grid grid-cols-8 relative">
                    <div className="col-span-1 border-r">
                        {hours.map((hour) => (
                            <div key={hour} className="h-16 border-b relative">
                                <span className="absolute top-4 left-2 text-xs text-muted-foreground">
                                    {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="col-span-7 grid grid-cols-7">
                        {days.map((day) => {
                            const dayEvents = getEventsForDay(day)

                            return (
                                <div key={day.toString()} className={cn("border-r relative", isToday(day) && "bg-primary/5")}>
                                    {hours.map((hour) => {
                                        const hourDate = setHours(day, hour)

                                        return (
                                            <div
                                                key={hour}
                                                className="h-16 border-b relative hover:bg-muted/40 transition-colors"
                                                onClick={() => onDateClick(hourDate)}
                                            />
                                        )
                                    })}

                                    {/* Overlay events on top of the grid */}
                                    {dayEvents.map((event) => {
                                        const { top, height } = calculateEventPosition(event)

                                        return (
                                            <div
                                                key={event.id}
                                                className="absolute left-0 right-0 mx-1 overflow-hidden"
                                                style={{ top, height }}
                                            >
                                                <EventItem
                                                    key={event.id}
                                                    event={event}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        onEventClick(event)
                                                    }}
                                                    isCompact
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

