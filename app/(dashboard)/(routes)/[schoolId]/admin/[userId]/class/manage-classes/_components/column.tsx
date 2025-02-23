"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";

export const columns: ColumnDef<IClass>[] = [
  {
    accessorKey: "name",
    header: "Class Names",
  },
  {
    accessorKey: "code",
    header: "Class Code",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
