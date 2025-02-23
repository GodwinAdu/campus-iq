import Heading from "@/components/commons/Header"
import { DataTable } from "@/components/table/data-table"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { fetchAllExamSetup } from "@/lib/actions/exam-setup.actions"
import { cn } from "@/lib/utils"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { columns } from "./_components/column"

const page = async () => {

    const data = await fetchAllExamSetup() || [];
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Exams Setup"
                    description=" categories list "
                />
                <Link href={`exam-setup/create`} className={cn(buttonVariants())}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add
                </Link>
            </div>
            <Separator />
            <DataTable searchKey="name" data={data} columns={columns} />
        </>
    )
}

export default page
