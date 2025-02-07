import Heading from '@/components/commons/Header'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { DataTable } from '@/components/table/data-table'
import { columns } from './_components/column'
import { fetchAllBooksIssued } from '@/lib/actions/book-transaction.actions'

const page = async () => {

  const data = (await fetchAllBooksIssued()) || [];
 
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Issue History" description="All Users excluding teachers and student will be manage here." />
        <Link href={`manage-issue-books/create`} className={cn(buttonVariants())} >
          <PlusCircle className="w-4 h-4 mr-2" />
          Issue Book
        </Link>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={data} />
    </>
  )
}

export default page
