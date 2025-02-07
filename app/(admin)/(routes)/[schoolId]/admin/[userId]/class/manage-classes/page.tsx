import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import { redirect } from 'next/navigation'
import React from 'react'
import { ClassModal } from './_components/ClassModal'
import { columns } from './_components/column'
import { DataTable } from '@/components/table/data-table'
import { currentUser } from '@/lib/helpers/current-user'
import { currentUserRole } from '@/lib/helpers/get-user-role'
import { getAllClass } from '@/lib/actions/class.actions'


const page = async () => {
  const user = await currentUser();

  if(!user) redirect("/");

  const role = await currentUserRole();

  const data = await getAllClass() || [];
  return (
    <>
    <div className="flex justify-between items-center">
    <Heading title="Manage Classes" description="Manage,create and edit school Stages" />
    {role?.addClass && <ClassModal /> }
    </div>
    <Separator />
    <DataTable searchKey="name" columns={columns} data={data} />  
  </>
  )
}

export default page
