"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Send, SendHorizonal } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { EmojiPicker } from "../emoji-picker";
import { createGroupMessages } from "@/lib/actions/group-message.actions";
import { toast } from "@/hooks/use-toast";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatInput = ({
  apiUrl,
  query,
  name,
  type,
}: ChatInputProps) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const params = useParams();

  const serverId = params?.serverId as string;
  const channelId = params?.channelId as string;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    }
  });

  const isContent = form.getValues("content");

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (type === "channel") {
        await createGroupMessages({ values, serverId, channelId })
      }
      if (type === "conversation") {
        //  await createGroupMessages(values, serverId, channelId)
      }

    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Failed to send message",
        variant: "destructive"
      })
    } finally {
      form.reset();
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => onOpen("messageFile", { apiUrl, query })}
                    className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>
                  <Input
                    disabled={isLoading}
                    className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    placeholder={`Message ${type === "conversation" ? name : "#" + name}`}
                    {...field}
                  />
                  <div className="absolute top-6 right-5">
                    <div className="flex gap-1 items-center">
                      <EmojiPicker
                        onChange={(emoji: string) => field.onChange(`${field.value} ${emoji}`)}
                      />
                      {isContent && (
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-all duration-200 ease-in-out disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >
                          <SendHorizonal className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}