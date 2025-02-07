import Heading from "@/components/commons/Header";
import { DataTable } from "@/components/table/data-table";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAllAdmins } from "@/lib/actions/employee.actions";
import { currentProfile } from "@/lib/helpers/current-profile";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { columns } from "./_components/column";



const page = async ({
  params
}: {
  params: { adminId: string }
}) => {
  const user = await currentProfile();

  if (!user) redirect("/")

  const data = (await getAllAdmins()) || [];


  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Manage Employees" description="All Users excluding teachers and student will be manage here." />
        <Link href={`manage-employees/create`} className={cn(buttonVariants())} >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add
        </Link>
      </div>
      <Separator />
      <DataTable searchKey="fullName" columns={columns} data={data} />

    </>
  );
};

export default page;

