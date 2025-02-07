import Heading from "@/components/commons/Header"
import { DataTable } from "@/components/table/data-table"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { columns } from "./_components/column"
import { fetchAllGradeRanges } from "@/lib/actions/grade-range.actions"

const page = async () => {
    const data = await fetchAllGradeRanges() || []
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Grade Ranges"
                    description=" categories list "
                />
                <Link href={`grade-ranges/create`} className={cn(buttonVariants())} >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add
                </Link>
            </div>
            <Separator />
            <DataTable searchKey="gradeName" columns={columns} data={data} />
        </>
    )
}

export default page
