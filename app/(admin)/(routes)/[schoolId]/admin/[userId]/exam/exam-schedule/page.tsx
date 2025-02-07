import Heading from "@/components/commons/Header"
import { DataTable } from "@/components/table/data-table"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { columns } from "./_components/column"
import { fetchAllExamSchedule } from "@/lib/actions/exam-schedule.actions"

const page = async () => {
    const data = await fetchAllExamSchedule() || []
    console.log(data,"data")
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Exam Schedule"
                    description=" categories list "
                />
                <Link href={`exam-schedule/create`} className={cn(buttonVariants())}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add
                </Link>
            </div>
            <Separator />
            <div className="py-4">
                <DataTable searchKey="examId" columns={columns} data={data} />
            </div>
        </>
    )
}

export default page
