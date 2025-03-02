"use client"

import React, { useEffect, useState } from 'react'
import { toast } from '@/hooks/use-toast';
import { DataTable } from '@/components/table/data-table';
import ClassSelection from '@/components/commons/ClassSelection';
import { fetchStudentsForCanteenList } from '@/lib/actions/student.actions';
import { columns } from './column';


const WellbeingGrid = ({ classes }: { classes: IClass[] }) => {
    const [selectedClass, setSelectedClass] = useState(classes[0]?._id)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [studentList, setStudentList] = useState<StudentCanteen[] | []>([]);
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                setIsLoading(true)
                const data = await fetchStudentsForCanteenList(selectedClass as string)
                setStudentList(data)

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
        fetchStudent()
    }, [selectedClass]);

    return (
        <>
            <div className="border py-1 px-4 flex gap-5 items-center my-1">

                <div className="flex gap-4 items-center">
                    <label className="font-bold text-sm hidden lg:block">Select class</label>
                    <ClassSelection selectedClass={(value: string) => setSelectedClass(value)} classes={classes} />
                </div>
            </div>
            <div className="py-4 mt-2 px-2">

                <DataTable searchKey='fullName' data={studentList} columns={columns} isLoading={isLoading} />
            </div>


        </>
    )
}

export default WellbeingGrid
