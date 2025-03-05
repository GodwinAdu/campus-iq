"use client"

import { DayView } from "./day-view"
import { MonthView } from "./month-view"
import { WeekView } from "./week-view"


interface CalendarViewProps {
  currentDate: Date
  events: Event[]
  currentView: "month" | "week" | "day"
  onEventClick: (event: Event) => void
  onDateClick: (date: Date) => void
}

export function CalendarView({ currentDate, events, currentView, onEventClick, onDateClick }: CalendarViewProps) {
  return (
    <div className="h-full overflow-auto bg-background scrollbar-thin">
      {currentView === "month" && (
        <MonthView currentDate={currentDate} events={events} onEventClick={onEventClick} onDateClick={onDateClick} />
      )}
      {currentView === "week" && (
        <WeekView currentDate={currentDate} events={events} onEventClick={onEventClick} onDateClick={onDateClick} />
      )}
      {currentView === "day" && (
        <DayView currentDate={currentDate} events={events} onEventClick={onEventClick} onDateClick={onDateClick} />
      )}
    </div>
  )
}

