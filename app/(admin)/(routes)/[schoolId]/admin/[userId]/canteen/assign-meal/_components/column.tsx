"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-action";



export const columns: ColumnDef<StudentCanteen>[] = [
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
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "mealPlan",
        header: "Meal Plan",
        cell: ({ row }) => (
            <div
                className={`p-1 text-center rounded-lg text-sm font-medium text-white 
                    ${row.original.canteen.planId === "null"
                        ? "bg-gray-500" // Styling for "Not Assigned"
                        : "bg-green-500" // Styling for "Assigned"
                    }`}
            >
                {row.original.canteen.planId === "null" ? "Not Assigned" : "Assigned"}
            </div>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
];
