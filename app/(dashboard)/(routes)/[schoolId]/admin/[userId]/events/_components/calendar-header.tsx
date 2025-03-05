"use client"

import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CalendarHeaderProps {
    currentDate: Date
    currentView: "month" | "week" | "day"
    onPrevious: () => void
    onNext: () => void
    onToday: () => void
    onViewChange: (view: "month" | "week" | "day") => void
    onAddEvent: () => void
}

export function CalendarHeader({
    currentDate,
    currentView,
    onPrevious,
    onNext,
    onToday,
    onViewChange,
    onAddEvent,
}: CalendarHeaderProps) {
    const getHeaderText = () => {
        if (currentView === "month") {
            return format(currentDate, "MMMM yyyy")
        } else if (currentView === "week") {
            return `Week of ${format(currentDate, "MMM d, yyyy")}`
        } else {
            return format(currentDate, "EEEE, MMMM d, yyyy")
        }
    }

    return (
        <div className="p-4 border-b bg-background/95 backdrop-blur sticky top-0 z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary hidden sm:block" />
                    <h1 className="text-xl sm:text-2xl font-bold">{getHeaderText()}</h1>
                </div>
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center space-x-1">
                        <Button variant="outline" size="icon" onClick={onPrevious} aria-label="Previous">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={onToday}>
                            Today
                        </Button>
                        <Button variant="outline" size="icon" onClick={onNext} aria-label="Next">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Select value={currentView} onValueChange={(value) => onViewChange(value as "month" | "week" | "day")}>
                            <SelectTrigger className="w-[110px]">
                                <SelectValue placeholder="View" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="month">Month</SelectItem>
                                <SelectItem value="week">Week</SelectItem>
                                <SelectItem value="day">Day</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button onClick={onAddEvent} className="whitespace-nowrap">
                            <Plus className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">Add Event</span>
                            <span className="sm:hidden">Add</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

