"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
export const columns: ColumnDef<IMark>[] = [
    {
        accessorKey: "student",
        header: "Student",
    },
    {
        accessorKey: "position",
        header: "Position",
    },
    {
        accessorKey: "totalMarks",
        header: "Total Marks",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    // {
    //     accessorKey: "createdBy",
    //     header: "Marked By",
    // },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
];
