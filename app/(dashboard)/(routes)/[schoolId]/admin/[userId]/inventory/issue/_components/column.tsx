"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import { BadgeAlert, CheckSquare } from "lucide-react";
import moment from "moment";

export const columns: ColumnDef<IInventoryIssue>[] = [
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "saleToId",
        header: "Issue To",
        cell: ({ row }) => (
            <div>{row.original?.saleToId?.fullName}</div>
        )
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "issueDate",
        header: "Issue Date",
        cell: ({ row }) => (
            <div>{moment(row.getValue("issueDate")).format("Do MMMM YYYY")}</div>
        )
    },
    {
        accessorKey: "returnDate",
        header: "return Date",
        cell: ({ row }) => (
            <div>{moment(row.getValue("returnDate")).format("Do MMMM YYYY")}</div>
        )
    },
    {
        accessorKey: "issuedBy",
        header: "Issued By",
        cell: ({ row }) => (
            <div>{row.original?.issuedBy?.fullName}</div>
        )
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
];
