
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/helpers/current-profile";
import { EditTime } from "../_component/EditTime";
import { fetchTimeById } from "@/lib/actions/time.actions";
import Heading from "@/components/commons/Header";

const page = async ({
  params,
}: {
  params: { adminId: string; timeEditId: string };
}) => {
  const user = await currentProfile();

  if (!user) redirect("/");

  const pathId = params.adminId;
  const id = params.timeEditId;

  const initialData = (await fetchTimeById({ id })) || {};

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Update Time"
          description="Edit and manage Time details"
        />
        <Link
          href={`/admin/${pathId}/system-config/manage-time`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="pt-4 w-full">
        <EditTime initialData={initialData} />
      </div>
    </>
  );
};

export default page;
