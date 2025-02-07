"use client"
import ClassSelection from '@/components/attendance/ClassSelection'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { CellAction } from './cell-action'
import { fetchStudentsList } from '@/lib/actions/student.actions'
import { fetchAllMarks, generatePosition } from '@/lib/actions/mark-entries.actions';
import moment from 'moment';
import { getOrdinalSuffix } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const PositionGrid = ({ classes }: { classes: IClass[] }) => {
    const [selectedClass, setSelectedClass] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingGenerate, setIsLoadingGenerate] = useState<boolean>(false)

    const router = useRouter()

    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([]);
    console.log(rowData,"row data")

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState<{ field: string, width?: number, editable?: boolean }[]>([])
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
        setColDefs(newColumnDefs);
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

export default PositionGrid
