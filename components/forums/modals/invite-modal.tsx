"use client";


import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useModal } from "@/hooks/use-modal-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOrigin } from "@/hooks/use-origin";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { resetInvitedCode } from "@/lib/actions/invite.actions";

export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();
  const router = useRouter();

  const isModalOpen = isOpen && type === "invite";
  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/group_discussion/invite/${server?.invitedCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  // Function to handle modal close and refresh
  const handleCloseModal = () => {
    onClose();
    router.refresh(); // Trigger the page refresh
  };


  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await resetInvitedCode(server?._id)
      console.log(response,"response from server");

      onOpen("invite", { server: response});
      toast({
        title: "Invite link reset",
        description: "Invite link reset successfully"
      })
    } catch (error) {
      console.log("error happened while resetting invite link", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label
            className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
          >
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={isLoading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button disabled={isLoading} onClick={onCopy} size="icon">
              {copied
                ? <Check className="w-4 h-4" />
                : <Copy className="w-4 h-4" />
              }
            </Button>
          </div>
          <Button
            onClick={onNew}
            disabled={isLoading}
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4"
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}