import Heading from "@/components/commons/Header";
import { createMarkEntries } from "@/lib/actions/mark-entries.actions"
import { MarkEntriesForm } from "../_components/MarkEntriesForm";
import { Separator } from "@/components/ui/separator";
import CalculatorDropdown from "../_components/CalculatorDropdown";
import PercentDropdown from "../_components/PercentDropdown";

type MarkProps = Promise<{markEntriesId:string}>
const page = async ({ params }: { params: MarkProps }) => {
    const {markEntriesId} = await params;
    const response = await createMarkEntries(markEntriesId);
    console.log(response, "MarkEntries")
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title={`Enter ${response?.studentId?.fullName}'s Marks`}
                    // description=" categories list "
                />
                <div className=" flex gap-6 mr-20">
                    <PercentDropdown />
                    <CalculatorDropdown />
                </div>

            </div>
            <Separator />
            <div className="py-4">
                <MarkEntriesForm mark={response} />
            </div>
        </>
    )
}

export default page
