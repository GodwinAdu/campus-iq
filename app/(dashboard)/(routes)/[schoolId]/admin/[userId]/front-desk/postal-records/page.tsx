import Heading from '@/components/commons/Header'
import { DataTable } from '@/components/table/data-table'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { columns } from './_components/column'
import { fetchAllPostals } from '@/lib/actions/postal.actions'

const page = async () => {
  const data = await fetchAllPostals() ?? [];
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="All Postal Records" />
        <Link
          href={`postal-records/create`}
          className={cn(buttonVariants())}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Create
        </Link>
      </div>
      <Separator />
      <div className="py-4">
        <DataTable searchKey="sender" data={data} columns={columns} />
      </div>
    </>
  )
}

export default page