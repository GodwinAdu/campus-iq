"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-action";


export const columns: ColumnDef<IFeesFine>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "fullName",
        header: "Full Name",
    },
    {
        accessorKey: "staffId",
        header: "Staff Id",
    },
    {
        accessorKey: "paymentAmount",
        header: "Payment Amount",
    },
    {
        accessorKey: "salaryName",
        header: "Salary Name",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className={`border ${row.original.status === "paid" ? "bg-green-500":"bg-red-400"}`}>{row.original.status}</div>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
];
