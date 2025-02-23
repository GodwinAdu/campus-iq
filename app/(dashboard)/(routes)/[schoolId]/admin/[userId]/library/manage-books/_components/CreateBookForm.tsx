"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from '@/components/ui/card';
import { useParams, usePathname, useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { createBook, updateBook } from "@/lib/actions/book.actions"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    author: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    isbn: z.string().optional(),
    publicationYear: z.coerce.number(),
    copiesAvailable: z.coerce.number().optional()

})

const CreateBookForm = ({ type, initialData }: { type: "createBook" | "updateBook", initialData?: any }) => {
    const path = usePathname();
    const router = useRouter();
    const params = useParams();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            title: "",
            author: "",
            isbn: "",
            publicationYear: 0,
            copiesAvailable: 0,
        },
    });

    const { isSubmitting } = form.formState;
    const submitting = initialData ? "Updating ..." : "Creating...";
    const submit = initialData ? "Update Book" : "Create Book";
    const bookId = initialData?._id

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "createBook") {
                await createBook(values, path)
            }
            if (type === "updateBook") { 
                await updateBook(bookId,values,path)
            }
            router.push(`/admin/${params.adminId}/library/manage-books`)
            toast({
                title: `Book ${type === "createBook" ? "Created" : "Updated"} successfully`,
                description: `Book was  ${type === "createBook" ? "Created" : "Updated"} successfully...`,
            })

        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "Please try again later",
                variant: "destructive"
            })
        }
    }
    return (
        <Card>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Book Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Book Title" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="author"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Book Author Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Book Author" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isbn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Book Isbn Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Book Isbn number" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="publicationYear"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Publication Year</FormLabel>
                                        <FormControl>
                                            <Input type="number"  {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="copiesAvailable"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Copies Available</FormLabel>
                                        <FormControl>
                                            <Input type="number"  {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? submitting : submit}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default CreateBookForm
