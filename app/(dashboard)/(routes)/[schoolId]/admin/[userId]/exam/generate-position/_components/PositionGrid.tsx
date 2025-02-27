"use client"

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react';
import { fetchAllMarks, generatePosition } from '@/lib/actions/mark-entries.actions';
import moment from 'moment';
import { getOrdinalSuffix } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import ClassSelection from '@/components/commons/ClassSelection';
import { DataTable } from '@/components/table/data-table';
import { columns } from './column';

const PositionGrid = ({ classes }: { classes: IClass[] }) => {
    const [selectedClass, setSelectedClass] = useState(classes[0]?._id);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingGenerate, setIsLoadingGenerate] = useState<boolean>(false)
    const [rowData, setRowData] = useState([]);

    const router = useRouter()

    useEffect(() => {
        let isMounted = true; // Prevents state update if component unmounts

        const fetchMarks = async () => {
            try {
                setIsLoading(true);
                const data = await fetchAllMarks(selectedClass as string);

                if (!isMounted) return; // Prevent state update after unmount

                let formattedData = data?.map((mark: IMark) => ({
                    ...mark,
                    student: mark.studentId?.fullName || "Unknown",
                    position: mark.position && mark.position > 0 ? mark.position : null, // Keep as number for sorting
                    createdBy: mark.createdBy?.fullName || "Unknown",
                    createdAt: moment(mark.createdAt).format("YYYY-MM-DD HH:mm"),
                }));

                // Sort by position (ascending), ensuring "Null" values are last
                formattedData.sort((a: IMark, b: IMark) => {
                    if (a.position === null) return 1; // Move nulls to the bottom
                    if (b.position === null) return -1;
                    return a.position - b.position; // Sort numerically
                });

                // Convert position to ordinal suffix *after* sorting
                formattedData = formattedData.map((mark: IMark) => ({
                    ...mark,
                    position: mark.position ? getOrdinalSuffix(mark.position) : "Null",
                }));

                setRowData(formattedData);
            } catch (error) {
                console.error("Error fetching marks:", error);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        fetchMarks();

        return () => {
            isMounted = false; // Cleanup function to avoid state updates
        };
    }, [selectedClass]);
    
    const onGenerateHandler = async (classId: string) => {
        try {
            setIsLoadingGenerate(true)
            await generatePosition(classId)
            router.refresh()
            toast({
                title: "Marks generated successfully",
                description: "The marks have been generated for all students in the selected class.",
            })

        } catch (error) {
            console.error("Error generating position:", error)
            toast({
                title: "Something went wrong",
                description: "Please try again later...",
                variant: "destructive",
            })

        } finally {
            setIsLoadingGenerate(false)
        }
    }

    console.log(rowData, "row data")

    return (
        <>
            <div className="border py-1 px-4 flex gap-5 items-center my-1">


                <div className="flex gap-4 items-center">
                    <label className="font-bold text-sm hidden lg:block">Select Class</label>
                    <ClassSelection selectedClass={(value) => setSelectedClass(value)} classes={classes} />
                </div>

                <Button disabled={isLoadingGenerate} className="flex" size="sm" onClick={() => onGenerateHandler(selectedClass as string)}>
                    {isLoadingGenerate ? (<Loader2 className="w-4 h-4 ml-2 animate-spin" />) : "generate position"}
                </Button>
            </div>
            <div className="py-4 mt-2 px-2">
                <DataTable searchKey="student" data={rowData} columns={columns} isLoading={isLoading} />
            </div>

        </>
    )
}

export default PositionGrid
