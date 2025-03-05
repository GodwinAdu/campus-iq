import Heading from '@/components/commons/Header'
import { DataTable } from '@/components/table/data-table'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { columns } from './_components/column'
import { fetchAllCalls } from '@/lib/actions/call-log.actions'

const page = async () => {
  const data = await fetchAllCalls() || []
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="All Call Logs" />
        <Link
          href={`call-logs/create`}
          className={cn(buttonVariants())}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Create
        </Link>
      </div>
      <Separator />

      <div className="py-4">
        <DataTable searchKey='callerName' data={data} columns={columns} />
      </div>
    </>
  )
}

export default page