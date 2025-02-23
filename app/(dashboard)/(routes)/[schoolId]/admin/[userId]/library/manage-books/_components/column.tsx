"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { CellAction } from "./cell-action";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";




export const columns: ColumnDef<IBook>[] = [
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
    accessorKey: "title",
    header: "Book Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    )
  },
  {
    accessorKey: "author",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Book Author
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("author")}</div>,
  },
  {
    accessorKey: "isbn",
    header: "Isbn",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("isbn")}</div>
    )
  },
  {
    accessorKey: "publicationYear",
    header: "Publish year",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("publicationYear")}</div>
    )
  },
  {
    accessorKey: "copiesAvailable",
    header: "No Copies",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("copiesAvailable")}</div>
    )
  },
  {
    accessorKey: "copiesIssued",
    header: "No Issued",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("copiesIssued")}</div>
    )
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
