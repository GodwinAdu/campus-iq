
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import Heading from "@/components/commons/Header";
import { EditDepartment } from "../_components/EditDepartment";
import { fetchDepartmentById } from "@/lib/actions/department.actions";
import { currentUser } from "@/lib/helpers/current-user";
type Params = Promise<{ departmentId: string }>
const page = async ({
  params,
}: {
  params: Params;
}) => {
  const user = await currentUser();

  if (!user) redirect("/");

  const { departmentId } = await params;

  const initialData = (await fetchDepartmentById(departmentId)) || {};

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Update Department"
          description="Edit and manage School House details"
        />

      </div>
      <Separator />
      <div className="pt-4 w-full">
        <EditDepartment initialData={initialData} />
      </div>
    </>
  );
};

export default page;
