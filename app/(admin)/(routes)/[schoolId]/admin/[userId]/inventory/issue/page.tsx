import Heading from '@/components/commons/Header'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { fetchAllInventoryIssues } from '@/lib/actions/inventory-issue.actions'

import { cn } from '@/lib/utils'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { columns } from './_components/column'
import { DataTable } from '@/components/table/data-table'


const page = async () => {

  const data = await fetchAllInventoryIssues() || []


  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Issued Tracking"
          description=" categories list "
        />
        <Link href={`issue/create`} className={cn(buttonVariants())}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add
        </Link>
      </div>
      <Separator />
      <DataTable searchKey='issueDate' columns={columns} data={data} />

    </>
  )
}

export default page
