import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import PostalForm from '../_components/PostalForm'

type PostalProps = Promise<{postalId:string}>

const page = async ({params}:{params:PostalProps}) => {
    const { postalId } = await params;

    // TODO fetch initial data
    console.log(postalId)

    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Update Postal" />
            </div>
            <Separator />
            {/* Add Postal Form */}
            <div className="py-4">
                <PostalForm type="update" />
            </div>
        </>
    )
}

export default page