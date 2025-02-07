import Heading from '@/components/commons/Header'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import FineForm from '../_components/FineForm'
import { getAllClass } from '@/lib/actions/class.actions'

const page = async () => {
    const stages = await getAllClass() || []
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Create Fine"
                    description="Tips, and information's for the usage of the application."
                />
            </div>
            <Separator />
            <div className="py-4">
                <FineForm stages={stages} />
            </div>
        </>
    )
}

export default page
