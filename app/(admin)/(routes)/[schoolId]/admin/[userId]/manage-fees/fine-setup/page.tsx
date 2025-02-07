import Heading from '@/components/commons/Header'
import { DataTable } from '@/components/table/data-table'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { columns } from './_components/column'
import { fetchAllFeesFine } from '@/lib/actions/fees-fine.actions'

const page = async () => {
  const data = await fetchAllFeesFine() || [];
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Fine Setup"
          description="Tips, and information's for the usage of the application."
        />
        <Link href={`fine-setup/create`} className={cn(buttonVariants({ size: "sm" }))}>
          <PlusCircle className="w-4 h-4 mr-2" />
          New Fine
        </Link>
      </div>
      <Separator />
      <DataTable searchKey='feesType' columns={columns} data={data} />

    </>
  )
}

export default page
