"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { fetchSalaryPayment } from '@/lib/actions/salary-payment.actions';
import { toast } from '@/hooks/use-toast';
import DepartmentSelection from '@/components/commons/DepartmentSelection';
import { DataTable } from '@/components/table/data-table';
import { columns } from './column';

const StatusCellRenderer = ({ value }: { value: "unpaid" | "paid" }) => {
    return (
        <span style={{ color: value === 'unpaid' ? 'red' : 'green' }}>
            {value}
        </span>
    );
};
const SalaryPaymentGrid = ({ departments }: { departments:IDepartment[] }) => {
    const [selectedDepartment, setSelectedDepartment] = useState(departments[0]._id)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [employeeList, setEmployeeList] = useState([]);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                setIsLoading(true)
                const data = await fetchSalaryPayment(selectedDepartment as string)

                console.log(data,"employ useEffect fetchSalaryPayment")
                const transformedData = data?.map(payment => ({
                    employeeId: payment.employeeId._id,
                    staffId: payment.employeeId.staffId,
                    fullName: payment.employeeId.fullName,
                    departmentName: payment.employeeId.departmentId?.name || '',
                    paymentAmount: payment.paymentAmount,
                    paymentDate: payment.paymentDate,
                    salaryName: payment.salaryStructureId?.salaryName || '',
                    status: payment.status,
                    updatedAt: payment.updatedAt,
                    _id: payment._id
                }));
                setEmployeeList(transformedData);
            } catch (error) {
                console.log(error)
                toast({
                    title: "something went wrong",
                    description: "Please try again later",
                    variant: "destructive",
                })
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
        <DataTable searchKey='fullName' data={employeeList} columns={columns} isLoading={isLoading} />
            </div>


        </>
    )
}

export default SalaryPaymentGrid
