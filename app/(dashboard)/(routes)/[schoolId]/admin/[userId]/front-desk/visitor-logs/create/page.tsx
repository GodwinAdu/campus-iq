import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import VisitorForm from '../_components/VisitorForm'


const page = () => {
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Add Visitor Log" />
            </div>
            <Separator />

            <div className="py-4">
                <VisitorForm />
            </div>
        </>
    )
}

export default page