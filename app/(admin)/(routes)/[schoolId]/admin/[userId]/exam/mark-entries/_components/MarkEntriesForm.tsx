"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray} from "react-hook-form";
import { z } from "zod";
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
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useParams, usePathname, useRouter } from "next/navigation";
import { saveMarkEntries } from "@/lib/actions/mark-entries.actions";
import { Switch } from "@/components/ui/switch";


// Define the schema including totalMark for each subject item
const formSchema = z.object({
    publish: z.coerce.boolean(),
    subjectItems: z.array(
        z.object({
            subjectName: z.string().min(2, {
                message: "Subject ID must be at least 2 characters.",
            }),
            totalMark: z.number().nullable().optional(), // totalMark field
            distributionItems: z.array(
                z.object({
                    distributionId: z.string().min(2, {
                        message: "Distribution ID must be at least 2 characters.",
                    }),
                    mark: z.coerce.number().nullable().optional(),
                })
            ),
        })
    ),
});


export function MarkEntriesForm({ mark }: { mark: IMark }) {
    const path = usePathname();
    const router = useRouter();
    const params = useParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            publish: mark.publish ?? false,
            subjectItems: mark?.subjectItems ?? [],
        },
    });

    const { fields } = useFieldArray({
        control: form.control,
        name: "subjectItems",
    });



    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await saveMarkEntries({ mark, values })
            router.push(`/admin/${params.adminId}/exam/mark-entries`);
            toast({
                title: "Update Successfully",
                description: "Update exam schedule successfully...",
            });
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "Please try again later",
                variant: "destructive",
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {fields.map((field, index) => (
                    <Card key={field.id} className="relative overflow-x-auto max-w-6xl">
                        <CardContent className="flex gap-4 py-4 w-max overflow-x-auto">
                            <FormField
                                control={form.control}
                                name={`subjectItems.${index}.subjectName`}
                                render={({ field }) => (
                                    <FormItem className="min-w-[220px] flex-shrink-0">
                                        <FormLabel>Subjects</FormLabel>
                                        <Input disabled className="bg-gray-200" {...field} placeholder="Enter Subject ID" />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex overflow-x-auto gap-2">
                                {field.distributionItems.map((distribution, distIndex) => (
                                    <Card key={distIndex}>
                                        <CardDescription className="px-4 py-2 font-bold">{distribution.distribution}</CardDescription>
                                        <CardContent className="grid grid-cols-1">
                                            <FormField
                                                control={form.control}
                                                name={`subjectItems.${index}.distributionItems.${distIndex}.mark`}
                                                render={({ field }) => (
                                                    <FormItem className="min-w-[100px] flex-shrink-0">
                                                        <Input
                                                            {...field}
                                                            type="number"
                                                            value={field.value ?? ""}
                                                            placeholder="Mark"
                                                        />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                        </CardContent>
                    </Card>
                ))}
                <div className="flex justify-between items-center max-w-4xl mx-auto">
                    <FormField
                        control={form.control}
                        name="publish"
                        render={({ field }) => (
                            <FormItem className="flex items-center text-center justify-between rounded-lg border p-4 gap-6 ">
                                <div className="">
                                    <FormLabel className="text-base pt-1">
                                        Publish Results
                                    </FormLabel>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit Marks</Button>
                </div>

            </form>
        </Form>
    );
}
