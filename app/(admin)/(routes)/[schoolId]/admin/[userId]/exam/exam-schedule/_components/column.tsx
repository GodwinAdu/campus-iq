"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import { BadgeAlert, CheckSquare } from "lucide-react";
import moment from "moment";

export const columns: ColumnDef<IExamSchedule>[] = [

    {
        accessorKey: "examId.name",
        header: "Exams Name",
        cell: ({ row }) => (
            <div>{row.original.examId.name}</div>
        )
    },
    {
        accessorKey: "classId.name",
        header: "Class Name",
        cell: ({ row }) => (
            <div>{row.original.classId.name}</div>
        )
    },
    {
        accessorKey: "createdBy.fullName",
        header: "Created by",
        cell: ({ row }) => (
            <div>{row.original.createdBy.fullName}</div>
        )
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
];
