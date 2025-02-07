import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import CreateBookForm from '../_components/CreateBookForm'
import FineAmount from '../_components/FineAmount'
import { fetchFinedAmounts } from '@/lib/actions/book-transaction.actions'

const page = async () => {
    const data = await fetchFinedAmounts()
    console.log(data, "datamain")
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Create Books" description="All Users excluding teachers and student will be manage here." />
                {/* <Link href={`manage-admin/create`} className={cn(buttonVariants())} >
      <PlusCircle className="w-4 h-4 mr-2" />
      Add 
    </Link> */}
            </div>
            <Separator />
            <div className=" px-4 py-4">
                <CreateBookForm type='createBook' />
            </div>

            <div className="">
                <FineAmount data={data} />
            </div>

        </>
    )
}

export default page
