import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { format } from 'date-fns'
import { Download, MessageSquare, MoreHorizontal, PenLine } from 'lucide-react'
import React from 'react'
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
const ResultComponent = ({ selectedAssignment, statistics,submissions,setActiveTab,setSelectedStudent }) => {
    return (
        <>
            {selectedAssignment && statistics && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle>Results Summary</CardTitle>
                            <CardDescription>
                                {selectedAssignment.classId.name} - {selectedAssignment.subjectId.subjectName}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Total Students</span>
                                    <Badge variant="outline">{statistics.totalStudents}</Badge>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Submissions</span>
                                    <div className="flex items-center gap-2">
                                        <Progress
                                            value={(statistics.submitted / statistics.totalStudents) * 100}
                                            className="h-2 w-20"
                                        />
                                        <Badge variant="outline">{statistics.submitted}</Badge>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Not Submitted</span>
                                    <Badge variant="outline">{statistics.notSubmitted}</Badge>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Marked</span>
                                    <div className="flex items-center gap-2">
                                        <Progress value={(statistics.marked / statistics.submitted) * 100} className="h-2 w-20" />
                                        <Badge variant="outline">{statistics.marked}</Badge>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Average Marks</span>
                                    <Badge variant="outline">{statistics.averageMarks}</Badge>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-sm font-medium mb-3">Grade Distribution</h3>
                                <div className="space-y-2">
                                    {Object.entries(statistics.gradeDistribution).map(([grade, count]) => (
                                        <div key={grade} className="flex items-center gap-2">
                                            <div className="w-8 text-center font-medium">{grade}</div>
                                            <Progress value={(count / statistics.marked) * 100} className="h-3 flex-1" />
                                            <div className="w-8 text-center text-sm">{count}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-2 text-xs text-muted-foreground">
                                    <div>A: 90-100%</div>
                                    <div>B: 80-89%</div>
                                    <div>C: 70-79%</div>
                                    <div>D: 60-69%</div>
                                    <div>E: 50-59%</div>
                                    <div>F: Below 50%</div>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col gap-3">
                            <Button className="w-full gap-2">
                                <Download className="h-4 w-4" />
                                Export Results
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Student Results</CardTitle>
                            <div className="flex items-center justify-between mt-2">
                                <CardDescription>Detailed results for all students</CardDescription>
                                <Input placeholder="Search students..." className="w-[200px]" />
                            </div>
                        </CardHeader>

                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Submission Date</TableHead>
                                        <TableHead>Marks</TableHead>
                                        <TableHead>Grade</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {submissions.map((student) => {
                                        // Calculate grade
                                        let grade = "N/A"
                                        if (student.submission.isMarked) {
                                            const percentage = (student.submission.marks / selectedAssignment.totalMarks) * 100
                                            if (percentage >= 90) grade = "A"
                                            else if (percentage >= 80) grade = "B"
                                            else if (percentage >= 70) grade = "C"
                                            else if (percentage >= 60) grade = "D"
                                            else if (percentage >= 50) grade = "E"
                                            else grade = "F"
                                        }

                                        return (
                                            <TableRow key={student.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={student.studentId.imgUrl} alt={student.studentId.fullName} />
                                                            <AvatarFallback>{student.studentId.fullName.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium">{student.studentId.fullName}</div>
                                                            <div className="text-xs text-muted-foreground">{student.studentId.studentID}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{getSubmissionStatusBadge(student.submission.status)}</TableCell>
                                                <TableCell>
                                                    {student.submission.submittedAt
                                                        ? format(new Date(student.submission.submittedAt), "MMM d, yyyy")
                                                        : "N/A"}
                                                </TableCell>
                                                <TableCell>
                                                    {student.submission.isMarked
                                                        ? `${student.submission.marks}/${selectedAssignment.totalMarks}`
                                                        : student.submission.status === "not_submitted"
                                                            ? "N/A"
                                                            : "Not marked"}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            grade === "A"
                                                                ? "bg-green-100 text-green-800"
                                                                : grade === "B"
                                                                    ? "bg-blue-100 text-blue-800"
                                                                    : grade === "C"
                                                                        ? "bg-yellow-100 text-yellow-800"
                                                                        : grade === "D" || grade === "E"
                                                                            ? "bg-orange-100 text-orange-800"
                                                                            : grade === "F"
                                                                                ? "bg-red-100 text-red-800"
                                                                                : ""
                                                        }
                                                    >
                                                        {grade}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem
                                                                onClick={() => {
                                                                    setSelectedStudent(student)
                                                                    setActiveTab("marking")
                                                                }}
                                                            >
                                                                <PenLine className="mr-2 h-4 w-4" />
                                                                {student.submission.isMarked ? "Edit Marks" : "Mark Assignment"}
                                                            </DropdownMenuItem>
                                                            {student.submission.status !== "not_submitted" && student.submission.file && (
                                                                <DropdownMenuItem>
                                                                    <Download className="mr-2 h-4 w-4" />
                                                                    Download Submission
                                                                </DropdownMenuItem>
                                                            )}
                                                            <DropdownMenuItem>
                                                                <MessageSquare className="mr-2 h-4 w-4" />
                                                                Send Message
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    )
}

export default ResultComponent
