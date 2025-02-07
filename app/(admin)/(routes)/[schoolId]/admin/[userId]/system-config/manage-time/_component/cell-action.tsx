"use client";

import { useEffect, useState } from "react";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
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
import { deleteTime } from "@/lib/actions/time.actions";
import useClientRole from "@/lib/client-role";

interface CellActionProps {
  data: ITime;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { role, isLoading } = useClientRole();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const router = useRouter();

  const params = useParams();

  const id = params.adminId as string;


  const handleDeleteTime = async (id: string) => {
    try {
      setLoading(true);

      await deleteTime({ id })
      toast({
        title: "Deleted Successfully",
        description: "Please Time was deleted successfully...",

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
          {role?.editTime && (
            <Link href={`/admin/${id}/system-config/manage-time/${data?._id}`}>
              <DropdownMenuItem >
                <Edit className="mr-2 h-4 w-4" /> Update
              </DropdownMenuItem>
            </Link>
          )}
          {role?.deleteTime && (
            <DropdownMenuItem onClick={() => handleDeleteTime(data?._id)}>
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
