"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"

export function CalendarView() {
    const [date, setDate] = useState(new Date())

    // Sample events data
    const events = [
        { date: new Date(2025, 3, 12), type: "event", title: "Parent-Teacher Meeting" },
        { date: new Date(2025, 3, 15), type: "exam", title: "Mid-Term Exams Begin" },
        { date: new Date(2025, 3, 22), type: "event", title: "Science Exhibition" },
        { date: new Date(2025, 4, 1), type: "holiday", title: "Labor Day" },
        { date: new Date(2025, 4, 15), type: "event", title: "Annual Sports Day" },
    ]

    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{
                event: (date) =>
                    events.some(
                        (event) =>
                            event.type === "event" &&
                            event.date.getDate() === date.getDate() &&
                            event.date.getMonth() === date.getMonth(),
                    ),
                exam: (date) =>
                    events.some(
                        (event) =>
                            event.type === "exam" &&
                            event.date.getDate() === date.getDate() &&
                            event.date.getMonth() === date.getMonth(),
                    ),
                holiday: (date) =>
                    events.some(
                        (event) =>
                            event.type === "holiday" &&
                            event.date.getDate() === date.getDate() &&
                            event.date.getMonth() === date.getMonth(),
                    ),
            }}
            modifiersClassNames={{
                event: "bg-blue-100 text-blue-900 font-medium",
                exam: "bg-red-100 text-red-900 font-medium",
                holiday: "bg-gray-100 text-gray-900 font-medium",
            }}
        />
    )
}

