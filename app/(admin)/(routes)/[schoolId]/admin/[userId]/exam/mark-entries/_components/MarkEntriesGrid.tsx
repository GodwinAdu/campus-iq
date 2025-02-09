"use client"

import React, { useEffect, useState } from 'react';
import { fetchStudentsList } from '@/lib/actions/student.actions'
import ClassSelection from '@/components/commons/ClassSelection';
import { columns } from './column';
import { DataTable } from '@/components/table/data-table';

const MarkEntriesGrid = ({ classes }: { classes: IClass[] }) => {
    const [selectedClass, setSelectedClass] = useState(classes[0]._id);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data,setData] = useState([])

    useEffect(() => {
        const fetchPayment = async () => {
            try {
                setIsLoading(true)
                const data = await fetchStudentsList(selectedClass as string);
                const formattedData = data.map((student: IStudent) => ({
                    ...student,
                    examResult: student.examResult ? "Entered" : "Not Entered",
                }));
                setData(formattedData)
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
                <DataTable searchKey="fullName" data={data} columns={columns} isLoading={isLoading} />
            </div>

        </>
    )
}

export default MarkEntriesGrid
