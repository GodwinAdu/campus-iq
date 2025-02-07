import Heading from '@/components/commons/Header'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import ExpensesGrid from './_components/ExpensesGrid'
import { getAllAccounts } from '@/lib/actions/account.actions'

const page = async () => {
    const accounts = await getAllAccounts()
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Manage Expenses"
                    description="Tips, and information's for the usage of the application."
                />
                <Link href={`new-expenses/create`} className={cn(buttonVariants({ size: "sm" }))}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add New
                </Link>
            </div>
            <Separator />
            <div className="">
                <ExpensesGrid accounts={accounts} />
            </div>

        </>
    )
}

export default page
