import Heading from '@/components/commons/Header';

import { redirect } from 'next/navigation';
import React from 'react'
import { HouseModal } from './_component/HouseModal';
import { Separator } from '@/components/ui/separator';
import { columns } from './_component/column';
import { getAllHouses } from '@/lib/actions/house.actions';
import { currentUserRole } from '@/lib/helpers/get-user-role';
import { currentUser } from '@/lib/helpers/current-user';
import { DataTable } from '@/components/table/data-table';
import { getAllRooms } from '@/lib/actions/room.actions';

const page = async () => {
  const user = await currentUser();

  if (!user) redirect("/");

  const role = await currentUserRole();

  const data = await getAllHouses() || []
  const rooms = await getAllRooms();
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Manage Hostel" description="Manage,create and edit school house" />
        <HouseModal rooms={rooms} />
      </div>
      <Separator />
      <div className="">
        <DataTable searchKey='name' data={data} columns={columns} />
      </div>
    </>
  )
}

export default page
