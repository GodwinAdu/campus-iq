import React from 'react'
import { EmployeeProfile } from './_components/employee-profile'
import { fetchEmployeeById } from '@/lib/actions/employee.actions';

const page = async ({ params }: { params: Promise<{ userId: string }> }) => {
    const { userId } = await params;
    const employee = await fetchEmployeeById(userId)
    return (
        <>
            <EmployeeProfile employee={employee} />
        </>
    )
}

export default page
