import Heading from '@/components/commons/Header'
import { DataTable } from '@/components/table/data-table'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { fetchAllParents } from '@/lib/actions/parent.actions'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { columns } from './_components/colums'

const page = async () => {
    const parents = await fetchAllParents() || [];
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Manage Parents"
                    description="Edit and manage School House details"
                />
                <Link
                    href={`manage-parent/create`}
                    className={cn(buttonVariants())}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Create
                </Link>
            </div>
            <Separator />
            <DataTable searchKey='fullName' data={parents} columns={columns} />
        </>
    )
}

export default page
