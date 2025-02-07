
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/helpers/current-profile";
import { EditHouse } from "../_component/EditHouse";
import { fetchHouseById } from "@/lib/actions/house.actions";
import Heading from "@/components/commons/Header";

const page = async ({
  params,
}: {
  params: { adminId: string; houseEditId: string };
}) => {
  const user = await currentProfile();

  if (!user) redirect("/");

  const pathId = params.adminId;
  const id = params.houseEditId;

  const initialData = (await fetchHouseById({ id })) || {};

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Update House"
          description="Edit and manage School House details"
        />
        <Link
          href={`/admin/${pathId}/system-config/manage-house`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="pt-4 w-full">
        <EditHouse initialData={initialData} />
      </div>
    </>
  );
};

export default page;
