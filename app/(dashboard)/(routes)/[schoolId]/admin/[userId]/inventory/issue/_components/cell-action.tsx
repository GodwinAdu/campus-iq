"use client"

import React, { useState } from "react"
import { Loader2, MoreHorizontal, View } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link"
import { toast } from "@/hooks/use-toast"
import { DeleteDialog } from "@/components/commons/DeleteDialog"
import useClientRole from "@/lib/helpers/client-role"




interface CellActionProps {
    data: IDistribution
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const router = useRouter()
    const params = useParams()
    const [loading, setLoading] = useState(false)
    const { isLoading, role } = useClientRole()

    const {schoolId,userId} = params;

    const handleDelete = async (id: string) => {
        try {
            setLoading(true)

            router.refresh()
            toast({
                title: "Deleted successfully",
                description: "You've deleted the product successfully",
                // variant: "success",
            })
        } catch (error) {
            console.error("Delete error:", error)
            toast({
                title: "Something Went Wrong",
                description: "Please try again later",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {isLoading ? (
                    <DropdownMenuItem className="text-center items-center flex justify-center">
                        <Loader2 className="animate-spin h-4 w-4" />
                    </DropdownMenuItem>
                ) : (
                    <>
                        {role?.permissions.editInventory && (
                            <DropdownMenuItem asChild>
                                <Link href={`/${schoolId}/admin/${userId}/exam/distribution/${data._id}`}>
                                    <View className="mr-2 h-4 w-4" /> Details
                                </Link>
                            </DropdownMenuItem>
                        )}
                        {role?.permissions.deleteInventory && (
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="bg-red-500 hover:bg-red-800">
                                <DeleteDialog
                                    id={data?._id as string}
                                    onContinue={handleDelete}
                                    isLoading={loading}
                                />
                            </DropdownMenuItem>
                        )}
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

