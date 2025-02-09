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

const PositionGrid = ({ classes }: { classes: IClass[] }) => {
    const [selectedClass, setSelectedClass] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingGenerate, setIsLoadingGenerate] = useState<boolean>(false)
    const [rowData, setRowData] = useState([]);

    const router = useRouter()

    useEffect(() => {
        const fetchPayment = async () => {
            try {
                setIsLoading(true)
                const classId = classes[0]._id;
                const data = await fetchAllMarks(classId);
                const formattedData = data.map((mark: IMark) => ({
                    ...mark,
                    student: mark.studentId.fullName,
                    position:(mark.position <= 0) ? "Null" : getOrdinalSuffix(mark.position),
                    createdBy: mark.createdBy.fullName,
                    createdAt: moment(mark.createdAt).format("YYYY-MM-DD HH:mm"),
                }));
                setRowData(formattedData)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        const newColumnDefs = [
            { field: "student" },
            { field: "totalMarks" },
            { field: "position" },
            { field: "createdBy" },
            { field: "createdAt" },
        ];

        fetchPayment()
    }, []);

    const onGenerateHandler = async (classId:string) =>{
        try {
            setIsLoadingGenerate(true)
            await generatePosition(classId)
            router.refresh()
            toast({
                title: "Marks generated successfully",
                description: "The marks have been generated for all students in the selected class.",
            })
            
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "Please try again later...",
                variant: "destructive",
            })
            
        } finally{
            setIsLoadingGenerate(false)
        }
    }
    const onSearchHandler = async () => {
        try {
            setIsLoading(true)
            const data = await fetchAllMarks(selectedClass);
            const formattedData = data.map((mark: IMark) => ({
                ...mark,
                student: mark.studentId.fullName,
                createdBy: mark.createdBy.fullName,
                createdAt: moment(mark.createdAt).format("YYYY-MM-DD HH:mm"),
            }));
            setRowData(formattedData);

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    };


    return (
        <>
            <div className="border py-1 px-4 flex gap-5 items-center my-1">


                <div className="flex gap-4 items-center">
                    <label className="font-bold text-sm hidden lg:block">Select Class</label>
                    <ClassSelection selectedClass={(value) => setSelectedClass(value)} classes={classes} />
                </div>

                <Button disabled={isLoading} className="flex" size="sm" onClick={onSearchHandler}>
                    {isLoading ? (<Loader2 className="w-4 h-4 ml-2 animate-spin" />) : "Search"}
                </Button>

                <Button disabled={isLoadingGenerate} className="flex" size="sm" onClick={() => onGenerateHandler(selectedClass)}>
                    {isLoadingGenerate ? (<Loader2 className="w-4 h-4 ml-2 animate-spin" /> ) : "generate position"}
                </Button>
            </div>
            <div className="py-4 mt-2 px-2">

               
            </div>

        </>
    )
}

export default PositionGrid
