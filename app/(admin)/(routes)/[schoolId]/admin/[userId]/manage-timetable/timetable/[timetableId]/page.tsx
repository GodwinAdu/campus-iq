import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import TimeTableForm from '../_components/TimeTableForm'
import { getAllClass } from '@/lib/actions/class.actions'
import { fetchTimetableById } from '@/lib/actions/timetable.actions'

type Props = Promise<{ timetableId: string }>
const page = async ({params}:{params:Props}) => {
    const { timetableId } = await params;
    console.log(timetableId,"timetable");
    const classes = await getAllClass() ?? []; // Fetch all classes from the server
    const initialData = await fetchTimetableById(timetableId)
    console.log(initialData,"initialData")
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Edit Timetable" />

            </div>
            <Separator />
            <div className="py-4">
                <TimeTableForm type='update' initialData={initialData} classes={classes} />
            </div>
        </>
    )
}

export default page