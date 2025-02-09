"use client"

import React, { useEffect, useState } from 'react'
import { CellAction } from './cell-action'
import { fetchEmployeesList } from '@/lib/actions/employee.actions'
import DepartmentSelection from '@/components/commons/DepartmentSelection'

const EmployeeListGrid = ({ departments }: { departments: IDepartment[] }) => {
    const [selectedDepartment, setSelectedDepartment] = useState(departments[0]._id)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [rowData, setRowData] = useState([]);
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                setIsLoading(true)
                const data = await fetchEmployeesList(selectedDepartment as string)
                setRowData(data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        const newColumnDefs = [
            { field: "fullName" },
            { field: "role" },
            { field: "email", minWidth: 500, },
            {
                field: "actions",
                headerName: "Actions",
                cellRenderer: CellAction,
            },
        ];
        fetchEmployee()
    }, []);


    return (
        <>
            <div className="border py-1 px-4 flex gap-5 items-center my-1">

                <div className="flex gap-4 items-center">
                    <label className="font-bold text-sm hidden lg:block">Select Department</label>
                    <DepartmentSelection selectedDepartment={(value) => setSelectedDepartment(value)} departments={departments} />
                </div>
                
            </div>
            <div className="py-4 mt-2 px-2">

            </div>


        </>
    )
}

export default EmployeeListGrid
