import Heading from '@/components/commons/Header'
import { DataTable } from '@/components/table/data-table'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { columns } from './_components/column'
import { fetchAllBooks } from '@/lib/actions/book.actions'

const page = async () => {
    const data = (await fetchAllBooks()) || []
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Manage Books" description="All Users excluding teachers and student will be manage here." />
                <Link href={`manage-books/create`} className={cn(buttonVariants())} >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add
                </Link>
            </div>
            <Separator />
            <DataTable searchKey="title" columns={columns} data={data} />

        </>
    )
}

export default page
