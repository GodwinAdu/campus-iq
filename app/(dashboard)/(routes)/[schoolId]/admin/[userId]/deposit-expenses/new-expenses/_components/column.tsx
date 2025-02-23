"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";

export const columns: ColumnDef<IAccount>[] = [
    {
        accessorKey: "expensesName",
        header: "Expense Name",
    },
    {
        accessorKey: "expensesDate",
        header: "Date",
    },
    {
        accessorKey: "expensesAmount",
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
