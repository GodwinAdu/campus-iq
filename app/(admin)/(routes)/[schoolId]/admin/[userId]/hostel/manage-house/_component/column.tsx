"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";


export const columns: ColumnDef<IHouse>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
