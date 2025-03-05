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
        accessorKey: "sender",
        header: "Sender",
    },
    {
        accessorKey: "receiver",
        header: "Receiver",
    },
    {
        accessorKey: "postalDate",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
];
