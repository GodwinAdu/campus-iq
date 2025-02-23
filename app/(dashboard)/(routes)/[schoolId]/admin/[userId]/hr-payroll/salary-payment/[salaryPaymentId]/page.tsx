import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import { fetchSalaryPaymentById } from '@/lib/actions/salary-payment.actions'
import Payroll from '../_components/Payroll'

const page = async ({ params }: { params: { salaryPaymentId: string } }) => {
    const salaryPayment = await fetchSalaryPaymentById(params.salaryPaymentId)
    console.log(salaryPayment, "salaryPayment")
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Payroll" />

            </div>
            <Separator />
            <div className="py-4">
                {salaryPayment.status === "unpaid" ? (
                    <Payroll salaryPayment={salaryPayment} />
                ) : (
                    <p>hello</p>
                )}
            </div>
        </>
    )
}

export default page
