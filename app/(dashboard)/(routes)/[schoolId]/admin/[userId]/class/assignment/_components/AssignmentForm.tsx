"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Book,
    Calendar,
    CheckCircle,
    Clock,
    Download,
    Edit,
    Eye,
    FileText,
    Filter,
    GraduationCap,
    Info,
    Loader2,
    MoreHorizontal,
    PenLine,
    Search,
    Trash,
    BarChart3,
    AlertCircle,
    MessageSquare,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format, addDays, isBefore } from "date-fns"
import ClassSelection from "@/components/commons/ClassSelection"
import AssignmentModal from "./AssignmentModal"
import { getAllAssignments } from "@/lib/actions/assignment.actions"
import { getAllAssignmentSubmissions } from "@/lib/actions/assignment-submission.actions"
import ResultComponent from "./ResultComponent"
import MarkingComponent from "./MarkingComponent"






// Helper functions
const getAssignmentStatusBadge = (status: string, dueDate: string) => {
    const now = new Date()
    const due = new Date(dueDate)

    if (status === "past" || isBefore(due, now)) {
        return (
            <Badge variant="outline" className="bg-gray-100 text-gray-800">
                Past Due
            </Badge>
        )
    }

    // Due in less than 2 days
    if (isBefore(due, addDays(now, 2))) {
        return (
            <Badge variant="outline" className="bg-red-100 text-red-800">
                Due Soon
            </Badge>
        )
    }

    return (
        <Badge variant="outline" className="bg-green-100 text-green-800">
            Active
        </Badge>
    )
}


const getAssignmentTypeIcon = (type: string) => {
    switch (type) {
        case "homework":
            return <FileText className="h-4 w-4" />
        case "project":
            return <GraduationCap className="h-4 w-4" />
        case "quiz":
            return <CheckCircle className="h-4 w-4" />
        case "classwork":
            return <PenLine className="h-4 w-4" />
        default:
            return <FileText className="h-4 w-4" />
    }
}

const getAssignmentTypeName = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
}

