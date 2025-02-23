
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Heading from "@/components/commons/Header";
import { EditAccount } from "../_components/EditAccount";
import { currentUser } from "@/lib/helpers/current-user";
import { getAccountById } from "@/lib/actions/account.actions";

type AccountProps = Promise<{ schoolId: string, userId: string, accountId: string }>
const page = async ({
  params,
}: {
  params:AccountProps
}) => {
  const user = await currentUser();

  if (!user) redirect("/");

const {schoolId,userId,accountId} = await params;
  const initialData = await getAccountById(accountId)

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Update Account"
          description="Edit and manage School House details"
        />
        <Link
          href={`/${schoolId}/admin/${userId}/deposit-expenses/accounts`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="pt-4 w-full">
        <EditAccount initialData={initialData} />
      </div>
    </>
  );
};

export default page;
