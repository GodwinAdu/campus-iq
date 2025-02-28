import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { getAllClass } from '@/lib/actions/class.actions'
import WellbeingGrid from './_components/WellbeingGrid'

const page = async () => {
    const classes = await getAllClass() ?? [];
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Well Being Tracker" />

            </div>
            <Separator />
            <WellbeingGrid classes={classes} />
        </>
    )
}

export default page