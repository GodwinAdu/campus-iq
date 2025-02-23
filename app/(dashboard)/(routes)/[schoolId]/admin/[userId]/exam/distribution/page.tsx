import Heading from "@/components/commons/Header"
import { Separator } from "@/components/ui/separator"
import { DistributionModal } from "./_components/DistributionModal"
import { DataTable } from "@/components/table/data-table"
import { columns } from "./_components/column"
import { fetchAllDistributions } from "@/lib/actions/distribution.actions"

const page = async () => {

    const data = await fetchAllDistributions() || [];
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Mark Distributions"
                    description=" categories list "
                />
                <DistributionModal />
            </div>
            <Separator />
            <DataTable searchKey="markDistribution" columns={columns} data={data} />
        </>
    )
}

export default page
