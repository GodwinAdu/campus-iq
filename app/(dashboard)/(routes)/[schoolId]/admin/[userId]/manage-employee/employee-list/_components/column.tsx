"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<IEmployee>[] = [
    {
        accessorKey: "username",
        header: "User Name",
        cell: ({ row }) => (
            <div className="flex gap-2 items-center">
                <Avatar>
                    <AvatarImage src={row.original.personalInfo.imgUrl} alt="User_image" />
                    <AvatarFallback>{row.original.personalInfo.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="ml-2 text-sm font-extrabold">{row.original.personalInfo.username}</span>
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
        accessorKey: "staffID",
        header: "Staff ID",
        cell: ({ row }) => (
            <div className="capitalize">{row.original.employment.employeeID}</div>
        ),
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
];
