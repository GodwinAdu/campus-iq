import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { AlertCircle, CheckCircle, Clock, Download, FileText, Loader2, PenLine } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const getSubmissionStatusBadge = (status: string) => {
    switch (status) {
        case "submitted":
            return (
                <Badge variant="outline" className="bg-green-100 text-green-800">
                    Submitted
                </Badge>
            )
        case "late":
            return (
                <Badge variant="outline" className="bg-amber-100 text-amber-800">
                    Late
                </Badge>
            )
        case "not_submitted":
            return (
                <Badge variant="outline" className="bg-red-100 text-red-800">
                    Not Submitted
                </Badge>
            )
        default:
            return null
    }
}



const MarkingComponent = ({ selectedAssignment, submissions, setSelectedStudent, selectedStudent }) => {
    const [isMarkingAll, setIsMarkingAll] = useState(false)

    // Form for marking assignments
    const markingFormSchema = z.object({
        marks: z.number().min(0, "Marks cannot be negative"),
        feedback: z.string().optional(),
    })

    const markingForm = useForm<z.infer<typeof markingFormSchema>>({
        resolver: zodResolver(markingFormSchema),
        defaultValues: {
            marks: 0,
            feedback: "",
        },
    })



    // Effect to set marking form values when selecting a student
    useEffect(() => {
        if (selectedStudent && selectedStudent.submission) {
            markingForm.reset({
                marks: selectedStudent.submission.marks || 0,
                feedback: selectedStudent.submission.feedback || "",
            })
        }
    }, [selectedStudent, markingForm]);

    // Function to handle marking a student's assignment
    const handleMarkAssignment = (data: any) => {
        if (selectedStudent) {
            // Update the student's submission
            const updatedStudents = submissions.map((student) =>
                student.id === selectedStudent.id
                    ? {
                        ...student,
                        submission: {
                            ...student.submission,
                            marks: data.marks,
                            feedback: data.feedback,
                            isMarked: true,
                        },
                    }
                    : student,
            )

            // setStudents(updatedStudents)

            // Update the selected student
            setSelectedStudent({
                ...selectedStudent,
                submission: {
                    ...selectedStudent.submission,
                    marks: data.marks,
                    feedback: data.feedback,
                    isMarked: true,
                },
            })

            toast({
                title: "Assignment marked",
                description: `${selectedStudent.name}'s assignment has been marked successfully.`,
            })
        }
    }

    // Function to handle marking all assignments
    const handleMarkAll = () => {
        setIsMarkingAll(true)

        // Simulate API call
        setTimeout(() => {
            // Mark all unmarked submissions with random scores
            const updatedStudents = submissions.map((student) => {
                if (student.submission.status === "submitted" && !student.submission.isMarked) {
                    const randomMark = Math.floor(Math.random() * (selectedAssignment.totalMarks + 1))
                    return {
                        ...student,
                        submission: {
                            ...student.submission,
                            marks: randomMark,
                            feedback: "Automatically marked",
                            isMarked: true,
                        },
                    }
                }
                return student
            })

            // setStudents(updatedStudents)

            toast({
                title: "All assignments marked",
                description: "All submitted assignments have been marked.",
            })

            setIsMarkingAll(false)
        }, 2000)
    }

    return (
        <>
            {selectedAssignment && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-1">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle>Students</CardTitle>
                                <Badge variant="outline">{submissions.length}</Badge>
                            </div>
                            <CardDescription>
                                {selectedAssignment.classId.name} - {selectedAssignment.subjectId.subjectName}
                            </CardDescription>

                            <div className="mt-2">
                                <Input placeholder="Search students..." className="w-full" />
                            </div>
                        </CardHeader>

                        <CardContent className="p-0">
                            <ScrollArea className="h-[500px]">
                                {submissions.length === 0 ? (
                                    <div className="text-center py-10">
                                        <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                                        <h3 className="text-lg font-medium">No Submissions Available</h3>
                                    </div>
                                ) : (
                                    <div className="divide-y">
                                        {submissions.map((student) => (
                                            <div
                                                key={student._id}
                                                className={`p-4 cursor-pointer transition-colors ${selectedStudent?.id === student._id ? "bg-muted" : "hover:bg-muted/50"
                                                    }`}
                                                onClick={() => setSelectedStudent(student)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarImage src={student.studentId.imgUrl} alt={student.studentId.fullName} />
                                                            <AvatarFallback>{student.studentId.fullName.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium">{student.studentId.fullName}</div>
                                                            <div className="text-sm text-muted-foreground">Roll: {student.studentId.studentID}</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col items-end">
                                                        {getSubmissionStatusBadge(student.submission.status)}
                                                        {student.submission.isMarked && (
                                                            <div className="text-sm font-medium mt-1">
                                                                {student.submission.marks}/{selectedAssignment.totalMarks}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ScrollArea>

                        </CardContent>

                        <CardFooter className="border-t p-4">
                            <Button className="w-full gap-2" onClick={handleMarkAll} disabled={isMarkingAll}>
                                {isMarkingAll ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Marking All...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="h-4 w-4" />
                                        Mark All Submissions
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="md:col-span-2">
                        {selectedStudent ? (
                            <>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Avatar>
                                                <AvatarImage src={selectedStudent.studentId.imgUrl} alt={selectedStudent.studentId.fullName} />
                                                <AvatarFallback>{selectedStudent.studentId.fullName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <CardTitle>{selectedStudent.studentId.fullName}</CardTitle>
                                                <CardDescription>Roll: {selectedStudent.studentId.studentID}</CardDescription>
                                            </div>
                                        </div>
                                        {getSubmissionStatusBadge(selectedStudent.submission.status)}
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    {selectedStudent.submission.status === "not_submitted" ? (
                                        <div className="text-center py-10">
                                            <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                                            <h3 className="text-lg font-medium">No submission</h3>
                                            <p className="text-muted-foreground mt-1">
                                                This student has not submitted the assignment yet.
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <div>
                                                <h3 className="text-lg font-medium mb-2">Submission</h3>
                                                <div className="space-y-5">


                                                    {selectedStudent?.submission?.file ? (
                                                        <div className="p-4 border rounded-md">
                                                            <div className="flex items-center justify-between mb-4">
                                                                <div className="flex items-center gap-2">
                                                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                                                    <span className="font-medium">{selectedStudent.submission.file}</span>
                                                                </div>
                                                                <Button variant="outline" size="sm" className="gap-1">
                                                                    <Download className="h-4 w-4" />
                                                                    Download
                                                                </Button>
                                                            </div>

                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <Clock className="h-4 w-4" />
                                                                <span>
                                                                    Submitted{" "}
                                                                    {format(
                                                                        new Date(selectedStudent.submission.submittedAt),
                                                                        "MMM d, yyyy 'at' h:mm a",
                                                                    )}
                                                                    {selectedStudent.submission.status === "late" && (
                                                                        <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800">
                                                                            Late
                                                                        </Badge>
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <p className="text-muted-foreground">No file submitted</p>
                                                    )}
                                                    {selectedStudent?.submission?.content ? (
                                                        <div className="p-4 border rounded-md">
                                                            <div className="">
                                                                {selectedStudent.submission.content}
                                                            </div>

                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <Clock className="h-4 w-4" />
                                                                <span>
                                                                    Submitted{" "}
                                                                    {format(
                                                                        new Date(selectedStudent.submission.submittedAt),
                                                                        "MMM d, yyyy 'at' h:mm a",
                                                                    )}
                                                                    {selectedStudent.submission.status === "late" && (
                                                                        <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800">
                                                                            Late
                                                                        </Badge>
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <p className="text-muted-foreground">No content added</p>
                                                    )}
                                                </div>

                                            </div>

                                            <Separator />

                                            <div>
                                                <h3 className="text-lg font-medium mb-4">Marking</h3>

                                                <Form {...markingForm}>
                                                    <form onSubmit={markingForm.handleSubmit(handleMarkAssignment)} className="space-y-4">
                                                        <FormField
                                                            control={markingForm.control}
                                                            name="marks"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Marks</FormLabel>
                                                                    <div className="flex items-center gap-2">
                                                                        <FormControl>
                                                                            <Input
                                                                                disabled={selectedStudent.submission.file === null || selectedStudent.submission.content === null}
                                                                                type="number"
                                                                                min={0}
                                                                                max={selectedAssignment.totalMarks}
                                                                                value={field.value}
                                                                                onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10) || 0)}
                                                                            />
                                                                        </FormControl>
                                                                        <span className="text-muted-foreground">
                                                                            / {selectedAssignment.totalMarks}
                                                                        </span>
                                                                    </div>
                                                                    <FormDescription>
                                                                        Enter marks out of {selectedAssignment.totalMarks}
                                                                    </FormDescription>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={markingForm.control}
                                                            name="feedback"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Feedback</FormLabel>
                                                                    <FormControl>
                                                                        <Textarea
                                                                            disabled={selectedStudent.submission.file === null || selectedStudent.submission.content === null}
                                                                            placeholder="Provide feedback to the student..."
                                                                            className="min-h-[100px]"
                                                                            value={field.value}
                                                                            onChange={(e) => field.onChange(e.target.value)}
                                                                        />
                                                                    </FormControl>
                                                                    <FormDescription>Optional feedback for the student</FormDescription>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <div className="flex justify-end gap-3">
                                                            <Button type="button" variant="outline" onClick={() => markingForm.reset()}>
                                                                Reset
                                                            </Button>
                                                            <Button disabled={selectedStudent.submission.file === null || selectedStudent.submission.content === null} type="submit">Save Marks</Button>
                                                        </div>
                                                    </form>
                                                </Form>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full py-20">
                                <PenLine className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-xl font-medium">Select a student to mark</h3>
                                <p className="text-muted-foreground mt-1 text-center max-w-md">
                                    Select a student from the list to view their submission and provide marks and feedback.
                                </p>
                            </div>
                        )}
                    </Card>
                </div>
            )}
        </>
    )
}

export default MarkingComponent
