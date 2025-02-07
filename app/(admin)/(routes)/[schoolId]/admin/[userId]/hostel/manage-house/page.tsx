import Heading from '@/components/commons/Header';

import { redirect } from 'next/navigation';
import React from 'react'
import { HouseModal } from './_component/HouseModal';
import { Separator } from '@/components/ui/separator';
;
import { columns } from './_component/column';
import { getAllHouses } from '@/lib/actions/house.actions';
import { currentUserRole } from '@/lib/helpers/get-user-role';
import { currentUser } from '@/lib/helpers/current-user';

const page = async () => {
  const user = await currentUser();

  if (!user) redirect("/");

  const role = await currentUserRole();

  const data = await getAllHouses() || []
  return (
    <>
      {/* <div className="flex justify-between items-center">
        <Heading title="Manage School House" description="Manage,create and edit school house" />
        {role?.addHouse && <HouseModal />}
      </div>
      <Separator />
      {role?.viewHouse && <TableData searchKey="name" columns={columns} data={data} />} */}
    </>
  )
}

export default page
