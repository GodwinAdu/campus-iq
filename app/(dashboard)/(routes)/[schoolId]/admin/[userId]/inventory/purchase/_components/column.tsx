"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import { BadgeAlert, CheckSquare } from "lucide-react";
import moment from "moment";

export const columns: ColumnDef<IInventoryPurchase>[] = [
    {
        accessorKey: "storeId",
        header: "Store Name",
        cell: ({ row }) => (
            <div>{row.original?.storeId?.name}</div>
        )
    },
    {
        accessorKey: "supplierId",
        header: "Supplier Name",
        cell: ({ row }) => (
            <div>{row.original?.supplierId?.name}</div>
        )
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "purchaseDate",
        header: "Purchase Date",
        cell: ({ row }) => (
            <div>{moment(row.getValue("purchaseDate")).format("Do MMMM YYYY")}</div>
        )
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
];
