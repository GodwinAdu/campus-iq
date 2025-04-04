"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<IStudent>[] = [
    {
        accessorKey: "username",
        header: "User Name",
        cell: ({ row }) => (
            <div className="flex gap-2 items-center">
                <Avatar>
                    <AvatarImage src={row.original.imgUrl} alt="User_image" />
                    <AvatarFallback>{row.original.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="ml-2 text-sm font-extrabold">{row.original.username}</span>
            </div>
        )
    },
    {
        accessorKey: "fullName",
        header: "Full Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "studentID",
        header: "Student ID",
    },
    {
        accessorKey: "studentStatus",
        header: "Status",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
];
