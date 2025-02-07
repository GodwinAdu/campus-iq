"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";


export const columns: ColumnDef<ILeaveCategory>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({row}) => (
      <div className="">{row.original.createdBy.fullName}</div>
    )
  }, 
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
