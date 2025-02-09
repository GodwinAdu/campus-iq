
import Heading from "@/components/commons/Header";
import { Separator } from "@/components/ui/separator";
import { getAllDepartments } from "@/lib/actions/department.actions";
import { getRolesName } from "@/lib/actions/role.actions";
import { currentUser } from "@/lib/helpers/current-user";
import { redirect } from "next/navigation";
import AdminForm from "./_components/AdminForm";

interface RolenameProps {
  _id: string;
  displayName: string;
}

const page = async ({ params }: { params: { schoolId: string, adminId: string } }) => {
  const user = await currentUser();

  if (!user) redirect("/");

  const roleName = (await getRolesName()) || [];
  const departments = (await getAllDepartments()) || [];
  console.log(departments);

  const id = params.adminId;

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Create Employee" description="Create new Admins and roles" />
      </div>
      <Separator />
      <div className="pt-4 w-full">
        <AdminForm type="admin" departments={departments} rolename={roleName} />
      </div>
    </>
  );
};

export default page;
