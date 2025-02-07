"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import { BadgeAlert, CheckSquare } from "lucide-react";

export const columns: ColumnDef<ISubject>[] = [
  {
    accessorKey: "subjectName",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("subjectName")}</div>
    )
  },
  {
    accessorKey: "subjectCredit",
    header: "Credits",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("subjectCredit")}</div>
    )
  },
  {
    accessorKey: "subjectHour",
    header: " Hours",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("subjectHour")}</div>
    )
  },
  {
    accessorKey: "subjectAttribute",
    header: " Attribute",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("subjectAttribute")}</div>
    )
  },
  {
    accessorKey: "class.name", // Adjusted accessorKey to access nested property
    header: " Class",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.classId.name}</div>
    )
  },
  {
    accessorKey: "status",
    header: "Active",
    cell: ({ row }) => (
      <div>{row.getValue("status") ? <CheckSquare className="h-4 w-4 text-green-500" /> : <BadgeAlert className="h-4 w-4 text-red-500"  />}</div>
    )
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
