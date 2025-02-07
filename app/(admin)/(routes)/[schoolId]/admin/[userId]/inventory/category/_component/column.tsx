"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import { BadgeAlert, CheckSquare } from "lucide-react";
import InventoryCategory from '../../../../../../../../lib/models/inventory-category.models';

export const columns: ColumnDef<IInventoryCategory>[] = [
    {
        accessorKey: "name",
        header: "Category Name",
    },
    {
        accessorKey: "createdBy",
        header: "Created By",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
];
