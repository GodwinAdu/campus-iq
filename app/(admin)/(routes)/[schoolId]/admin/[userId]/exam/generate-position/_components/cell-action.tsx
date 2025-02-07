"use client";

import { useEffect, useState } from "react";
import { Edit, Edit2, Edit3, Eye, Loader2, MoreHorizontal, Trash } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import useClientRole from "@/lib/client-role";
import { DeleteDialog } from "@/components/commons/DeleteDialog";
import { deleteInventoryIssue } from "@/lib/actions/inventory-issue.actions";


interface CellActionProps {
    data: IClass;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);


    const router = useRouter();
    const pathname = usePathname()

    const params = useParams();

    const id = params.adminId as string;
    const schoolId = params.schoolId as string;
    const { role, isLoading } = useClientRole();

    const handleDeleteIssue = async (id: string) => {
        try {
            setLoading(true);
            await deleteInventoryIssue(id)
            toast({
                title: "Deleted Successfully",
                description: "Please Issue was deleted successfully...",

            });
            router.refresh();
        } catch (error: any) {
            toast({
                title: "Something Went Wrong",
                description: `${error.message}`,
                variant: "destructive",
            });
        } finally {
            setOpen(false);
            setLoading(false);
        }
    };



    return (
        <>
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
                        <div className="flex justify-center items-center">
                            <Loader2 className="animate spin w-4 h-4 items-center text-center" />
                        </div>
                    ) : (
                        <>
                            {role?.editClass && (
                                <Link href={`/admin/${id}/inventory/issue/${data?._id}`}>
                                    <DropdownMenuItem>
                                        <Edit3 className="mr-2 h-4 w-4" /> update
                                    </DropdownMenuItem>
                                </Link>
                            )}
                            {role?.deleteClass && (
                                <DropdownMenuItem onClick={(e) => { e.preventDefault(); setDeleteDialogOpen(true) }}>
                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                            )}
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
            {isDeleteDialogOpen && (
                <DeleteDialog
                    id={data?._id}
                    isDeleteDialogOpen={isDeleteDialogOpen}
                    title="Are you sure you want to delete this Issue?"
                    description="This action cannot be undone. Are you sure you want to proceed?"
                    onCancel={() => setDeleteDialogOpen(false)}
                    onContinue={handleDeleteIssue}
                />
            )}
        </>
    );
};
