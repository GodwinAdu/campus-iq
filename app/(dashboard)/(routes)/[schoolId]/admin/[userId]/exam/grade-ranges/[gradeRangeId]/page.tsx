import Heading from "@/components/commons/Header"
import { Separator } from "@/components/ui/separator"
import GradeRangeForm from "../_components/GradeRangeForm"
import { fetchGradeRangeById } from "@/lib/actions/grade-range.actions"

const page = async ({ params }: { params: { gradeRangeId: string } }) => {
    const initialData = await fetchGradeRangeById(params.gradeRangeId as string)
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Update Grade Ranges"
                    description=" categories list "
                />

            </div>
            <Separator />
            <div className="py-4">
                <GradeRangeForm type="create" initialData={initialData} />
            </div>
        </>
    )
}

export default page
