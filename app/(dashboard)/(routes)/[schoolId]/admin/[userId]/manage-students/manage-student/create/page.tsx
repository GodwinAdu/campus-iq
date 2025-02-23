

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft, } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getAllSessions } from "@/lib/actions/session.actions";
import Heading from "@/components/commons/Header";
import { getAllClass } from "@/lib/actions/class.actions";
import { getAllStudentCategories } from '@/lib/actions/student-category.actions';
import { fetchAllParents } from "@/lib/actions/parent.actions";
import { currentUser } from "@/lib/helpers/current-user";
import StudentForm from "../_component/StudentForm";


interface RolenameProps {
  _id: string;
  displayName: string;
}

const page = async ({ params }: { params: { adminId: string } }) => {
  const user = await currentUser();

  if (!user) redirect("/");

  const id = params.adminId;

  const classes = await getAllClass() || [];

  const sessions = await getAllSessions() || [];
  const studentCategory = await getAllStudentCategories() || [];
  const parents = await fetchAllParents() || []



  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Add Student" description="Create new Students and their activities" />
        <Link
          href={`/admin/${id}/manage-users/manage-student`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="pt-4 w-full">
        <StudentForm parents={parents} classes={classes} studentCategories={studentCategory} sessions={sessions} type="create" />
      </div>
    </>
  );
};

export default page;
