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
import { Checkbox } from "@/components/ui/checkbox";


const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  isCurrent: z.boolean().optional(),
  createdBy: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
});

interface EditTermProps{
  initialData:ITerm ;
}

export function EditTerm({ initialData }:EditTermProps) {

  const router = useRouter();
  const path = usePathname();
  const params = useParams();

  const termId: string = params.termEditId as string;
  const schoolId = params.schoolid as string;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateTerm(termId, values, path);
      router.push(`/admin/${params.adminId}/system-config/manage-term`);
      form.reset();
      toast({
        title: "Update Successfully",
        description: "Update term  successfully...",
      });
    } catch (error) {
      console.log("error happened while updating term", error);
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
                <FormLabel>Enter Term Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Term or Semister" {...field} />
                </FormControl>
                <FormDescription>
                  It can be a term or a semister. eg.first term or semister 1.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="createdBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Created by</FormLabel>
                <FormControl>
                  <Input placeholder="Enter created By" {...field} />
                </FormControl>
                <FormDescription>
                  You can change to suit your needs...
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isCurrent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>isCurrent</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Updating ... " : "Update"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
