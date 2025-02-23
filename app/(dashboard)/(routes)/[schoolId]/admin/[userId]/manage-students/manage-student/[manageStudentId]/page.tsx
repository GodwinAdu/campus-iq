
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAllSessions } from "@/lib/actions/session.actions";
import { fetchStudent } from "@/lib/actions/student.actions";
import { getAllClass } from "@/lib/actions/class.actions";
import Heading from "@/components/commons/Header";
import { fetchAllParents } from "@/lib/actions/parent.actions";
import { currentUser } from "@/lib/helpers/current-user";
import StudentForm from "../_component/StudentForm";
import { getAllStudentCategories } from "@/lib/actions/student-category.actions";


const page = async ({
  params,
}: {
  params: { adminId: string; manageStudentId: string };
}) => {
  const user = await currentUser();

  if (!user) redirect("/");

  const pathId = params.adminId;
  const id = params.manageStudentId;
  console.log(id,"id")

  const initialData = await fetchStudent(id) || {}
  const classes = await getAllClass() || [];

  const sessions = await getAllSessions() || [];
  const studentCategory = await getAllStudentCategories() || [];
  const parents = await fetchAllParents() || []


  console.log(initialData);
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Update student" description="Edit and manage student details" />
        <Link
          href={`/admin/${pathId}/manage-users/manage-student/${id}`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="pt-4 w-full">
        <StudentForm parents={parents} sessions={sessions} studentCategories={studentCategory} type="update" classes={classes}   initialData={initialData}  />
      </div>
    </>
  );
};

export default page;

