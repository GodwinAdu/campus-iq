"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, FileText, Award, MessageSquare, Eye, Download } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SubmissionDetailsProps {
    submission: any
}

export default function SubmissionDetails({ submission }: SubmissionDetailsProps) {
    const { assignmentId, submission: submissionData } = submission
    const [previewOpen, setPreviewOpen] = useState(false)

    // Calculate grade percentage and color
    const percentage = Math.round((submissionData.marks / assignmentId.totalMarks) * 100)
    const getGradeColor = () => {
        if (percentage >= 90) return "text-green-500"
        if (percentage >= 80) return "text-emerald-500"
        if (percentage >= 70) return "text-blue-500"
        if (percentage >= 60) return "text-yellow-500"
        return "text-red-500"
    }

    return (
        <>
            <Card className="overflow-hidden border-t-4" style={{ borderTopColor: assignmentId.subjectId.color }}>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl">{assignmentId.title}</CardTitle>
                            <div className="text-muted-foreground mt-1 flex items-center gap-2">
                                <span
                                    className="inline-block w-3 h-3 rounded-full"
                                    style={{ backgroundColor: assignmentId.subjectId.color }}
                                />
                                {assignmentId.subjectId.name}
                            </div>
                        </div>
                        <Badge variant={submissionData.isMarked ? "default" : "outline"}>
                            {submissionData.isMarked ? "Graded" : "Pending Grading"}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <span>Submitted: {format(new Date(submissionData.submittedAt), "PPP 'at' h:mm a")}</span>
                        </div>

                        {submissionData.file && (
                            <div className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                                <span>{submissionData.file}</span>
                                <span className="text-xs text-muted-foreground">({submissionData.fileSize})</span>
                                <div className="flex items-center ml-auto gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setPreviewOpen(true)}>
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    <Tabs defaultValue="submission" className="w-full">
                        <TabsList className="grid w-full max-w-md grid-cols-2">
                            <TabsTrigger value="submission">Your Submission</TabsTrigger>
                            <TabsTrigger value="feedback">Feedback & Grade</TabsTrigger>
                        </TabsList>
                        <TabsContent value="submission" className="pt-4">
                            {submissionData.content ? (
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Your Answer</h3>
                                    <div className="bg-muted p-4 rounded-md">
                                        <p className="whitespace-pre-wrap">{submissionData.content}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-muted p-4 rounded-md text-center">
                                    <p className="text-muted-foreground">No text content was submitted.</p>
                                </div>
                            )}
                        </TabsContent>
                        <TabsContent value="feedback" className="pt-4">
                            {submissionData.isMarked ? (
                                <div className="space-y-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="space-y-1">
                                            <h3 className="font-semibold text-lg">Your Grade</h3>
                                            <div className="flex items-center gap-2">
                                                <Award className="h-5 w-5 text-primary" />
                                                <span className="text-2xl font-bold">
                                                    {submissionData.marks} / {assignmentId.totalMarks}
                                                </span>
                                                <span className={`text-lg font-medium ${getGradeColor()}`}>({percentage}%)</span>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-1/3">
                                            <div className="text-xs flex justify-between mb-1">
                                                <span>0</span>
                                                <span>{assignmentId.totalMarks}</span>
                                            </div>
                                            <Progress value={(submissionData.marks / assignmentId.totalMarks) * 100} className="h-3" />
                                        </div>
                                    </div>

                                    <Separator />

                                    {submissionData.feedback && (
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                                                <h3 className="font-semibold">Teacher Feedback</h3>
                                            </div>
                                            <div className="bg-muted p-4 rounded-md">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Teacher" />
                                                        <AvatarFallback>T</AvatarFallback>
                                                    </Avatar>
                                                    <div className="text-sm">
                                                        <p className="font-medium">Teacher</p>
                                                        <p className="text-muted-foreground">
                                                            {format(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), "MMM d, yyyy")}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="whitespace-pre-wrap">{submissionData.feedback}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 p-4 rounded-md">
                                    <p className="text-yellow-800 dark:text-yellow-300 flex items-center gap-2">
                                        <Award className="h-5 w-5" />
                                        Your submission is being reviewed. Check back later for your grade and feedback.
                                    </p>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>

                    <Separator />

                    <div className="flex justify-between items-center">
                        <Button variant="outline" className="gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" x2="12" y1="15" y2="3" />
                            </svg>
                            Download Submission
                        </Button>

                        {submissionData.isMarked && (
                            <Button variant="outline" className="gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                    <path d="m9 14 2 2 4-4" />
                                </svg>
                                Print Feedback
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                <DialogContent className="max-w-4xl h-[80vh]">
                    <DialogHeader>
                        <DialogTitle>File Preview: {submissionData.file}</DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 overflow-hidden rounded-md border">
                        {submissionData.fileType?.includes("pdf") ? (
                            <div className="h-full flex items-center justify-center bg-muted">
                                <div className="text-center p-8">
                                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="font-medium text-lg">PDF Preview</h3>
                                    <p className="text-sm text-muted-foreground mt-1">PDF preview is not available in this demo.</p>
                                    <Button className="mt-4">Download to View</Button>
                                </div>
                            </div>
                        ) : submissionData.fileType?.includes("image") ? (
                            <img
                                src="/placeholder.svg?height=600&width=800"
                                alt="Document preview"
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="h-full flex items-center justify-center bg-muted">
                                <div className="text-center p-8">
                                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="font-medium text-lg">Preview not available</h3>
                                    <p className="text-sm text-muted-foreground mt-1">This file type cannot be previewed.</p>
                                    <Button className="mt-4">Download File</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

