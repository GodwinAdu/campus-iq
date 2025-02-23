"use client";

import { Button } from '@/components/ui/button';
import { fetchFeesReminder } from '@/lib/actions/fees-payment.actions';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import CellAction from './cell-action';
import ClassSelection from '@/components/commons/ClassSelection';

const FeesReminderGrid = ({ classes }: { classes: IClass[] }) => {
    const [selectedClass, setSelectedClass] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([]);

    // Selected students
    const [selectedStudents, setSelectedStudents] = useState([]);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState<{ field: string, width?: number, editable?: boolean }[]>([]);

    useEffect(() => {
        const fetchPayment = async () => {
            try {
                setIsLoading(true);
                const classId = classes[0]._id;
                const data = await fetchFeesReminder(classId);
                setRowData(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        const newColumnDefs = [
            { field: "fullName", checkboxSelection: true },
            { field: "studentId", minWidth: 450 },
            { field: "email" },
            {
                field: "actions",
                headerName: "Actions",
                cellRenderer: CellAction,
            },
        ];
        setColDefs(newColumnDefs);
        fetchPayment();
    }, []);

    const onSearchHandler = async () => {
        try {
            setIsLoading(true);
            const response = await fetchFeesReminder(selectedClass);
            console.log(response);
            setRowData(response);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const onSelectionChanged = (event: any) => {
        const selectedNodes = event.api.getSelectedNodes();
        const selectedData = selectedNodes.map((node: any) => node.data);
        setSelectedStudents(selectedData);
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
                {selectedStudents.length >= 2 && <CellAction selectedStudents={selectedStudents} />}
            </div>
            <div className="py-4 mt-2 px-2">
               
            </div>
        </>
    );
}

export default FeesReminderGrid;
