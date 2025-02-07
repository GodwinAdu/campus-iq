import Heading from '@/components/commons/Header'
import { DataTable } from '@/components/table/data-table'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { columns } from './_component/column'
import { PlusCircle } from 'lucide-react'
import { redirect } from 'next/navigation'
import { getAllSubjects } from '@/lib/actions/subject.actions'
import { currentUser } from '@/lib/helpers/current-user'

const page = async () => {
  const user = await currentUser();

  if (!user) redirect("/");

  const data = await getAllSubjects() || [];
  console.log(data,"subjects")

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Manage Subject"
          description="All Users excluding teachers and student will be manage here."
        />
        <Link href={`manage-subjects/create`} className={cn(buttonVariants())}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add
        </Link>
      </div>
      <Separator />
      <DataTable searchKey="subjectName" columns={columns} data={data} />
    </>
  )
}

export default page
