import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import ComplaintForm from '../_components/ComplaintForm'


const page = () => {
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Add Complaint" />
            </div>
            <Separator />
            {/* Add Postal Form */}
            <div className="py-4">
                <ComplaintForm />
            </div>
        </>
    )
}

export default page