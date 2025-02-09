import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import TimeTableForm from '../_components/TimeTableForm'
import { getAllClass } from '@/lib/actions/class.actions'

const page = async () => {
    const classes = await getAllClass() ?? []
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="New Timetable" description="Manage,create and edit school Stages" />

            </div>
            <Separator />
            <div className="py-4">
                <TimeTableForm type='create' classes={classes} />
            </div>
        </>
    )
}

export default page