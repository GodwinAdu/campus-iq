"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import moment from "moment";


export const columns: ColumnDef<IAward>[] = [
  {
    accessorKey: "awardName",
    header: "Award Name",
  },
  {
    accessorKey:"awardToId",
    header: "Award To",
    cell: ({row}) => (
      <div className="">{row.original.awardToId.fullName}</div>
    )
  },
  {
    accessorKey:"giftItem",
    header: "Gift Item",
  },
  {
    accessorKey: "cashPrice",
    header: "Cash Price",
  },
  {
    accessorKey: "givenDate",
    header: "Given Date",
    cell: ({ row }) => (
      <div>{moment(row.original.givenDate).format("DD-MM-YYYY")}</div>
    )
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
