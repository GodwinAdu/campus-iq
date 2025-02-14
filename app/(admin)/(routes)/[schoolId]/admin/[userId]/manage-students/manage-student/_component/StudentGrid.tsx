"use client"

import React, { useEffect, useState } from 'react'
import { fetchStudentsList } from '@/lib/actions/student.actions'
import ClassSelection from '@/components/commons/ClassSelection';
import { DataTable } from '@/components/table/data-table';
import { columns } from './column';

interface StudentGridProps {
    classes: IClass[];

}

const StudentGrid = ({ classes }: StudentGridProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedClass, setSelectedClass] = useState(classes[0]?._id);
    const [studentList, setStudentList] = useState([])

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                setIsLoading(true)
                const data = await fetchStudentsList(selectedClass as string)
                console.log(data, "useEffect fetchStudentsList")
                setStudentList(data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchStudent()
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
                <DataTable isLoading={isLoading} searchKey='fullName' data={studentList} columns={columns} />
            </div>
        </>
    )
}

export default StudentGrid
