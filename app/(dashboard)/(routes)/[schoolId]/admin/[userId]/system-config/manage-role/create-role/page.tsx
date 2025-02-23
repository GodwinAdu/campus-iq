

import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowLeft,  } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CreateRoleForm from "../_component/CreateRoleForm";
import Heading from "@/components/commons/Header";
import { currentUser } from "@/lib/helpers/current-user";

const page = async ({ params }: { params: { adminId: string } }) => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const id = params.adminId;

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Create Role"
          description="Add new role "
        />

        <Link
          href={`/admin/${id}/system-config/manage-role`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <CreateRoleForm type="create" />
    </>
  );
};

export default page;
