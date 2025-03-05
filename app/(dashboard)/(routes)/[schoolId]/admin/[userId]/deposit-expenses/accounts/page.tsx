import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { AccountModal } from './_components/AccountModal'
import { columns } from './_components/column'
import { getAllAccounts } from '@/lib/actions/account.actions'
import { DataTable } from '@/components/table/data-table'

const page = async () => {
    const accounts = (await getAllAccounts()) || [];
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Manage Accounts"
                    description="Tips, and information's for the usage of the application."
                />
                <AccountModal />
            </div>
            <Separator />

            <DataTable searchKey='accountName' columns={columns} data={accounts} />

        </>
    )
}

export default page
