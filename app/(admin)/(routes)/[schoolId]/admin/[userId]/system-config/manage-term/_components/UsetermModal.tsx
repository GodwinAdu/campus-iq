"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import { createTerm } from "@/lib/actions/term.actions";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  isCurrent: z.boolean().optional(),
});

export function ModalTerm() {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      isCurrent: false
    },
  });

  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createTerm({
        name: values.name,
        isCurrent: values.isCurrent
      })
      router.refresh();
      form.reset();
      toast({
        title: "New term created",
        description: "New term was added successfully...",
      });
    } catch (error) {
      console.log("error happened while creating term", error)
      toast({
        title: "Something went wrong",
        description: "Please try again later...",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn(buttonVariants())}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Term/Semester</DialogTitle>
          <DialogDescription >
            Create new terms/semester for the newly academic year.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Term Name</FormLabel>
                    <FormControl>
                      <Input disabled={isSubmitting} placeholder="Enter Term or Semester" {...field} />
                    </FormControl>
                    <FormDescription>
                      It can be a term or a semester. eg.first term <br /> or semester 1.
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
                      <FormLabel>Present</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Creating..." : "Create"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
