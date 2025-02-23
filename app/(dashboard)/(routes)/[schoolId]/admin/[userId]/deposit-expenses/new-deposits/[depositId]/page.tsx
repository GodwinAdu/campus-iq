import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import DepositForm from '../_components/DepositForm'
import { getAllAccounts } from '@/lib/actions/account.actions'
type DepositProps = Promise<{depositId:string}>
const page = async ({params}:{params:DepositProps}) => {
    const {depositId } = await params;
    const accounts = await getAllAccounts();
    // const initialData = await fetchD
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Create Deposit"
                    description="Tips, and information's for the usage of the application."
                />

            </div>
            <Separator />
            <div className="py-4">
                <DepositForm accounts={accounts} type="update" />
            </div>

        </>
    )
}

export default page
