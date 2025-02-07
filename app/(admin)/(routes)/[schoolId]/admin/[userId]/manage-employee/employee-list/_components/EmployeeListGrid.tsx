"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { CellAction } from './cell-action'

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { fetchEmployeesList } from '@/lib/actions/employee.actions'
import DepartmentSelection from '@/components/school/admin/DepartmentSelection'

const EmployeeListGrid = ({ departments }: { departments: any[] }) => {
    const [selectedDepartment, setSelectedDepartment] = useState("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([]);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState<{ field: string, width?: number, editable?: boolean }[]>([])

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                setIsLoading(true)
                const departmentId = departments[0]._id;
                const data = await fetchEmployeesList(departmentId)
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
        setColDefs(newColumnDefs);
        fetchEmployee()
    }, []);



    const onSearchHandler = async () => {
        try {
            setIsLoading(true)
            const departmentId = selectedDepartment;
            const data = await fetchEmployeesList(departmentId)
            setRowData(data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    /**
   * Pagination settings for the grid.
   */
    const pagination = true;
    const paginationPageSize = 200;
    const paginationPageSizeSelector = [200, 500, 1000];
    return (
        <>
            <div className="border py-1 px-4 flex gap-5 items-center my-1">

                <div className="flex gap-4 items-center">
                    <label className="font-bold text-sm hidden lg:block">Select Department</label>
                    <DepartmentSelection SelectedDepartment={(value) => setSelectedDepartment(value)} departments={departments} />
                </div>
                <Button disabled={isLoading} className="flex" size="sm" onClick={onSearchHandler}>{isLoading ? (<Loader2 className="w-4 h-4 ml-2 animate-spin" />) : "Search"}</Button>
            </div>
            <div className="py-4 mt-2 px-2">

                <div
                    className="ag-theme-quartz" // applying the grid theme
                    style={{ height: 500, width: "100%" }} // the grid will fill the size of the parent container
                >
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={colDefs}
                        pagination={pagination}
                        paginationPageSize={paginationPageSize}
                        paginationPageSizeSelector={paginationPageSizeSelector}
                    />
                </div>
            </div>


        </>
    )
}

export default EmployeeListGrid
