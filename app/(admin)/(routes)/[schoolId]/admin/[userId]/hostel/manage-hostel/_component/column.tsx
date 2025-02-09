"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";


export const columns: ColumnDef<IHouse>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "roomIds",
    header: "No of Rooms",
    cell:({row})=>(
      <div>{row.original.roomIds?.length}</div>
    )
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) => (
      <div className="">{row.original.createdBy.fullName}</div>
    )
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
