"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

import { Checkbox } from "@/components/ui/checkbox";
import { updateClass } from "@/lib/actions/class.actions";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "name must be at least 2 characters.",
  }),
  status: z.boolean().optional(),
});

export function EditClass({ initialData }: { initialData: IClass }) {

  const router = useRouter();
  const path = usePathname();
  const params = useParams();

  const {schoolId,userId} = params;
  const id = initialData._id as string;


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateClass(id, values, path);

      router.push(`/${schoolId}/admin/${userId}/class/manage-classes`);

      form.reset();

      toast({
        title: "Update Successfully",
        description: "Update classroom  successfully...",
      });
    } catch (error) {
      console.log("error happened while updating classroom", error);
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
                <FormLabel>Class Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Class Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Status</FormLabel>
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
