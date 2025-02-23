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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { CardContent, Card } from '@/components/ui/card';
import { updateCategory } from "@/lib/actions/inventory-category.actions";


interface StoreProps {
    _id: string;
    name: string;
    address: string;
    contactNumber: string;
}

const formSchema = z.object({
    name: z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
    storeId: z.string(),
});

export function EditCategory({
    initialData,
    stores,
}: {
    initialData: IInventoryCategory,
    stores: IInventoryStore[],
}) {

    const router = useRouter();
    const path = usePathname();
    const params = useParams();

    const {schoolId,userId} = params

    const categoryId = initialData?._id;


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const { isSubmitting } = form.formState;

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await updateCategory(categoryId, values, path);
            toast({
                title: "Update Successfully",
                description: "Update Category  successfully...",
            });
            form.reset();
            router.push(`/${schoolId}/admin/${userId}/inventory/category`);
        } catch (error) {
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
                                name="storeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Store</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a Store" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {stores?.map((store) => (
                                                    <SelectItem key={store._id} value={store._id}>{store.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
