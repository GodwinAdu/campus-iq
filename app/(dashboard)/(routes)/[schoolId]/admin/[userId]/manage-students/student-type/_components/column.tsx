"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-acton";

export const columns: ColumnDef<IStudentCategory>[] = [
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
