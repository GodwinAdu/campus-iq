import Heading from '@/components/commons/Header';
import { redirect } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

import { getAllDepartments } from '@/lib/actions/department.actions';
import SalaryAssignGrid from './_components/SalaryAssignGrid';
import { currentUser } from '@/lib/helpers/current-user';
import { currentUserRole } from '@/lib/helpers/get-user-role';

const page = async () => {
    const user = await currentUser();

    if (!user) redirect("/");

    const role = await currentUserRole();

    const departments = (await getAllDepartments()) || [];

    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Assign Salary" description="Manage,create and edit school department" />

            </div>
            <Separator />
            <SalaryAssignGrid departments={departments} />
        </>
    )
}

export default page