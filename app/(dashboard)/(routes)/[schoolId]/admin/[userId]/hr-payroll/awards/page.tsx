import Heading from '@/components/commons/Header'
import { DataTable } from '@/components/table/data-table'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { fetchAllAwards } from '@/lib/actions/award.actions'
import { cn } from '@/lib/utils'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { columns } from './_components/column'

const page = async () => {

  const awards = await fetchAllAwards() || [];
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Awards" description="Manage,create and edit school house" />
        <Link href={`awards/create`} className={cn(buttonVariants())}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add
        </Link>
      </div>
      <Separator />
      <div className="">
        <DataTable searchKey='awardName' columns={columns} data={awards} />
      </div>
    </>
  )
}

export default page
