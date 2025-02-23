import Heading from '@/components/commons/Header';
import { redirect } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { getAllDepartments } from '@/lib/actions/department.actions';
import { DepartmentModal } from './_components/DepartmentModal';
import { columns } from './_components/column';
import { currentUser } from '@/lib/helpers/current-user';
import { currentUserRole } from '@/lib/helpers/get-user-role';
import { DataTable } from '@/components/table/data-table';

const page = async () => {
  const user = await currentUser();

  if (!user) redirect("/");

  const role = await currentUserRole();

  const data = await getAllDepartments() || []
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Manage Department" description="Manage,create and edit school department" />
        <DepartmentModal />
      </div>
      <Separator />
      <div className="">
        <DataTable searchKey="name" columns={columns} data={data} />
      </div>
    </>
  )
}

export default page