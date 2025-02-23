import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { EditHall } from '../_components/EditHall'
import { fetchHallById } from '@/lib/actions/exam-hall.actions'

type Props = Promise<{examHallId:string}>
const page = async ({ params }: { params:Props}) => {
    const { examHallId } = await params;
    const initialData = await fetchHallById(examHallId)
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Update Exams Hall"
                    description=" categories list "
                />

            </div>
            <Separator />
            <div className="py-4">
                <EditHall initialData={initialData} />
            </div>
        </>
    )
}

export default page
