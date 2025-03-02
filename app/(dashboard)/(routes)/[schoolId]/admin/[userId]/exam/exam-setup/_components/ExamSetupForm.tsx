"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
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
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card";
import MultiSelect from "./MultiSelect";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { createExamSetup, updateExamSetup } from "@/lib/actions/exam-setup.actions";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    termId: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    sessionId: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    examType: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    markType: z.string().min(2, {
        message: "Mark is require please.",
    }),
    nextTerm: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    markDistributions: z.array(z.string()).min(1, "At least one mark distribution must be provided"),
    publish: z.boolean().optional()
})

interface Props {
    type: "create" | "update";
    distributions: IDistribution[];
    terms: ITerm[];
    sessions: ISession[];
    initialData?: IExamSetup
}

const ExamSetupForm = ({ type, terms, sessions, distributions, initialData }: Props) => {
    const router = useRouter();
    const params = useParams();
    const path = usePathname();
    const { schoolId, userId } = params;
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ?? {
            name: "",
            termId: "",
            sessionId: "",
            examType: "",
            markType: "",
            nextTerm: "",
            markDistributions: [],
            publish: false
        },
    });

    const examSetupId = initialData?._id as string;

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "create") {
                await createExamSetup(values, path);
            }

            if (type === "update") {
                await updateExamSetup(examSetupId, values, path);
            }
            form.reset();
            router.push(`/${schoolId}/admin/${userId}/exam/exam-setup`)
            toast({
                title: "Success",
                description: "Exam setup has been saved successfully.",
            })

        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: "An error occurred while submitting the form.",
                variant: "destructive",
            })
        }
    }

    return (
        <Card>
            <CardContent className="Py-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Exams Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Eg. End of Term Exams" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="termId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Term</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select term" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {terms.map((term) => (
                                                    <SelectItem key={term._id} value={term._id}>{term.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="sessionId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Session</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select session" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {sessions.map((session) => (
                                                    <SelectItem key={session._id} value={session._id ?? ""}>{session.period}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="markType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mark Types</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select mark type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Mark">Mark</SelectItem>
                                                <SelectItem value="Grade">Grade</SelectItem>
                                                <SelectItem value="Mark and Grade">Mark and Grade</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="examType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Exams Types</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select exams type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="online">Online</SelectItem>
                                                <SelectItem value="written">Written</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="markDistributions"
                                defaultValue={[]} // Initialize as an empty array
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mark Distribution</FormLabel>
                                        <FormControl>
                                            <MultiSelect
                                                placeholder="Mark Distributions"
                                                distributions={distributions}
                                                value={field.value || []} // Ensure value is an array
                                                onChange={(markDistribution) =>
                                                    field.onChange([...field.value, markDistribution])
                                                }
                                                onRemove={(idToRemove) =>
                                                    field.onChange(field.value.filter(
                                                        (distributionId) => distributionId !== idToRemove
                                                    ))
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-1" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="nextTerm"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Next Term Begins</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="publish"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Publish
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
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default ExamSetupForm
