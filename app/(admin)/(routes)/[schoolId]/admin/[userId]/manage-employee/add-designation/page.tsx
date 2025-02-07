import Heading from '@/components/commons/Header';
import { currentProfile } from '@/lib/helpers/current-profile';
import { currentUserRole } from '@/lib/helpers/getUserRole';
import { redirect } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { TableData } from '@/components/table/table-data';

import { getAllHouses } from '@/lib/actions/house.actions';
import { DesignationModal } from './_components/DesignationModal';


const page = async () => {
  const user = await currentProfile();

  if (!user) redirect("/");

  const role = await currentUserRole();

  const data = await getAllHouses() || []
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Manage Designation" description="Manage,create and edit school department" />
        {role?.addSchoolHouse && <DesignationModal />}
      </div>
      <Separator />
      {/* {role?.viewSchoolHouse && <TableData searchKey="name" columns={columns} data={data} />} */}
    </>
  )
}

export default page