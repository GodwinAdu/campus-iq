"use client"

import React, { useEffect, useState } from 'react'
import Timetable from './Timetable'
import ClassSelection from '@/components/commons/ClassSelection'
import { fetchTimetableByClassId } from '@/lib/actions/timetable.actions'
import { AlertCircle } from 'lucide-react'

const TimetableGrid = ({ classes }: { classes: IClass[] }) => {
    const [selectedClass, setSelectedClass] = useState(classes[0]?._id);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [rowData, setRowData] = useState<ITimetable | null>(null);

    useEffect(() => {
        const fetchPayment = async () => {
            try {
                setIsLoading(true)
                const data = await fetchTimetableByClassId(selectedClass as string);
                setRowData(data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchPayment()
    }, [selectedClass]);
    console.log(rowData, "timetable")
    return (
        <>
            <div className="border py-1 px-4 flex gap-5 items-center my-1">

                <div className="flex gap-4 items-center">
                    <label className="font-bold text-sm hidden lg:block">Select Class</label>
                    <ClassSelection selectedClass={(value) => setSelectedClass(value)} classes={classes} />
                </div>

            </div>
            <div className="py-4 mt-2 px-2">
                {isLoading ? (
                    <div className="flex items-center justify-center w-full h-full bg-gray-500 opacity-50">
                        <div className="w-8 h-8 text-white text-center">Loading...</div>
                    </div>
                ) : (
                    !rowData ? (
                        <div className="flex flex-col items-center py-10 mt-16">
                            <AlertCircle className="w-12 h-12 text-gray-500 mb-4" />
                            <p className="text-lg text-gray-600 mb-2">No Time found found.</p>
                            <p className="text-md text-gray-500">Please add new timetable to manage them here.</p>
                        </div>
                    ) : (
                        <Timetable data={rowData} />
                    )
                )}

            </div>

        </>
    )
}

export default TimetableGrid