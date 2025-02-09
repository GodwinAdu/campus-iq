import { fetchFeePaymentForStudent } from '@/lib/actions/fees-payment.actions'
import React from 'react'
import { InvoicePaymentTabs } from '../_components/InvoicePaymentTabs'
import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import { getAllAccounts } from '@/lib/actions/account.actions'

type Params = Promise<{ schoolId: string, feesPaymentId: string }>
const page = async ({ params }: { params:Params}) => {
    const {feesPaymentId} = await params;
    // Extracting A and B
    const index = feesPaymentId.indexOf('-');
    const classId = feesPaymentId.substring(0, index);
    const studentId = feesPaymentId.substring(index + 1);

    const payed = await fetchFeePaymentForStudent(classId, studentId);

    const accounts = await getAllAccounts() || [];
    console.log(payed, "payment")
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Invoice History"
                />

            </div>
            <Separator />
            <div className="py-4">
                <InvoicePaymentTabs  data={payed} accounts={accounts} />
            </div>
        </>
    )
}

export default page
