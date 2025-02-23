import Heading from '@/components/commons/Header'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import ExpensesForm from '../_components/ExpensesForm'
import { getAllAccounts } from '@/lib/actions/account.actions'

const page = async () => {

const accounts = await getAllAccounts()
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Create Expenses"
                    description="Tips, and information's for the usage of the application."
                />
                
            </div>
            <Separator />
            <div className="py-4">
                <ExpensesForm type='create' accounts={accounts} />
            </div>

        </>
    )
}

export default page
