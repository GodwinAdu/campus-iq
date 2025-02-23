import Heading from "@/components/commons/Header"
import { Separator } from "@/components/ui/separator"
import GradeRangeForm from "../_components/GradeRangeForm"

const page = () => {
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Create Grade Ranges"
                    description=" categories list "
                />

            </div>
            <Separator />
            <div className="py-4">
                <GradeRangeForm type="create" />
            </div>
        </>
    )
}

export default page
