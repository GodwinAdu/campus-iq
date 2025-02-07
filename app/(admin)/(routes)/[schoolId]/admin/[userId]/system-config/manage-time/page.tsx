import Heading from '@/components/commons/Header';
import { currentProfile } from '@/lib/helpers/current-profile';
import { currentUserRole } from '@/lib/helpers/getUserRole';
import { redirect } from 'next/navigation';
import React from 'react'
import { TimeModal } from './_component/TimeModel';
import { TableData } from '@/components/table/table-data';
import { Separator } from '@/components/ui/separator';
import { columns } from './_component/column';
import { getAllTimes } from '@/lib/actions/time.actions';

const page = async () => {
  const user = await currentProfile();

  if(!user) redirect("/");

  const role = await currentUserRole();

  const data = await getAllTimes() || [];
  return (
    <>
      <div className="flex justify-between items-center">
      <Heading title="Manage School Time" description="Manage,create and edit school time" />
      {role?.addTime && <TimeModal /> }
      </div>
      <Separator />
      {role?.viewTime && <TableData searchKey="name" columns={columns} data={data} /> } 
    </>
  )
}

export default page
