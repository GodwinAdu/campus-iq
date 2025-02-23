import Heading from '@/components/commons/Header'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { PlusCircle } from 'lucide-react'
import { redirect } from 'next/navigation'
import { currentUser } from '@/lib/helpers/current-user'
import SubjectGrid from './_component/subjectGrid'
import { getAllClass } from '@/lib/actions/class.actions'

const page = async () => {
  const user = await currentUser();

  if (!user) redirect("/");

  const classes = await getAllClass() || [];


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
      <SubjectGrid classes={classes} />
    </>
  )
}

export default page
