import Heading from "@/components/commons/Header"
import { Separator } from "@/components/ui/separator"
import { EditDistribution } from "../_components/EditDistribution"
import { fetchDistributionById } from "@/lib/actions/distribution.actions"


type DistributionParams = Promise<{distributionId:string}>
const page = async ({ params }: { params: DistributionParams }) => {
    const {distributionId} = await params;
    const initialData = await fetchDistributionById(distributionId);
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Update Distributions"
                    description=" categories list "
                />

            </div>
            <Separator />
            <div className="">
                <EditDistribution initialData={initialData} />
            </div>
        </>
    )
}

export default page
