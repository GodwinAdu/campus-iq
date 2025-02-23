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
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from '@/components/ui/card';
import { useParams, usePathname, useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { fetchStudentByClassId } from "@/lib/actions/student.actions";
import { createIssueBook } from "@/lib/actions/book-transaction.actions"



const formSchema = z.object({
    bookId: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    studentId: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    classId: z.string(),
    issuedDate: z.date(),
    dueDate: z.date(),

})

const CreateIssueForm = ({ type, initialData, books, classes }: { type: "createBookIssue" | "updateBookIssue", initialData?: any, classes: IClass[], books: any[] }) => {
    const [students, setStudents] = useState<IStudent[] | null>(null)
    const path = usePathname();
    const router = useRouter();
    const params = useParams();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            bookId: "",
            studentId: "",
            classId: "",
            // issuedDate: new Date(),
            // dueDate: new Date(),
        },
    });

    const classDataId = form.watch('classId');
    console.log(classDataId, 'class')
    useEffect(() => {
        if (classDataId) {

            const fetchData = async () => {
                try {
                    const data = await fetchStudentByClassId(classDataId)
                    setStudents(data);
                } catch (error) {
                    toast({
                        title: "Something went wrong",
                        description: "Please try again later...",
                        variant: "destructive",
                    })
                }
            }
            fetchData()
        }

    }, [classDataId]);

    console.log(students, "students")

    const { isSubmitting } = form.formState;
    const submitting = initialData ? "Updating ..." : "Creating...";
    const submit = initialData ? "Update " : "Issue Book";
    const bookId = initialData?._id

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "createBookIssue") {
                await createIssueBook(values, path)
            }
            if (type === "updateBookIssue") {
                // await updateBook(bookId, values, path)
            }
            router.push(`/admin/${params.adminId}/library/manage-issue-books`)
            toast({
                title: `Book ${type === "createBookIssue" ? "Created" : "Updated"} successfully`,
                description: `Book was  ${type === "createBookIssue" ? "Created" : "Updated"} successfully...`,
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
                                name="bookId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Book</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a Book" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {books.map((book) => (
                                                    <SelectItem key={book._id} value={book._id}>{book?.title}</SelectItem>

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
                                        <FormLabel>Select Class</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a class" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {classes.map((cls) => (
                                                    <SelectItem key={cls._id} value={cls._id}>{cls.name}</SelectItem>
                                                ))}

                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="studentId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Student</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a Student" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {students?.map((student) => (
                                                    <SelectItem key={student._id} value={student._id ?? ""}>{`${student.fullName} ${student.lastName} ${student.middleName}`}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="issuedDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Issued Date</FormLabel>
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
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Return Date</FormLabel>
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

export default CreateIssueForm
