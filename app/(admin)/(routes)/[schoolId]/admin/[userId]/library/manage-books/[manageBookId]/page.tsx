import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import CreateBookForm from '../_components/CreateBookForm'
import FineAmount from '../_components/FineAmount'
import { fetchFinedAmounts } from '@/lib/actions/book-transaction.actions'
import { fetchBookById } from '@/lib/actions/book.actions'

const page = async ({params}:{params:{manageBookId:string}}) => {
    const data = await fetchBookById(params.manageBookId)
    
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Create Books" description="All Users excluding teachers and student will be manage here." />
                
            </div>
            <Separator />
            <div className=" px-4 py-4">
                <CreateBookForm initialData={data} type='updateBook' />
            </div>

        
        </>
    )
}

export default page
