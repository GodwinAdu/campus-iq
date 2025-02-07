"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { updateTerm } from "@/lib/actions/term.actions";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { updateSession } from "@/lib/actions/session.actions";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  period: z.string().min(2, {
    message: "Period is required.",
  }),
  present: z.boolean().optional(),
});

export function EditSession({ initialData }: { initialData: ISession }) {

  const router = useRouter();
  const path = usePathname();
  const params = useParams();

  const sessionId = params.sessionEditId as string;
  const schoolId = params.schoolId as string;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateSession(sessionId, values, path);

      router.push(`/admin/${params.adminId}/system-config/manage-sessions`);

      form.reset();

      toast({
        title: "Update Successfully",
        description: "Update session  successfully...",
      });
    } catch (error) {
      console.log("error happened while updating session", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later...",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="mx-auto max-w-xl w-[96%]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Session Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter session Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="period"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Session period</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Session period" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="present"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Present</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Updating.." : "Update"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
