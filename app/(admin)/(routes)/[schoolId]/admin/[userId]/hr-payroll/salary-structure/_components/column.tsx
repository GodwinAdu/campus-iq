"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";

export const columns: ColumnDef<ISalaryStructure>[] = [
  {
    accessorKey: "salaryName",
    header: "Salary Grade",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("salaryName")}</div>
    )
  },
  {
    accessorKey: "basicSalary",
    header: "Amount",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("basicSalary")}</div>
    )
  },
  {
    accessorKey: "overtimeRate",
    header: "Overtime Rate(per hour)",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("overtimeRate")}</div>
    )
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
