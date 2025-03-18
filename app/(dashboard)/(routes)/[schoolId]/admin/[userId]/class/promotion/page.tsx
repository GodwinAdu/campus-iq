import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import PromoteStudentsPage from './_components/promote-student'

const page = () => {
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Student Promotion" description='Manage and promote students to the next grade level' />
            </div>
            <Separator />
            <div className="py-4">
                <PromoteStudentsPage />
            </div>
        </>
    )
}

export default page
