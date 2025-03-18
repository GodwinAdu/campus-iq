import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'
import { Calendar, Clock } from 'lucide-react'
import React from 'react'
import AttendanceSystem from './_components/attendance-component'
import { getAllClass } from '@/lib/actions/class.actions'

const page = async () => {
    const date = new Date();
    const classes = await getAllClass() ?? []
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Daily Classes Payment" />
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-md shadow-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{format(date, "MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-md shadow-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{format(date, "h:mm a")}</span>
                    </div>
                </div>
            </div>
            <Separator />
            <div className="py-4">
                <AttendanceSystem classes={classes} />
            </div>
        </>
    )
}

export default page
