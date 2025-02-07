"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import { BadgeAlert, CheckSquare } from "lucide-react";
import moment from "moment";

export const columns: ColumnDef<IGradeRange>[] = [
    {
        accessorKey: "gradeName",
        header: "Grade Name",
    },
    {
        accessorKey: "gradePoint",
        header: "Grade Point",
    },
    {
        accessorKey: "minPercentage",
        header: "Min Percentage",
        cell: ({ row }) => (
            <div>{row.original?.minPercentage}%</div>
        )
    },
    {
        accessorKey: "maxPercentage",
        header: "Max Percentage",
        cell: ({ row }) => (
            <div>{row.original?.maxPercentage}%</div>
        )
    },
    {
        accessorKey: "remark",
        header: "Remark",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
];
