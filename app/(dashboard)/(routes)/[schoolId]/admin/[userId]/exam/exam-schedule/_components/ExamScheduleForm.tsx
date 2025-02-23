"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import React, { useEffect, useState } from "react";
import { fetchExamSchedule, updateExamSchedule } from "@/lib/actions/exam-schedule.actions";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";


const formSchema = z.object({
    examId: z.string().min(2, {
        message: "Exam ID must be at least 2 characters.",
    }),
    classId: z.string().min(2, {
        message: "Class ID must be at least 2 characters.",
    }),
    subjectItems: z.array(
        z.object({
            subjectName: z.string().min(2, {
                message: "Subject ID must be at least 2 characters.",
            }),
            hallId: z.string().min(2, {
                message: "Hall ID must be at least 2 characters.",
            }),
            date: z.coerce.date(),
            startTime: z.string(),
            endTime: z.string(),
            distributionItems: z.array(
                z.object({
                    distribution: z.string().min(2, {
                        message: "Distribution ID must be at least 2 characters.",
                    }),
                    fullMark: z.coerce.number().nullable().optional(),
                    passMark: z.coerce.number().nullable().optional(),
                })
            ),
        })
    ),
});

interface ExamScheduleProps {
    exams: any[];
    halls: IExamHall[];
    classes: IClass[];
    type: "create" | "update";
    initialData?: z.infer<typeof formSchema>;
}

export function ExamScheduleForm({ exams, halls, classes }: ExamScheduleProps) {
    const [scheduleData, setScheduleData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const path = usePathname();
    const router = useRouter();
    const params = useParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            examId: "",
            classId: "",
            subjectItems: scheduleData?.subjectItems || [],
        },
    });

    const examId = useWatch({
        control: form.control,
        name: "examId",
    });

    const classId = useWatch({
        control: form.control,
        name: "classId",
    });

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const data = await fetchExamSchedule(examId, classId)
            console.log(data,"testing")
            setScheduleData(data);
            // Reset the form with fetched data
            form.reset({
                examId: examId,
                classId: classId,
                subjectItems: data.subjectItems || [], // Use fetched subjectItems or an empty array
            });
        } catch (error) {
            console.error("Error fetching schedule data", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (examId && classId) {
            fetchData()
        }

    }, [classId, examId])
    useEffect(() => {
        if (scheduleData.subjectItems && scheduleData.subjectItems.length > 0) {
            form.reset({
                examId: examId,
                classId: classId,
                subjectItems: scheduleData.subjectItems,
            });
        }
    }, []);

    const { fields } = useFieldArray({
        control: form.control,
        name: "subjectItems",
    });
    const examScheduleId = scheduleData?._id as string;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await updateExamSchedule(examScheduleId, values, path)
            router.push(`/admin/${params.adminId}/exam/exam-schedule`)
            toast({
                title: "Update Successfully",
                description: "Update exam schedule successfully...",
            })

        } catch (error) {
            console.error("Error updating exam schedule", error);
            toast({
                title: "Something went wrong",
                description: "Please try again later",
                variant: "destructive"
            })

        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                        <FormField
                            control={form.control}
                            name="examId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Exam ID</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an Exam ID" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {exams.map((exam) => (
                                                <SelectItem key={exam._id} value={exam._id}>{exam.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="classId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Class ID</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Class ID" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {classes.map((cls) => (
                                                <SelectItem key={cls._id} value={cls._id ?? ''}>{cls.name}</SelectItem>
                                            ))}

                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
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
                            <FormField
                                control={form.control}
                                name={`subjectItems.${index}.hallId`}
                                render={({ field }) => (
                                    <FormItem className="min-w-[220px] flex-shrink-0">
                                        <FormLabel>Hall ID</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a hall" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {halls.map((cls) => (
                                                    <SelectItem key={cls._id} value={cls._id ?? ''}>{cls.name}</SelectItem>
                                                ))}

                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`subjectItems.${index}.date`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col py-3">
                                        <FormLabel>Exams Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`subjectItems.${index}.startTime`}
                                render={({ field }) => (
                                    <FormItem className="min-w-[220px] flex-shrink-0">
                                        <FormLabel>Start Time</FormLabel>
                                        <Input {...field} placeholder="Enter Start Time" />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`subjectItems.${index}.endTime`}
                                render={({ field }) => (
                                    <FormItem className="min-w-[220px] flex-shrink-0">
                                        <FormLabel>End Time</FormLabel>
                                        <Input {...field} placeholder="Enter End Time" />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex overflow-x-auto gap-2">
                                {field.distributionItems.map((distribution, distIndex) => (
                                    <Card key={distIndex} className="">
                                        <CardDescription className="px-4 py-2 font-bold">{distribution.distribution}</CardDescription>
                                        <CardContent className="grid grid-cols-2 gap-2">
                                            <FormField
                                                control={form.control}
                                                name={`subjectItems.${index}.distributionItems.${distIndex}.fullMark`}
                                                render={({ field }) => (
                                                    <FormItem className="min-w-[100px] flex-shrink-0">
                                                        <Input
                                                            {...field}
                                                            value={field.value ?? ""}
                                                            placeholder="Full Mark"
                                                        />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`subjectItems.${index}.distributionItems.${distIndex}.passMark`}
                                                render={({ field }) => (
                                                    <FormItem className="min-w-[100px] flex-shrink-0">
                                                        <Input
                                                            {...field}
                                                            value={field.value ?? ""}
                                                            placeholder="Pass Mark"
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



                {/* <Button
                    type="button"
                    onClick={() => append({
                        subjectId: "",
                        hallId: "",
                        date: new Date(),
                        startTime: "",
                        endTime: "",
                        distributionItems: [{
                            distributionId: "",
                            fullMark: null,
                            passMark: null,
                        }]
                    })}
                >
                    Add Subject Item
                </Button> */}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
