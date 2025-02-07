"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, BadgeAlert, CheckSquare } from "lucide-react";
import { AdminUserColumn } from "@/lib/types";


export const subjectColumns: ColumnDef<AdminUserColumn>[] = [
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
    accessorKey: "subjectName",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("subjectName")}</div>
    )
  },
  {
    accessorKey: "subjectCredit",
    header: "Subject Credit",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("subjectCredit")}</div>
    )
  },
  {
    accessorKey: "subjectHour",
    header: "Subject Hour",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("subjectHour")}</div>
    )
  },
  {
    accessorKey: "subjectAttribute",
    header: "Subject Attribute",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("subjectAttribute")}</div>
    )
  },
  {
    accessorKey: "status",
    header: "Active",
    cell: ({ row }) => (
      <div>{row.getValue("status") ? <CheckSquare className="h-4 w-4 text-green-500" /> : <BadgeAlert className="h-4 w-4 text-red-500"  />}</div>
    )
  },
];
