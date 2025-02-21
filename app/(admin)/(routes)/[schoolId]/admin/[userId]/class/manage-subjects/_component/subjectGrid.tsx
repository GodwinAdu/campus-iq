"use client"

import React, { useEffect, useState } from 'react'
import ClassSelection from '@/components/commons/ClassSelection';
import { DataTable } from '@/components/table/data-table';
import { columns } from './column';
import { fetchSubjectByClassId } from '@/lib/actions/subject.actions';

interface SubjectGridProps {
    classes: IClass[];

}

const SubjectGrid = ({ classes }: SubjectGridProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedClass, setSelectedClass] = useState(classes[0]?._id);
    const [subjectList, setSubjectList] = useState([])

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                setIsLoading(true)
                const data = await fetchSubjectByClassId(selectedClass as string)
                console.log(data, "useEffect fetchStudentsList")
                setSubjectList(data)
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
                <DataTable isLoading={isLoading} searchKey='subjectName' data={subjectList} columns={columns} />
            </div>
        </>
    )
}

export default SubjectGrid
