import Heading from '@/components/commons/Header'
import React from 'react'
import { SessionModal } from './_component/SessionModal'
import { columns } from './_component/column'
import { redirect } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { getAllSessions } from '@/lib/actions/session.actions'
import { currentUser } from '@/lib/helpers/current-user'
import { currentUserRole } from '@/lib/helpers/get-user-role'
import { DataTable } from '@/components/table/data-table'

const page = async () => {
  // Fetch the current user profile
  const user = await currentUser();

  // Redirect to the homepage if no user is found
  if (!user) redirect("/");

  // Fetch the current user's role
  const role = await currentUserRole();

  // Fetch all terms, defaulting to an empty array if none are found
  const data = (await getAllSessions()) || [];
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Academic year/Sessions" description="Manage,create and edit academic year" />
        {role?.addSession && <SessionModal />}
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  )
}

export default page
