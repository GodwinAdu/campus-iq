
import Heading from "@/components/commons/Header";
import AdminForm from "@/components/school/admin/forms/AdminForm";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAllDepartments } from "@/lib/actions/department.actions";
import { fetchAdminById } from "@/lib/actions/employee.actions";
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

const page = async ({ params }: { params: { manageAdminId: string } }) => {
  const user = await currentProfile();

  if (!user) redirect("/");

  const adminId = params.manageAdminId as string;

  const roleName = (await getRolesName()) || [];
  const departments = (await getAllDepartments()) || [];

  const initialData = await fetchAdminById(adminId);

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Update Employee" description="Create new Employee and roles" />

      </div>
      <Separator />
      <div className="pt-4 w-full">
        <AdminForm type="updateAdmin" departments={departments} rolename={roleName} initialData={initialData} />
      </div>
    </>
  );
};

export default page;

