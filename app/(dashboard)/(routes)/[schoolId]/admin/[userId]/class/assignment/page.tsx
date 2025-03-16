import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import AssignmentManagement from './_components/AssignmentForm'
import { getAllClass } from '@/lib/actions/class.actions'

const page = async () => {
    const classes = await getAllClass() ?? []
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Assignment Management"
                    description='Create, manage, and grade assignments for your classes'
                />
            </div>
            <Separator />
            <div className="">
                <AssignmentManagement classes={classes} />
            </div>
        </>
    )
}

export default page