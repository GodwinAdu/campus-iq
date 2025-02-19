
import Heading from "@/components/commons/Header";
import { Separator } from "@/components/ui/separator";
import { getAllDepartments } from "@/lib/actions/department.actions";
import { getRolesName } from "@/lib/actions/role.actions";
import { currentUser } from "@/lib/helpers/current-user";
import { redirect } from "next/navigation";
import { getAllClass } from "@/lib/actions/class.actions";
import AdminForm from "../_components/AdminForm";
import { fetchEmployeeById } from "@/lib/actions/employee.actions";

type Props = Promise<{employeeId:string}>

const page = async ({ params }: { params: Props }) => {
    const { employeeId } = await params;
    const user = await currentUser();

    if (!user) redirect("/");

    const roleName = (await getRolesName()) || [];
    const departments = (await getAllDepartments()) || [];
    const classes = await getAllClass()
    const initialData = await fetchEmployeeById(employeeId)

    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Update Employee" description="Create new Admins and roles" />
            </div>
            <Separator />
            <div className="pt-4 w-full">
                <AdminForm type="update" classes={classes} departments={departments} rolename={roleName} initialData={initialData} />
            </div>
        </>
    );
};

export default page;
