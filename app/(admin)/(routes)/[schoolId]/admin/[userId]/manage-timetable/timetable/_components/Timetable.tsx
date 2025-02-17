"use client"

import { useState, useEffect } from 'react'
import { ClassType } from '@/lib/timetableData'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin } from 'lucide-react'
import { Class } from '@/lib/timetableData'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] as const

const classTypeColors: Record<ClassType, string> = {
    lecture: 'bg-blue-100 text-blue-800',
    lab: 'bg-green-100 text-green-800',
    tutorial: 'bg-yellow-100 text-yellow-800',
}

export default function Timetable({ data }: { data: ITimetable[] }) {
    const [currentDay, setCurrentDay] = useState<string>('')
    const [currentTime, setCurrentTime] = useState<string>('')

    const params = useParams();

    const { schoolId, userId } = params;

    useEffect(() => {
        const updateCurrentDayAndTime = () => {
            const now = new Date()
            const dayIndex = now.getDay() - 1 // 0 is Sunday, so we subtract 1
            setCurrentDay(dayIndex >= 0 && dayIndex < 5 ? days[dayIndex] : '')
            setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }))
        }

        updateCurrentDayAndTime()
        const intervalId = setInterval(updateCurrentDayAndTime, 60000) // Update every minute

        return () => clearInterval(intervalId)
    }, [])

    const isCurrentTimeSlot = (timeSlot: string) => {
        const [start, end] = timeSlot.split(' - ')
        return currentTime >= start && currentTime <= end
    }

    const renderClassCell = (classInfo: Class | undefined, day: string) => {
        if (!classInfo) return <td className="p-2 border"></td>

        const isCurrentCell = day === currentDay && isCurrentTimeSlot(data?.timetable.find(slot => slot[day as keyof typeof slot] === classInfo)?.time || '')

        return (
            <td className={`p-2 border ${isCurrentCell ? 'bg-primary/50' : ''}`}>
                {classInfo?.subject && (
                    <Card>
                        <CardContent className="p-4">
                            <h3 className="font-bold mb-2">{classInfo.subject}</h3>
                            <Badge className={classTypeColors[classInfo.type]}>{classInfo.type}</Badge>
                            <div className="flex items-center mt-2 text-sm text-gray-600">
                                <MapPin size={14} className="mr-1" />
                                {classInfo.location}
                            </div>
                        </CardContent>
                    </Card>
                )}

            </td>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="p-2 border">Time</th>
                            {days.map(day => (
                                <th key={day} className={`p-2 border capitalize ${day === currentDay ? 'bg-primary text-primary-foreground' : ''}`}>
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.timetable?.map((slot, index) => (
                            <>
                                <tr key={index} className={isCurrentTimeSlot(slot.time) ? 'bg-primary/5' : ''}>
                                    <td className="p-2 border">
                                        <div className="flex items-center">
                                            <Clock size={14} className="mr-2" />
                                            {slot.time}
                                        </div>
                                    </td>
                                    {days.map(day => {
                                        const classInfo = slot[day as keyof typeof slot];
                                        return renderClassCell(typeof classInfo === 'object' ? classInfo : undefined, day);
                                    })}
                                </tr>

                            </>
                        ))}
                        <div className="mt-2">
                            <Link href={`/${schoolId}/admin/${userId}/manage-timetable/timetable/${data._id}`} className={cn(buttonVariants())}>
                                Edit
                            </Link>
                        </div>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

