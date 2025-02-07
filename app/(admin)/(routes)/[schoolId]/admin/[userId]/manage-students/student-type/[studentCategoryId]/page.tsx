
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Heading from "@/components/commons/Header";
import { fetchStudentCategoryById } from "@/lib/actions/student-category.actions";
import { EditStudentCategory } from "../_components/EditStudentCategory";
import { currentUser } from "@/lib/helpers/current-user";

type Props = Promise<{ schoolId: string, userId: string, studentCategoryId: string }>
const page = async ({
    params,
}: {
    params: Props
}) => {
    const { schoolId, userId, studentCategoryId } = await params;
    const user = await currentUser();

    if (!user) redirect("/");



    const initialData = await fetchStudentCategoryById(studentCategoryId);

    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Update Student Category"
                    description="Edit and manage School House details"
                />
                <Link
                    href={`/${schoolId}/admin/${userId}/manage-students/student-type`}
                    className={cn(buttonVariants())}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Link>
            </div>
            <Separator />
            <div className="pt-4 w-full">
                <EditStudentCategory initialData={initialData} />
            </div>
        </>
    );
};

export default page;
