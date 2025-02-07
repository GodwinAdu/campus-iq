"use client";

import { useEffect, useState } from "react";
import { Edit, Eye, Loader2, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { IAdmin } from "@/lib/models/employee.models";
import useClientRole from "@/lib/client-role";
import { DeleteDialog } from "@/components/commons/DeleteDialog";
import { deleteBook } from "@/lib/actions/book.actions";
import { deleteBookIssued } from "@/lib/actions/book-transaction.actions";

interface CellActionProps {
  data: any;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { role, isLoading } = useClientRole();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const router = useRouter();
  const params = useParams();

  const id = params.adminId as string;
  const schoolId = params.schoolId as string;



  const handleDeleteIssued = async (dataId: string) => {
    try {
      setLoading(true);
      await deleteBookIssued(dataId)
      toast({
        title: "Deleted Successfully",
        description: "Please Book was deleted successfully...",

      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        description: "Please try again later",
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
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              {role?.editAdmin && (
                <Link href={`/admin/${id}/library/manage-books/${data?._id}`}>
                  <DropdownMenuItem >
                    <Edit className="mr-2 h-4 w-4" /> collect
                  </DropdownMenuItem>
                </Link>
              )}
              {role?.deleteAdmin && (
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
          id={data?._id as string}
          isDeleteDialogOpen={isDeleteDialogOpen}
          title="Are you sure you want to delete?"
          description="This action cannot be undone. Are you sure you want to proceed?"
          onCancel={() => setDeleteDialogOpen(false)}
          onContinue={handleDeleteIssued}
        />
      )}
    </>
  );
};
