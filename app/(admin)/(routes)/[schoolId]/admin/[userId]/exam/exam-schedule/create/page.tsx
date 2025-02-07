import Heading from "@/components/commons/Header"
import { Separator } from "@/components/ui/separator"
import { ExamScheduleForm } from "../_components/ExamScheduleForm"
import { getAllClass } from "@/lib/actions/class.actions"
import { fetchAllExamSetup } from "@/lib/actions/exam-setup.actions"
import { fetchAllHalls } from "@/lib/actions/exam-hall.actions"

const page = async () => {
    const classes = await getAllClass() || [];
    const exams = await fetchAllExamSetup() || [];
    const halls = await fetchAllHalls() || [];
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Exams Schedule"
                    description=" categories list "
                />

            </div>
            <Separator />
            <div className="py-4">
                <ExamScheduleForm type="create" halls={halls} classes={classes} exams={exams} />
            </div>
        </>
    )
}

export default page
