import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import { redirect } from 'next/navigation'
import React from 'react'
import { getAllClass } from '@/lib/actions/class.actions'
import { PlusCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import StudentGrid from './_component/StudentGrid'
import { currentUser } from '@/lib/helpers/current-user'

const page = async () => {
  const user = await currentUser();

  if (!user) redirect("/");

  // const role = await currentUserRole();

  const data = await getAllClass() || [];

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Manage Students" description="Manage,create and edit school Stages" />
        <Link href={`manage-student/create`} className={cn(buttonVariants())} >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add
        </Link>
      </div>
      <Separator />
      <div className="">
        <StudentGrid classes={data} />
      </div>

    </>
  )
}

export default page