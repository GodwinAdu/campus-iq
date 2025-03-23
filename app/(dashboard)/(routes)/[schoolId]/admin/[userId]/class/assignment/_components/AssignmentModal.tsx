"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Edit, FileUp, Loader2, Paperclip, Plus, X } from "lucide-react"
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { unknown, z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { toast } from "@/hooks/use-toast"
import { fetchSubjectByClassId } from "@/lib/actions/subject.actions"
import { useRouter } from "next/navigation"
import { createAssignment } from "@/lib/actions/assignment.actions"
import { Checkbox } from "@/components/ui/checkbox"

// Form schemas
const assignmentFormSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    classId: z.string().min(1, "Please select a class"),
    subjectId: z.string().min(1, "Please select a subject"),
    dueDate: z.date({
        required_error: "Due date is required",
    }),
    totalMarks: z.coerce.number().min(1, "Total marks must be at least 1").max(100, "Total marks cannot exceed 100"),
    numberOfSubmission: z.coerce.number().min(1, "Total marks must be at least 1").max(10, "Total marks cannot exceed 10"),
    assignmentType: z.enum(["homework", "project", "quiz", "classwork"], {
        required_error: "Please select an assignment type",
    }),
    allowLateSubmission: z.coerce.boolean().default(false),
    attachments: z.array(z.string()).optional(),
    instructions: z.string().optional(),
});

type ModalProps = {
    classes: IClass[],
    type: "create" | "update";
    initialData?: IAssignment
}

const AssignmentModal = ({ classes, type, initialData }: ModalProps) => {
    const [subjects, setSubjects] = useState<ISubject[] | []>([]);

    const router = useRouter();
    // Form for creating/editing assignments
    const form = useForm<z.infer<typeof assignmentFormSchema>>({
        resolver: zodResolver(assignmentFormSchema),
        defaultValues: initialData ?? {
            title: "",
            description: "",
            classId: "",
            subjectId: "",
            dueDate: new Date(),
            totalMarks: 10,
            numberOfSubmission: 1,
            assignmentType: "homework",
            attachments: [],
            instructions: "",
            allowLateSubmission: false,
        },
    });

    console.log(initialData, "assignment")

    const { isSubmitting } = form.formState;
    const classId = form.watch('classId')

    useEffect(() => {
        if (classId) {
            const fetchData = async () => {
                try {
                    const data = await fetchSubjectByClassId(classId)
                    setSubjects(data);
                } catch (error) {
                    console.log(error);
                    toast({
                        title: "Error fetch"
                    })
                }
            }
            fetchData()
        }
    }, [classId])
    //  // Effect to set form values when editing an assignment
    //     useEffect(() => {
    //         if (selectedAssignment && showCreateDialog) {
    //             form.reset({
    //                 title: selectedAssignment.title,
    //                 description: selectedAssignment.description,
    //                 classId: selectedAssignment.classId,
    //                 subjectId: selectedAssignment.subjectId,
    //                 dueDate: new Date(selectedAssignment.dueDate),
    //                 totalMarks: selectedAssignment.totalMarks,
    //                 assignmentType: selectedAssignment.assignmentType,
    //                 attachments: selectedAssignment.attachments,
    //                 instructions: selectedAssignment.instructions || "",
    //             })
    //         }
    //     }, [selectedAssignment, showCreateDialog, form])
    // Function to handle assignment creation/editing
    const onSubmitAssignment = async (values: z.infer<typeof assignmentFormSchema>) => {
        try {
            if (type === "create") {
                // TODO create assignment
                await createAssignment(values)
            }
            if (type === "update") {
                // TODO update assignment
            }

            form.reset();
            toast({
                title: type === "update" ? "Assignment updated" : "Assignment created",
                description: "Assignment was saved successfully...",
            });

            window.location.reload()

        } catch (error) {
            console.log(error);
            toast({
                title: "Error saving"
            })

        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {type === "create" ? (
                    <Button
                        className="gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Create Assignment
                    </Button>
                ) : (

                    <Button
                        variant="outline"
                        className="w-full gap-2"
                    >
                        <Edit className="h-4 w-4" />
                        Edit Assignment
                    </Button>
                )}

            </DialogTrigger>
            <DialogContent className="w-[965] max-w-2xl h-[80%] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{type === "update" ? "Edit Assignment" : "Create New Assignment"}</DialogTitle>
                    <DialogDescription>
                        {type === "update"
                            ? "Update the details of the existing assignment"
                            : "Fill in the details to create a new assignment"}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitAssignment)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter assignment title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter assignment description" className="min-h-[100px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="classId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Class</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value?._id ?? ""} // Ensure correct default value
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select class" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {classes.map((cls) => (
                                                <SelectItem key={cls._id} value={cls._id ?? ""}>
                                                    {cls.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        <FormField
                            control={form.control}
                            name="subjectId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value._id ?? ""}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select subject" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {subjects?.map((subject) => (
                                                <SelectItem key={subject._id} value={subject._id ?? ""}>
                                                    {subject.subjectName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="assignmentType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Assignment Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="classwork">Class Work</SelectItem>
                                                <SelectItem value="homework">Homework</SelectItem>
                                                <SelectItem value="project">Project</SelectItem>
                                                <SelectItem value="quiz">Quiz</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="totalMarks"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Total Marks</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={1}
                                                max={100}
                                                {...field}
                                                onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10) || 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="numberOfSubmission"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Number of Submissions</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={1}
                                                max={10}
                                                {...field}
                                                onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10) || 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="dueDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Due Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant="outline" className="w-full pl-3 text-left font-normal">
                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                    <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <CalendarComponent
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
                            name="instructions"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Instructions (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter detailed instructions for students..."
                                            className="min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Provide any specific instructions or guidelines for completing the assignment
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="allowLateSubmission"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Allow late submission of assigments
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <div>
                            <FormLabel>Attachments</FormLabel>
                            <div className="mt-2 p-4 border border-dashed rounded-md text-center">
                                <FileUp className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                <p className="text-sm text-muted-foreground mb-1">Drag and drop files here, or click to browse</p>
                                <Button type="button" variant="outline" size="sm">
                                    Upload Files
                                </Button>
                            </div>

                            {/* {selectedAssignment && selectedAssignment.attachments && selectedAssignment.attachments.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    <p className="text-sm font-medium">Current Attachments:</p>
                                    {selectedAssignment.attachments.map((attachment: string, index: number) => (
                                        <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                                            <div className="flex items-center gap-2">
                                                <Paperclip className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">{attachment}</span>
                                            </div>
                                            <Button variant="ghost" size="icon">
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )} */}
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    form.reset()
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {type === "update" ? "Updating..." : "Creating..."}
                                    </>
                                ) : type === "update" ? (
                                    "Update Assignment"
                                ) : (
                                    "Create Assignment"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >


    )
}

export default AssignmentModal
