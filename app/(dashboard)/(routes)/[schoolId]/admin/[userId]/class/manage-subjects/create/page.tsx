
import { Separator } from "@/components/ui/separator";

import { buttonVariants } from "@/components/ui/button"


import Link from "next/link";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import { redirect } from "next/navigation";
import CreateSubjectForm from "../_component/CreateSubject";
import Heading from "@/components/commons/Header";
import { getAllClass } from "@/lib/actions/class.actions";
import { currentUser } from "@/lib/helpers/current-user";


const page = async () => {
  const user = await currentUser();

  if (!user) redirect("/")

  const classes = await getAllClass() || [];


  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Create Subject" description="Create new subjects " />
        <Link href={`manage-admin/create`} className={cn(buttonVariants())} >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add
        </Link>
      </div>
      <Separator />
      <div className="py-4">
        <CreateSubjectForm type="create" classes={classes} />
      </div>
    </>
  );
};

export default page;
