"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import { BadgeAlert, CheckSquare } from "lucide-react";

export const columns: ColumnDef<ITerm>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isCurrent",
    header: "Present",
    cell: ({ row }) => (
      <div>{row.getValue("isCurrent") ? <CheckSquare className="h-4 w-4 text-green-500" /> : <BadgeAlert className="h-4 w-4 text-red-500"  />}</div>
    )
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) => (
      <div>{row.original.createdBy.fullName}</div>
    )
  },
  
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
