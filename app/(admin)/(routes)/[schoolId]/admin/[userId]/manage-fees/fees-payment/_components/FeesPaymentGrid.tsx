"use client"


import { fetchFeePayment } from '@/lib/actions/fees-payment.actions'
import React, { useEffect, useState } from 'react';
import ClassSelection from '@/components/commons/ClassSelection';
import { DataTable } from '@/components/table/data-table';
import { columns } from './column';

const FeesPaymentGrid = ({ classes }: { classes: IClass[] }) => {
    const [selectedClass, setSelectedClass] = useState(classes[0]?._id);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        const fetchPayment = async () => {
            try {
                setIsLoading(true)
                const data = await fetchFeePayment(selectedClass as string);
                setRowData(data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchPayment()
    }, [selectedClass]);



    return (
        <>
            <div className="border py-1 px-4 flex gap-5 items-center my-1">


                <div className="flex gap-4 items-center">
                    <label className="font-bold text-sm hidden lg:block">Select Class</label>
                    <ClassSelection selectedClass={(value) => setSelectedClass(value)} classes={classes} />
                </div>

            </div>
            <div className="py-4 mt-2 px-2">
                <DataTable searchKey='fullName' data={rowData} isLoading={isLoading} columns={columns} />
            </div>

        </>
    )
}

export default FeesPaymentGrid
