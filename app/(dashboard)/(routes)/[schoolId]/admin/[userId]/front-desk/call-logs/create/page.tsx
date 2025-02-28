import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import CallForm from '../_components/CallForm'


const page = () => {
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Add Call Log" />
            </div>
            <Separator />
            {/* Add Postal Form */}
            <div className="py-4">
                <CallForm type="create" />
            </div>
        </>
    )
}

export default page