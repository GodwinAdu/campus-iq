"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { CellAction } from "./cell-action";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import moment from "moment";




export const columns: ColumnDef<any>[] = [
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
    accessorKey: "bookId.name",
    header: "Book Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.bookId.title}</div>
    )
  },
  {
    accessorKey: "librarian.fullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Librarian
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="capitalize">{`${row.original.librarian.fullName} ${row.original.librarian.lastName}`}</div>,
  },
  {
    accessorKey: "studentId.fullName",
    header: "Students",
    cell: ({ row }) => (
      <div className="capitalize">{`${row.original.studentId.fullName} ${row.original.studentId.lastName}`}</div>
    )
  },
  {
    accessorKey: "issuedDate",
    header: "Issued Date", 
    cell: ({ row }) => (
      <div className="capitalize">{moment(row.original.issuedDate).format("MMMM Do YYYY")}</div>
    )
  },
  {
    accessorKey: "dueDate",
    header: "DeadLine Date",
    cell: ({ row }) => (
      <div className="capitalize">{moment(row.original.dueDate).format("MMMM Do YYYY")}</div>
    )
  },
  {
    accessorKey: "fine",
    header: "Fined Amount",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("fine")}</div>
    )
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
