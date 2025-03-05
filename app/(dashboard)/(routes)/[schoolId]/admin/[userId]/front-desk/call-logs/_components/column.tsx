"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
// sender: string;
//     receiver: string;
//     postalType: string;
//     referenceNo: string;
//     address: string;
//     postalDate: Date;
//     postalDetails: string;
//     attachmentFile?: string | undefined;
//     confidential: boolean
export const columns: ColumnDef<IClass>[] = [
    {
        accessorKey: "callType",
        header: "Call Type",
    },
    {
        accessorKey: "callerName",
        header: "Caller Name",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
];
