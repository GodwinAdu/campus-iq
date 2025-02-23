import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import SalaryForm from '../_components/SalaryForm'
import { fetchSalaryById } from '@/lib/actions/salary-structure.actions'


const page = async ({ params }: { params: { salaryStructureId: string } }) => {
    // Fetch the initial data here or set it in the component state
    const initialData = (await fetchSalaryById(params.salaryStructureId)) || []

    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Update Salary"
                    description="Tips,and information's for the usage of the application."
                />
            </div>
            <Separator />
            <div className="py-4 md:px-6 px-2   mx-auto">
                <SalaryForm type="update" initialData={initialData} />
            </div>
        </>
    )
}

export default page
