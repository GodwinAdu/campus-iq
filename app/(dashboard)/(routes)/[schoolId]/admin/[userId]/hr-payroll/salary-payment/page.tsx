import Heading from '@/components/commons/Header';
import { redirect } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

import { getAllDepartments } from '@/lib/actions/department.actions';
import SalaryPaymentGrid from './_components/SalaryPaymentGrid';
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
                <Heading title="Salary Payment" description="Manage,create and edit school department" />

            </div>
            <Separator />
            <SalaryPaymentGrid departments={departments} />
        </>
    )
}

export default page