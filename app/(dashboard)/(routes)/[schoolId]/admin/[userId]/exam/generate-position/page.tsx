import Heading from "@/components/commons/Header"
import { Separator } from "@/components/ui/separator"
import PositionGrid from "./_components/PositionGrid"
import { getAllClass } from "@/lib/actions/class.actions"

const page = async () => {
    const classes = await getAllClass() || []
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Generate Position"
                    description=" categories list "
                />
            </div>
            <Separator />
            <div className="py-4">
                <PositionGrid classes={classes} />
            </div>
        </>
    )
}

export default page