export default function AssignmentManagement({ classes }: { classes: IClass[] }) {
    const router = useRouter()
    const params = useParams()

    const [activeTab, setActiveTab] = useState("assignments")
    const [assignments, setAssignments] = useState([])
    const [selectedAssignment, setSelectedAssignment] = useState<any | null>(null)
    const [showCreateDialog, setShowCreateDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [assignmentToDelete, setAssignmentToDelete] = useState<any | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [classFilter, setClassFilter] = useState("all")
    const [subjectFilter, setSubjectFilter] = useState("all")
    const [submissions, setSubmissions] = useState([])
    const [selectedStudent, setSelectedStudent] = useState<any | null>(null)

    const [selectedClass, setSelectedClass] = useState(classes[0]?._id);





    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllAssignments(selectedClass as string)
                setAssignments(response)

            } catch (error) {
                console.error("Error fetching data:", error)

            }
        }
        fetchData()
    }, [selectedClass]);

    useEffect(() => {
        if (!selectedAssignment) return
        const subjectId = selectedAssignment?.subjectId?._id
        const fetchSubmissions = async () => {
            try {
                const response = await getAllAssignmentSubmissions(selectedClass as string, subjectId as string)
                setSubmissions(response)

            } catch (error) {
                console.error("Error fetching submissions:", error)
            }
        }
        fetchSubmissions()
    }, [selectedClass, selectedAssignment]);



    // Function to handle assignment deletion
    const handleDeleteAssignment = () => {
        if (assignmentToDelete) {
            // Filter out the assignment to delete
            setAssignments(assignments.filter((assignment) => assignment._id !== assignmentToDelete.id))

            toast({
                title: "Assignment deleted",
                description: "The assignment has been deleted successfully.",
            })

            setShowDeleteDialog(false)
            setAssignmentToDelete(null)

            // If the deleted assignment was selected, clear the selection
            if (selectedAssignment && selectedAssignment.id === assignmentToDelete.id) {
                setSelectedAssignment(null)
            }
        }
    }


    // Filter assignments based on search term and filters
    const filteredAssignments = assignments.filter((assignment) => {
        const matchesSearch =
            assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assignment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assignment.classId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assignment.subjectId.subjectName.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && assignment.status === "active") ||
            (statusFilter === "past" && assignment.status === "past")

        const matchesClass = classFilter === "all" || assignment.classId._id === classFilter

        const matchesSubject = subjectFilter === "all" || assignment.subjectId._id === subjectFilter

        return matchesSearch && matchesStatus && matchesClass && matchesSubject
    })

    // Calculate statistics for the results tab
    const calculateStatistics = () => {
        if (!selectedAssignment || !submissions.length) return null

        const totalStudents = submissions.length
        const submitted = submissions.filter(
            (s) => s.submission.status === "submitted" || s.submission.status === "late",
        ).length
        const notSubmitted = totalStudents - submitted
        const marked = submissions.filter((s) => s.submission.isMarked).length

        // Calculate average marks
        const totalMarks = submissions.reduce((sum, student) => {
            return sum + (student.submission.marks || 0)
        }, 0)
        const averageMarks = marked ? (totalMarks / marked).toFixed(1) : "N/A"

        // Calculate grade distribution
        const gradeDistribution = {
            A: 0, // 90-100%
            B: 0, // 80-89%
            C: 0, // 70-79%
            D: 0, // 60-69%
            E: 0, // 50-59%
            F: 0, // Below 50%
        }

        submissions.forEach((student) => {
            if (student.submission.isMarked) {
                const percentage = (student.submission.marks / selectedAssignment.totalMarks) * 100

                if (percentage >= 90) gradeDistribution.A++
                else if (percentage >= 80) gradeDistribution.B++
                else if (percentage >= 70) gradeDistribution.C++
                else if (percentage >= 60) gradeDistribution.D++
                else if (percentage >= 50) gradeDistribution.E++
                else gradeDistribution.F++
            }
        })

        return {
            totalStudents,
            submitted,
            notSubmitted,
            marked,
            averageMarks,
            gradeDistribution,
        }
    }

    const statistics = calculateStatistics()

    return (
        <div className="container mx-auto px-4 py-6 max-w-7xl">
            <div className="flex flex-col space-y-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex gap-4 items-center">
                        <label className="font-bold text-sm hidden lg:block">Select Class</label>
                        <ClassSelection selectedClass={(value) => setSelectedClass(value)} classes={classes} />
                    </div>
                    <AssignmentModal type="create" classes={classes} />
                </div>

                {/* Main Content */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 lg:w-[600px]">
                        <TabsTrigger value="assignments" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span>Assignments</span>
                        </TabsTrigger>
                        {selectedAssignment && (
                            <>
                                <TabsTrigger value="details" className="flex items-center gap-2">
                                    <Info className="h-4 w-4" />
                                    <span>Details</span>
                                </TabsTrigger>
                                <TabsTrigger value="marking" className="flex items-center gap-2">
                                    <PenLine className="h-4 w-4" />
                                    <span>Marking</span>
                                </TabsTrigger>
                                <TabsTrigger value="results" className="flex items-center gap-2">
                                    <BarChart3 className="h-4 w-4" />
                                    <span>Results</span>
                                </TabsTrigger>
                            </>
                        )}
                    </TabsList>

                    {/* Assignments Tab */}
                    <TabsContent value="assignments" className="mt-6">
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <CardTitle>All Assignments</CardTitle>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="Search assignments..."
                                                className="pl-10 w-full sm:w-[250px]"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="gap-2">
                                                    <Filter className="h-4 w-4" />
                                                    <span>Filter</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[200px]">
                                                <div className="p-2">
                                                    <div className="mb-2">
                                                        <p className="text-sm font-medium mb-1">Status</p>
                                                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select status" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="all">All</SelectItem>
                                                                <SelectItem value="active">Active</SelectItem>
                                                                <SelectItem value="past">Past</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div className="mb-2">
                                                        <p className="text-sm font-medium mb-1">Class</p>
                                                        <Select value={classFilter} onValueChange={setClassFilter}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select class" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="all">All Classes</SelectItem>
                                                                {classes.map((cls) => (
                                                                    <SelectItem key={cls._id} value={cls._id ?? ""}>
                                                                        {cls.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent>
                                {filteredAssignments.length === 0 ? (
                                    <div className="text-center py-10">
                                        <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                                        <h3 className="text-lg font-medium">No assignments found</h3>
                                        <p className="text-muted-foreground mt-1">
                                            {searchTerm || statusFilter !== "all" || classFilter !== "all" || subjectFilter !== "all"
                                                ? "Try adjusting your search or filters"
                                                : "Create your first assignment to get started"}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Assignment</TableHead>
                                                    <TableHead>Class & Subject</TableHead>
                                                    <TableHead>Due Date</TableHead>
                                                    <TableHead>Submissions</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredAssignments.map((assignment) => (
                                                    <TableRow key={assignment._id}>
                                                        <TableCell>
                                                            <div className="flex items-start gap-2">
                                                                <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                                                                    {getAssignmentTypeIcon(assignment.assignmentType)}
                                                                </div>
                                                                <div>
                                                                    <div className="font-medium">{assignment.title}</div>
                                                                    <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                                                                        {assignment.description}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="font-medium">{assignment.classId.name}</div>
                                                            <div className="text-sm text-muted-foreground">{assignment.subjectId.subjectName}</div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                                <span>{format(new Date(assignment.dueDate), "MMM d, yyyy")}</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <Progress
                                                                    value={(assignment.submissionCount.length / assignment.totalStudents) * 100}
                                                                    className="h-2 w-20"
                                                                />
                                                                <span className="text-sm">
                                                                    {assignment.submissionCount.length}/{assignment.totalStudents}
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>{getAssignmentStatusBadge(assignment.status, assignment.dueDate)}</TableCell>
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
                                                                            setSelectedAssignment(assignment)
                                                                            setActiveTab("details")
                                                                        }}
                                                                    >
                                                                        <Eye className="mr-2 h-4 w-4" />
                                                                        View Details
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        onClick={() => {
                                                                            setSelectedAssignment(assignment)
                                                                            setActiveTab("marking")
                                                                        }}
                                                                    >
                                                                        <PenLine className="mr-2 h-4 w-4" />
                                                                        Mark Submissions
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        onClick={() => {
                                                                            setSelectedAssignment(assignment)
                                                                            setActiveTab("results")
                                                                        }}
                                                                    >
                                                                        <BarChart3 className="mr-2 h-4 w-4" />
                                                                        View Results
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem
                                                                        onClick={() => {
                                                                            setSelectedAssignment(assignment)
                                                                            setShowCreateDialog(true)
                                                                        }}
                                                                    >
                                                                        <Edit className="mr-2 h-4 w-4" />
                                                                        Edit Assignment
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        onClick={() => {
                                                                            setAssignmentToDelete(assignment)
                                                                            setShowDeleteDialog(true)
                                                                        }}
                                                                        className="text-destructive focus:text-destructive"
                                                                    >
                                                                        <Trash className="mr-2 h-4 w-4" />
                                                                        Delete Assignment
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Assignment Details Tab */}
                    <TabsContent value="details" className="mt-6">
                        {selectedAssignment && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card className="md:col-span-2">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                                                    {getAssignmentTypeIcon(selectedAssignment.assignmentType)}
                                                </div>
                                                <CardTitle>{selectedAssignment.title}</CardTitle>
                                            </div>
                                            {getAssignmentStatusBadge(selectedAssignment.status, selectedAssignment.dueDate)}
                                        </div>
                                        <CardDescription>
                                            {getAssignmentTypeName(selectedAssignment.assignmentType)} for {selectedAssignment.classId.name} -{" "}
                                            {selectedAssignment.subjectId.subjectName}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-medium mb-2">Description</h3>
                                            <p className="text-muted-foreground whitespace-pre-line">{selectedAssignment.description}</p>
                                        </div>

                                        {selectedAssignment.instructions && (
                                            <div>
                                                <h3 className="text-lg font-medium mb-2">Instructions</h3>
                                                <p className="text-muted-foreground whitespace-pre-line">{selectedAssignment.instructions}</p>
                                            </div>
                                        )}

                                        {selectedAssignment.attachments && selectedAssignment.attachments.length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-medium mb-2">Attachments</h3>
                                                <div className="space-y-2">
                                                    {selectedAssignment.attachments.map((attachment: string, index: number) => (
                                                        <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                                                            <div className="flex items-center gap-2">
                                                                <FileText className="h-4 w-4 text-muted-foreground" />
                                                                <span>{attachment}</span>
                                                            </div>
                                                            <Button variant="ghost" size="icon">
                                                                <Download className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Assignment Details</CardTitle>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-muted-foreground">Class</span>
                                            <span className="font-medium">{selectedAssignment.classId.name}</span>
                                        </div>

                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-muted-foreground">Subject</span>
                                            <span className="font-medium">{selectedAssignment.subjectId.subjectName}</span>
                                        </div>

                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-muted-foreground">Type</span>
                                            <span className="font-medium">{getAssignmentTypeName(selectedAssignment.assignmentType)}</span>
                                        </div>

                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-muted-foreground">Total Marks</span>
                                            <span className="font-medium">{selectedAssignment.totalMarks}</span>
                                        </div>

                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-muted-foreground">Due Date</span>
                                            <span className="font-medium">{format(new Date(selectedAssignment.dueDate), "MMM d, yyyy")}</span>
                                        </div>

                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-muted-foreground">Created On</span>
                                            <span className="font-medium">
                                                {format(new Date(selectedAssignment.createdAt), "MMM d, yyyy")}
                                            </span>
                                        </div>

                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-muted-foreground">Submissions</span>
                                            <span className="font-medium">
                                                {selectedAssignment.submissionCount.length}/{selectedAssignment.totalStudents}
                                            </span>
                                        </div>

                                        <div className="flex justify-between py-2">
                                            <span className="text-muted-foreground">Submission Rate</span>
                                            <span className="font-medium">
                                                {Math.round((selectedAssignment.submissionCount.length / selectedAssignment.totalStudents) * 100)}%
                                            </span>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="flex flex-col gap-3">
                                        <Button className="w-full gap-2" onClick={() => setActiveTab("marking")}>
                                            <PenLine className="h-4 w-4" />
                                            Mark Submissions
                                        </Button>
                                        <AssignmentModal type="update" classes={classes} initialData={selectedAssignment} />
                                    </CardFooter>
                                </Card>
                            </div>
                        )}
                    </TabsContent>

                    {/* Marking Tab */}
                    <TabsContent value="marking" className="mt-6">
                        <MarkingComponent
                            selectedAssignment={selectedAssignment}
                            submissions={submissions}
                            selectedStudent={selectedStudent}
                            setSelectedStudent={setSelectedStudent}
                        />
                    </TabsContent>

                    {/* Results Tab */}
                    <TabsContent value="results" className="mt-6">
                        <ResultComponent
                            setActiveTab={setActiveTab}
                            selectedAssignment={selectedAssignment}
                            statistics={statistics}
                            submissions={submissions}
                            setSelectedStudent={setSelectedStudent}
                        />
                    </TabsContent>
                </Tabs>
            </div>
            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Assignment</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this assignment? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    {assignmentToDelete && (
                        <div className="p-4 border rounded-md bg-muted">
                            <div className="font-medium">{assignmentToDelete.title}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                                {assignmentToDelete.className} - {assignmentToDelete.subjectName}
                            </div>
                            <div className="text-sm mt-2 flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>Due: {format(new Date(assignmentToDelete.dueDate), "MMM d, yyyy")}</span>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteAssignment}>
                            Delete Assignment
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

