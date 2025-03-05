import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import PostalForm from '../_components/PostalForm'

const page = () => {
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Add Postal" />
            </div>
            <Separator />
            {/* Add Postal Form */}
            <div className="py-4">
                <PostalForm type='create' />
            </div>
        </>
    )
}

export default page