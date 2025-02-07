
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { EditSession } from "../_component/EditSession";
import { fetchSessionById } from "@/lib/actions/session.actions";
import Heading from "@/components/commons/Header";
import { currentUser } from "@/lib/helpers/current-user";


type UserIdAndSessionId = Promise<{ schoolId: string, userId: string, sessionEditId: string }>
const page = async ({
  params,
}: {
  params: UserIdAndSessionId
}) => {
  const user = await currentUser();

  if (!user) redirect("/");

  const {schoolId, userId, sessionEditId } = await params;

  const initialData = await fetchSessionById(sessionEditId) || {}

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Update Session" description="Edit and manage Session/Academic details" />
        <Link
          href={`/${schoolId}/admin/${userId}/system-config/manage-sessions`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="pt-4 w-full">
        <EditSession initialData={initialData} />
      </div>
    </>
  );
};

export default page;