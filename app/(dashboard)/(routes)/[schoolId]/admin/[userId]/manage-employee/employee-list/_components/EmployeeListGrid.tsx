"use client"

import React, { useEffect, useState } from 'react'
import { fetchEmployeesList } from '@/lib/actions/employee.actions'
import DepartmentSelection from '@/components/commons/DepartmentSelection'
import { DataTable } from '@/components/table/data-table'
import { columns } from './column'

const EmployeeListGrid = ({ departments }: { departments: IDepartment[] }) => {
    const [selectedDepartment, setSelectedDepartment] = useState(departments[0]._id)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [rowData, setRowData] = useState([]);
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                setIsLoading(true)
                const data = await fetchEmployeesList(selectedDepartment as string)
                const newValues = data.map((value:IEmployee) => ({
                    ...value,
                    staffID: value.employment.employeeID,
                }))
    setRowData(newValues)
} catch (error) {
    console.log(error)
} finally {
    setIsLoading(false)
}
        }
fetchEmployee()
    }, [selectedDepartment]);


return (
    <>
        <div className="border py-1 px-4 flex gap-5 items-center my-1">

            <div className="flex gap-4 items-center">
                <label className="font-bold text-sm hidden lg:block">Select Department</label>
                <DepartmentSelection selectedDepartment={(value) => setSelectedDepartment(value)} departments={departments} />
            </div>

        </div>
        <div className="py-4 mt-2 px-2">
            <DataTable searchKey='fullName' columns={columns} isLoading={isLoading} data={rowData} />

        </div>
    </>
)
}

export default EmployeeListGrid
