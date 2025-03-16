"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format, isSameDay } from "date-fns"

interface AssignmentCalendarProps {
    assignments: any[]
    onSelectAssignment: (assignment: any) => void
}

export default function AssignmentCalendar({ assignments, onSelectAssignment }: AssignmentCalendarProps) {
    const [date, setDate] = useState<Date | undefined>(new Date())

    // Get assignments for the selected date
    const selectedDateAssignments = date
        ? assignments.filter((assignment) => isSameDay(new Date(assignment.dueDate), date))
        : []

    // Function to highlight dates with assignments
    const isDayWithAssignment = (day: Date) => {
        return assignments.some((assignment) => isSameDay(new Date(assignment.dueDate), day))
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    modifiers={{
                        assignment: (date) => isDayWithAssignment(date),
                    }}
                    modifiersStyles={{
                        assignment: {
                            fontWeight: "bold",
                            backgroundColor: "lightgreen",
                            borderBottom: "2px solid black",
                        },
                    }}
                />
            </div>

            <div>
                <h3 className="font-medium text-lg mb-3">{date ? format(date, "MMMM d, yyyy") : "Select a date"}</h3>

                {selectedDateAssignments.length === 0 ? (
                    <div className="text-center py-8 bg-muted rounded-md">
                        <p className="text-muted-foreground">No assignments due on this date</p>
                    </div>
                ) : (
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                        {selectedDateAssignments.map((assignment) => (
                            <Card
                                key={assignment._id}
                                className="cursor-pointer hover:shadow-md transition-shadow"
                                onClick={() => onSelectAssignment(assignment)}
                            >
                                <CardContent className="p-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-medium">{assignment.title}</h4>
                                            <p className="text-sm text-muted-foreground">{assignment.subjectId.name}</p>
                                        </div>
                                        <Badge className="ml-2">
                                            {assignment.assignmentType.charAt(0).toUpperCase() + assignment.assignmentType.slice(1)}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

