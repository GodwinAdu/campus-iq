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
import { updateDistribution } from "@/lib/actions/distribution.actions";


interface EditHallProps {
    _id: string;
    markDistribution: string;
    createdBy: string;
}

const formSchema = z.object({
    markDistribution: z.string().min(2, {
        message: "markDistribution must be at least 2 characters.",
    }),
    createdBy: z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
});

export function EditDistribution({ initialData }: { initialData: EditHallProps }) {

    const router = useRouter();
    const path = usePathname();
    const params = useParams();

    const {schoolId,userId} = params;

    const distributionId = initialData?._id


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const { isSubmitting } = form.formState;

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await updateDistribution(distributionId, values, path);
            router.push(`/${schoolId}/admin/${userId}/exam/distribution`);
            form.reset();
            toast({
                title: "Update Successfully",
                description: "Update hall  successfully...",
            });
        } catch (error) {
            console.log("error happened while updating distribution", error);
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
                        name="markDistribution"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Distribution</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter " {...field} />
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
                                    <Input placeholder="Enter created By" {...field} />
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
