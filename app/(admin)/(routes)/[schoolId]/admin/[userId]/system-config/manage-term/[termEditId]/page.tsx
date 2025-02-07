
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { EditTerm } from "../_components/EditTerm";
import { fetchTermById } from "@/lib/actions/term.actions";
import Heading from "@/components/commons/Header";
import { currentUser } from "@/lib/helpers/current-user";

type ParamsProps = Promise<{schoolId:string,userId:string,termEditId:string}>

const page = async ({
  params,
}: {
  params:ParamsProps,
}) => {
  const user = await currentUser();

  if (!user) redirect("/");

const {schoolId,userId,termEditId} = await params;

  const initialData = await fetchTermById(termEditId)

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Update Term" description="Edit and manage Term details" />
        <Link
          href={`/${schoolId}/admin/${userId}/system-config/manage-term`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="pt-4 w-full">
        <EditTerm initialData={initialData} />
      </div>
    </>
  );
};

export default page;