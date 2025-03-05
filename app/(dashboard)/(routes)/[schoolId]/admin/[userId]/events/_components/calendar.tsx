"use client"

import { useState } from "react"
import { addDays, subMonths, addMonths } from "date-fns"
import { CalendarHeader } from "./calendar-header"
import { CalendarView } from "./calendar-view"
import { EventModal } from "./event-modal"

export function CalendarApp() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
    const [events, setEvents] = useState<Event[]>([
        {
            id: "1",
            title: "Team Meeting",
            description: "Weekly team sync",
            start: addDays(new Date(), 1).setHours(10, 0, 0, 0),
            end: addDays(new Date(), 1).setHours(11, 0, 0, 0),
            color: "blue",
        },
        {
            id: "2",
            title: "Product Review",
            description: "Review new features",
            start: addDays(new Date(), 3).setHours(14, 0, 0, 0),
            end: addDays(new Date(), 3).setHours(15, 30, 0, 0),
            color: "green",
        },
    ])
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentView, setCurrentView] = useState<"month" | "week" | "day">("month")

    const handlePrevious = () => {
        if (currentView === "month") {
            setCurrentDate(subMonths(currentDate, 1))
        } else if (currentView === "week") {
            setCurrentDate(addDays(currentDate, -7))
        } else {
            setCurrentDate(addDays(currentDate, -1))
        }
    }

    const handleNext = () => {
        if (currentView === "month") {
            setCurrentDate(addMonths(currentDate, 1))
        } else if (currentView === "week") {
            setCurrentDate(addDays(currentDate, 7))
        } else {
            setCurrentDate(addDays(currentDate, 1))
        }
    }

    const handleToday = () => {
        setCurrentDate(new Date())
    }

    const handleAddEvent = (date?: Date) => {
        const defaultDate = date || new Date()
        const defaultStart = new Date(defaultDate)
        defaultStart.setHours(9, 0, 0, 0)

        const defaultEnd = new Date(defaultDate)
        defaultEnd.setHours(10, 0, 0, 0)

        setSelectedEvent({
            id: "",
            title: "",
            description: "",
            start: defaultStart.getTime(),
            end: defaultEnd.getTime(),
            color: "blue",
        })
        setIsModalOpen(true)
    }

    const handleEditEvent = (event: Event) => {
        setSelectedEvent(event)
        setIsModalOpen(true)
    }

    const handleDeleteEvent = (id: string) => {
        setEvents(events.filter((event) => event.id !== id))
    }

    const handleSaveEvent = (event: Event) => {
        if (event.id) {
            // Edit existing event
            setEvents(events.map((e) => (e.id === event.id ? event : e)))
        } else {
            // Add new event
            const newEvent = {
                ...event,
                id: Math.random().toString(36).substring(2, 9),
            }
            setEvents([...events, newEvent])
        }
        setIsModalOpen(false)
        setSelectedEvent(null)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedEvent(null)
    }

    return (
        <div className="flex flex-col h-[calc(100vh-2rem)] max-h-[900px] bg-background rounded-xl border shadow-sm overflow-hidden">
            <CalendarHeader
                currentDate={currentDate}
                currentView={currentView}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onToday={handleToday}
                onViewChange={setCurrentView}
                onAddEvent={() => handleAddEvent()}
            />
            <div className="flex-1 overflow-hidden">
                <CalendarView
                    currentDate={currentDate}
                    events={events}
                    currentView={currentView}
                    onEventClick={handleEditEvent}
                    onDateClick={handleAddEvent}
                />
            </div>
            <EventModal
                isOpen={isModalOpen}
                event={selectedEvent}
                onClose={handleCloseModal}
                onSave={handleSaveEvent}
                onDelete={handleDeleteEvent}
            />
        </div>
    )
}

