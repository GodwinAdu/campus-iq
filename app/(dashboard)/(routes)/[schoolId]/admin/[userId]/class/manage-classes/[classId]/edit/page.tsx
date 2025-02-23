
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Heading from "@/components/commons/Header";
import { currentUser } from "@/lib/helpers/current-user";
import { fetchClassById } from "@/lib/actions/class.actions";
import { EditClass } from "../../_components/EditClasss";

type ParamsProps = Promise<{ schoolId: string, userId: string, classId: string }>

const page = async ({
    params,
}: {
    params: ParamsProps,
}) => {
    const user = await currentUser();

    if (!user) redirect("/");

    const { schoolId, userId, classId } = await params;

    const initialData = await fetchClassById(classId);

    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Update Class" description="Edit and manage Term details" />
                <Link
                    href={`/${schoolId}/admin/${userId}/class/manage-classes`}
                    className={cn(buttonVariants())}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Link>
            </div>
            <Separator />
            <div className="pt-4 w-full">
                <EditClass initialData={initialData} />
            </div>
        </>
    );
};

export default page;