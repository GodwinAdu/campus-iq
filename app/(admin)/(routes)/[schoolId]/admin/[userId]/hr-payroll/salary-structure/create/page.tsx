import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import SalaryForm from '../_components/SalaryForm'


const page = async () => {
  
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Add New Salary"
                    description="Tips,and information's for the usage of the application."
                />
            </div>
            <Separator />
            <div className="py-4 md:px-6 px-2   mx-auto">
                <SalaryForm type="create" />
            </div>
        </>
    )
}

export default page
