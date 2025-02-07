
import Heading from "@/components/commons/Header";
import AdminForm from "@/components/school/admin/forms/AdminForm";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAllDepartments } from "@/lib/actions/department.actions";
import { getRolesName } from "@/lib/actions/role.actions";
import { currentProfile } from "@/lib/helpers/current-profile";
import { cn } from "@/lib/utils";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
interface RolenameProps {
  _id: string;
  displayName: string;
}

const page = async ({ params }: { params: { schoolId: string, adminId: string } }) => {
  const user = await currentProfile();

  if (!user) redirect("/");

  const roleName = (await getRolesName()) || [];
  const departments = (await getAllDepartments()) || [];
  console.log(departments);

  const id = params.adminId;

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Create Employee" description="Create new Admins and roles" />
        <Link
          href={`/admin/${id}/manage-employee/manage-employees`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="pt-4 w-full">
        <AdminForm type="admin" departments={departments} rolename={roleName} />
      </div>
    </>
  );
};

export default page;
