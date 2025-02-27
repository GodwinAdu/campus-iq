"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast"
import { createGradeRange, updateGradeRange } from "@/lib/actions/grade-range.actions"
const formSchema = z.object({
    gradeName: z.string().min(1, {
        message: "Username must be at least 1 characters.",
    }),
    gradePoint: z.coerce.number(),
    minPercentage: z.coerce.number(),
    maxPercentage: z.coerce.number(),
    remark: z.string().optional(),
})

const GradeRangeForm = ({ type, initialData }: { type: "create" | "update", initialData?: IGradeRange }) => {
    const path = usePathname();
    const router = useRouter();
    const params = useParams();

    const { schoolId, userId } = params;

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            gradeName: "",
            gradePoint: 0,
            minPercentage: 0,
            maxPercentage: 0,
            remark: "",
        },
    });

    const gradeId = initialData?._id as string;

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {

            if (type === "create") {
                await createGradeRange(values, path);
            }
            if (type === "update") {
                await updateGradeRange(gradeId, values, path);
            }

            form.reset();
            router.push(`/${schoolId}/admin/${userId}/exam/grade-ranges`)
            toast({
                title: "Grade Range Created",
                description: "Grade range was created successfully...",
            });


        } catch (error) {
            console.error("Error submitting grade range form schema", error)
            toast({
                title: "Error",
                description: "Failed to create grade range. Please try again.",
                variant: "destructive",
            });
        }
    }

    return (
        <Card>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                                control={form.control}
                                name="gradeName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Grade Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Eg. A or B or ...." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="gradePoint"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Grade Point</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Eg. O or 1 or 2 or ...." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="minPercentage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Min Percentage</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Eg. 50" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="maxPercentage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Max Percentage</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Eg. 50" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="remark"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Remarks</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Eg. Excellent or Pass or ...." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default GradeRangeForm
