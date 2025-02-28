import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'


const page = () => {
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Add Visitor Log" />
            </div>
            <Separator />
            {/* Add Postal Form */}
            <div className="py-4">
                {/* <PostalForm /> */}
            </div>
        </>
    )
}

export default page