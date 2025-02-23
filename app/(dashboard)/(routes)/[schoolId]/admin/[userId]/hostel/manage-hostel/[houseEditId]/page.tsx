
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation"
import { EditHouse } from "../_component/EditHouse";
import { fetchHouseById } from "@/lib/actions/house.actions";
import Heading from "@/components/commons/Header";
import { currentUser } from "@/lib/helpers/current-user";
import { getAllRooms } from "@/lib/actions/room.actions";

type Props = Promise<{ schoolId: string, userId: string, houseEditId: string }>
const page = async ({
  params,
}: {
  params: Props
}) => {
  const {schoolId,userId,houseEditId} = await params;

  const user = await currentUser();

  if (!user) redirect("/");

  const initialData = await fetchHouseById(houseEditId)
  const rooms = await getAllRooms()
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Update House"
          description="Edit and manage School House details"
        />
        <Link
          href={`/${schoolId}/admin/${userId}/system-config/manage-house`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="pt-4 w-full">
        <EditHouse rooms={rooms} initialData={initialData} />
      </div>
    </>
  );
};

export default page;
