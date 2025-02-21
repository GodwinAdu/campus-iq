import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { getAllClass } from '@/lib/actions/class.actions'
import TimetableGrid from './_components/TimetableGrid'
import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const page = async () => {
    const classes = (await getAllClass()) || [];
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Manage Timetable" description="Manage,create and edit school Stages" />
                <Link
                    href={`timetable/create`}
                    className={cn(buttonVariants())}
                >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Create
                </Link>
            </div>
            <Separator />
            <TimetableGrid classes={classes} />
        </>
    )
}

export default page