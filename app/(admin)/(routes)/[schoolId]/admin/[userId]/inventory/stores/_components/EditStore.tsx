"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button, buttonVariants } from "@/components/ui/button";

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
import { CardContent, Card } from '@/components/ui/card';
import { updateStore } from "@/lib/actions/inventory-store.actions";


const formSchema = z.object({
    name: z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
    address: z.string(),
    contactNumber: z.string(),
});

export function EditStore({ initialData }: { initialData: IInventoryStore }) {

    const router = useRouter();
    const path = usePathname();
    const params = useParams();

    const storeId = params.storeId as string;


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const { isSubmitting } = form.formState;

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await updateStore(storeId, values, path);
  
            toast({
                title: "Update Successfully",
                description: "Update Category  successfully...",
            });
            form.reset();
            router.push(`/admin/${params.adminId}/inventory/stores`);
        } catch (error: any) {
            console.log("error happened while updating category", error);
      
            toast({
                title: "Something went wrong",
                description: `${error.message}`,
                variant: "destructive",
            });
        }
    }

    return (
        <div className="mx-auto max-w-xl w-[96%]">
            <Card>
                <CardContent>


                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enter Category Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Category " {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enter Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter created By" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="contactNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enter Store Contact</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter created By" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button disabled={isSubmitting} type="submit">
                                {isSubmitting ? "Updating..." : "Update"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
