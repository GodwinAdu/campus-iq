"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";

export const columns: ColumnDef<IAccount>[] = [
    {
        accessorKey: "depositName",
        header: "Deposit Name",
    },
    {
        accessorKey: "depositDate",
        header: "Date",
    },
    {
        accessorKey: "depositAmount",
        header: "Amount",
    },
    {
        accessorKey: "payVia",
        header: "Payment Method",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
];
