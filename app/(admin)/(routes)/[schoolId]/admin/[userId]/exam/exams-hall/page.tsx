import Heading from "@/components/commons/Header"
import { Separator } from "@/components/ui/separator"
import { HallModal } from "./_components/HallModal"
import { DataTable } from "@/components/table/data-table"
import { columns } from "./_components/column"
import { fetchAllHalls } from "@/lib/actions/exam-hall.actions"

const page = async () => {
    const data = await fetchAllHalls() || []
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Manage Exams Hall"
                    description=" categories list "
                />
                <HallModal />
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
        </>
    )
}

export default page
