"use client"

import { format, isSameDay, getHours, getMinutes, setHours, differenceInMinutes } from "date-fns"
import type { Event } from "@/types/event"

import { Plus } from "lucide-react"
import { EventItem } from "./event-item"

interface DayViewProps {
    currentDate: Date
    events: Event[]
    onEventClick: (event: Event) => void
    onDateClick: (date: Date) => void
}

export function DayView({ currentDate, events, onEventClick, onDateClick }: DayViewProps) {
    const hours = Array.from({ length: 24 }, (_, i) => i)

    const getEventsForDay = () => {
        return events.filter((event) => {
            const eventStart = new Date(event.start)
            return isSameDay(eventStart, currentDate)
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

    const dayEvents = getEventsForDay()

    return (
        <div className="h-full flex flex-col">
            <div className="border-b py-2 text-center font-medium sticky top-0 bg-background z-10">
                {format(currentDate, "EEEE, MMMM d, yyyy")}
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-thin">
                <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] relative">
                    <div className="hidden sm:block border-r">
                        {hours.map((hour) => (
                            <div key={hour} className="h-16 border-b relative">
                                <span className="absolute top-4 left-2 text-xs text-muted-foreground">
                                    {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="relative">
                        {hours.map((hour) => {
                            const hourDate = setHours(currentDate, hour)

                            return (
                                <div
                                    key={hour}
                                    className="h-16 border-b relative group hover:bg-muted/40 transition-colors"
                                    onClick={() => onDateClick(hourDate)}
                                >
                                    <span className="sm:hidden absolute -top-2.5 left-2 text-xs text-muted-foreground">
                                        {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
                                    </span>
                                    <button
                                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-muted"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onDateClick(hourDate)
                                        }}
                                        aria-label="Add event"
                                    >
                                        <Plus className="h-3 w-3 text-muted-foreground" />
                                    </button>
                                </div>
                            )
                        })}

                        {/* Overlay events on top of the grid */}
                        {dayEvents.map((event) => {
                            const { top, height } = calculateEventPosition(event)

                            return (
                                <div key={event.id} className="absolute left-0 right-0 mx-2" style={{ top, height }}>
                                    <EventItem
                                        key={event.id}
                                        event={event}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onEventClick(event)
                                        }}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

