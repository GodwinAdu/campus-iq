import Heading from '@/components/commons/Header';
import { currentProfile } from '@/lib/helpers/current-profile';
import { currentUserRole } from '@/lib/helpers/getUserRole';
import { redirect } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import EmployeeListGrid from './_components/EmployeeListGrid';
import { getAllDepartments } from '@/lib/actions/department.actions';

const page = async () => {
    const user = await currentProfile();

    if (!user) redirect("/");

    const role = await currentUserRole();

    const departments = (await getAllDepartments()) || [];

    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Employees List" description="Manage,create and edit school department" />

            </div>
            <Separator />
            <EmployeeListGrid departments={departments} />
        </>
    )
}

export default page