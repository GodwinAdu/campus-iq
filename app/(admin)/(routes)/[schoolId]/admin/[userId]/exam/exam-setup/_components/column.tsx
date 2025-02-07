"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<IExamSetup>[] = [
    {
        accessorKey: "name",
        header: "Exams Name",
    },
    {
        accessorKey: "sessionId",
        header: "Session",
        cell: ({ row }) => (
            <div>{row.original?.sessionId?.period}</div>
        ),
    },
    {
        accessorKey: "termId",
        header: "Term",
        cell: ({ row }) => (
            <div>{row.original?.termId?.name}</div>
        ),
    },
    {
        accessorKey: "markDistributions",
        header: "Mark Distribution",
        cell: ({ row }) => (
            <ul>
                {row.original?.markDistributions?.map((data: any, index: number) => (
                    <li key={index}>{data}</li>
                ))}
            </ul>
        ),
    },
    {
        accessorKey: "examType",
        header: "Exam Type",
    },
    {
        accessorKey: "publish",
        header: "Publish",
        cell: ({ row }) => (
            <Checkbox disabled aria-readonly checked={row.original?.publish} />
        ),
    },
    {
        accessorKey: "publishResult",
        header: "Publish Result",
        cell: ({ row }) => (
            <Checkbox disabled aria-readonly checked={row.original?.publishResult} />
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
