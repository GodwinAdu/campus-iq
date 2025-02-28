import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import CallForm from '../_components/CallForm'
import { fetchCallById } from '@/lib/actions/call-log.actions'


type CallLogProps = Promise<{callLogId:string}>
const page = async({params}:{params:CallLogProps}) => {
    const { callLogId } = await params;
    const initialData = await fetchCallById(callLogId);
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Add Call Log" />
            </div>
            <Separator />
            {/* Add Postal Form */}
            <div className="py-4">
                <CallForm type="update" initialData={initialData} />
            </div>
        </>
    )
}

export default page