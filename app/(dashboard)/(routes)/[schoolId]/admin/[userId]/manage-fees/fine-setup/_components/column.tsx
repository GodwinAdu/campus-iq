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
        accessorKey: "feesType",
        header: "Fees Type",
    },
    {
        accessorKey: "classId.name",
        header: "Class Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.original.classId.name}</div>
        ),
    },
    {
        accessorKey: "fineType",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Fine Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("fineType")}</div>,
    },
    {
        accessorKey: "fineAmount",
        header: "Fine Value",
        cell: ({ row }) => (
            <div className="capitalize">{(row.getValue("fineType") === "Fixed") ? `Gh${row.getValue("fineAmount")}.00` : `${row.getValue("fineAmount")}%`}</div>
        ),
    },
    {
        accessorKey: "frequency",
        header: "Limit Frequency",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
];
