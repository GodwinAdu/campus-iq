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
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { updateStudentCategory } from "@/lib/actions/student-category.actions";


interface Props {
    _id: string;
    name: string;
    createdby: string;
}

const formSchema = z.object({
    name: z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
    createdBy: z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
});

export function EditStudentCategory({ initialData }: { initialData: Props }) {

    const router = useRouter();
    const path = usePathname();
    const params = useParams();

    const studentCategoryId = initialData?._id as string;
    const {schoolId,userId} = params;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const { isSubmitting } = form.formState;

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await updateStudentCategory(studentCategoryId, values, path);

            router.push(`/${schoolId}/admin/${userId}/manage-students/student-type`);

            form.reset();

            toast({
                title: "Update Successfully",
                description: "Update house  successfully...",
            });
        } catch (error) {

            console.log("error happened while updating day", error);

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
                                <FormLabel>Enter Category Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Student Category" {...field} />
                                </FormControl>
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
                                    <Input disabled placeholder="Enter created By" {...field} />
                                </FormControl>
                                <FormDescription>
                                    You can change to suit your needs...
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isSubmitting} type="submit">
                        {isSubmitting ? "Updating..." : "Update"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
