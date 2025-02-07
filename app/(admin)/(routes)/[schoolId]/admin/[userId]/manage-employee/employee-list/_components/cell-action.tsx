"use client";

import { useState } from "react";
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
import { IClass } from "@/lib/models/class.models";
import useClientRole from "@/lib/client-role";
import { deleteStudent } from "@/lib/actions/student.actions";
import { toast } from "@/hooks/use-toast";
import { DeleteDialog } from "@/components/commons/DeleteDialog";

interface CellActionProps {
  data: IClass;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { role, isLoading } = useClientRole();
  const [loading, setLoading] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const router = useRouter();
  const params = useParams();

  const id = params.adminId as string;
  const schoolId = params.schoolId as string;

  const handleDeleteStudent = async (dataId: string) => {
    try {
      setLoading(true);
      await deleteStudent(dataId);
      toast({
        title: "Student deleted",
        description: " Student deleted successfully"
      })

    } catch (error) {
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
              {role?.editStudent && (
                <Link href={`/admin/${id}/manage-students/manage-student/${data?._id}`}>
                  <DropdownMenuItem >
                    <Edit className="mr-2 h-4 w-4" /> Update
                  </DropdownMenuItem>
                </Link>
              )}
              {role?.deleteStudent && (
                <DropdownMenuItem
                  onClick={(e) => { e.preventDefault(); setDeleteDialogOpen(true) }}
                  disabled={loading}
                >
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
          title="Are you sure you want to delete this Employee?"
          description="This action cannot be undone. Are you sure you want to proceed?"
          onCancel={() => setDeleteDialogOpen(false)}
          onContinue={handleDeleteStudent}
        />
      )}
    </>
  );
};
