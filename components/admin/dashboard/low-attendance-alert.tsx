"use client"

import { useState } from "react"
import {
    AlertCircle,
    ArrowUpDown,
    Calendar,
    ChevronDown,
    Clock,
    FileText,
    MessageSquare,
    Phone,
    Sparkles,
    UserRound,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

// Sample data for low attendance students
const lowAttendanceStudents = [
    {
        id: "S1001",
        name: "Alex Parker",
        grade: "10B",
        attendance: 62,
        absences: 12,
        trend: "declining",
        lastPresent: "2 days ago",
        contactInfo: {
            parentName: "Michael Parker",
            phone: "+1 (555) 123-4567",
            email: "michael.parker@example.com",
        },
        interventions: [
            { date: "Mar 28, 2025", type: "Email", status: "Completed", response: "Parent acknowledged" },
            { date: "Apr 2, 2025", type: "Phone Call", status: "Completed", response: "Discussed improvement plan" },
        ],
        notes: "Student has been having transportation issues. Parents are working on a solution.",
        subjects: [
            { name: "Mathematics", attendance: 58 },
            { name: "Science", attendance: 65 },
            { name: "English", attendance: 70 },
            { name: "History", attendance: 55 },
        ],
        riskFactors: ["Transportation issues", "Morning classes", "Previous attendance problems"],
    },
    {
        id: "S1002",
        name: "Maya Rodriguez",
        grade: "9C",
        attendance: 68,
        absences: 10,
        trend: "stable",
        lastPresent: "Today",
        contactInfo: {
            parentName: "Elena Rodriguez",
            phone: "+1 (555) 234-5678",
            email: "elena.rodriguez@example.com",
        },
        interventions: [
            { date: "Mar 25, 2025", type: "Email", status: "Completed", response: "No response" },
            { date: "Apr 1, 2025", type: "Phone Call", status: "Attempted", response: "No answer, left voicemail" },
        ],
        notes: "Student has shown improvement after counselor meeting last week.",
        subjects: [
            { name: "Mathematics", attendance: 72 },
            { name: "Science", attendance: 65 },
            { name: "English", attendance: 75 },
            { name: "History", attendance: 60 },
        ],
        riskFactors: ["Health issues", "Afternoon classes"],
    },
    {
        id: "S1003",
        name: "Ryan Thompson",
        grade: "8B",
        attendance: 70,
        absences: 9,
        trend: "improving",
        lastPresent: "Today",
        contactInfo: {
            parentName: "Sarah Thompson",
            phone: "+1 (555) 345-6789",
            email: "sarah.thompson@example.com",
        },
        interventions: [
            { date: "Mar 20, 2025", type: "Meeting", status: "Completed", response: "Parent and student attended" },
        ],
        notes: "Student attendance has been improving since parent meeting.",
        subjects: [
            { name: "Mathematics", attendance: 68 },
            { name: "Science", attendance: 72 },
            { name: "English", attendance: 75 },
            { name: "History", attendance: 65 },
        ],
        riskFactors: ["Social adjustment issues"],
    },
    {
        id: "S1004",
        name: "Zoe Williams",
        grade: "11A",
        attendance: 72,
        absences: 8,
        trend: "declining",
        lastPresent: "Yesterday",
        contactInfo: {
            parentName: "David Williams",
            phone: "+1 (555) 456-7890",
            email: "david.williams@example.com",
        },
        interventions: [],
        notes: "First time on attendance watch list. No interventions yet.",
        subjects: [
            { name: "Mathematics", attendance: 70 },
            { name: "Science", attendance: 75 },
            { name: "English", attendance: 68 },
            { name: "History", attendance: 75 },
        ],
        riskFactors: ["Recent transfer student", "Academic pressure"],
    },
    {
        id: "S1005",
        name: "Jamal Washington",
        grade: "10A",
        attendance: 65,
        absences: 11,
        trend: "stable",
        lastPresent: "3 days ago",
        contactInfo: {
            parentName: "Keisha Washington",
            phone: "+1 (555) 567-8901",
            email: "keisha.washington@example.com",
        },
        interventions: [
            { date: "Mar 15, 2025", type: "Email", status: "Completed", response: "Parent acknowledged" },
            { date: "Mar 22, 2025", type: "Phone Call", status: "Completed", response: "Discussed improvement plan" },
            { date: "Apr 1, 2025", type: "Meeting", status: "Scheduled", response: "Pending" },
        ],
        notes: "Student has expressed difficulty with early morning classes. Considering schedule adjustment.",
        subjects: [
            { name: "Mathematics", attendance: 60 },
            { name: "Science", attendance: 65 },
            { name: "English", attendance: 70 },
            { name: "History", attendance: 65 },
        ],
        riskFactors: ["Early morning classes", "Extracurricular commitments", "Transportation issues"],
    },
]

export function LowAttendanceAlerts() {
    const [sortBy, setSortBy] = useState("attendance")
    const [sortOrder, setSortOrder] = useState("asc")
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [interventionType, setInterventionType] = useState("email")
    const [messageContent, setMessageContent] = useState("")

    // Sort students based on current sort settings
    const sortedStudents = [...lowAttendanceStudents].sort((a, b) => {
        if (sortBy === "attendance") {
            return sortOrder === "asc" ? a.attendance - b.attendance : b.attendance - a.attendance
        } else if (sortBy === "name") {
            return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        } else if (sortBy === "grade") {
            return sortOrder === "asc" ? a.grade.localeCompare(b.grade) : b.grade.localeCompare(a.grade)
        } else if (sortBy === "absences") {
            return sortOrder === "asc" ? a.absences - b.absences : b.absences - a.absences
        }
        return 0
    })

    // Toggle sort order
    const toggleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        } else {
            setSortBy(field)
            setSortOrder("asc")
        }
    }

    // Get trend badge color
    const getTrendBadge = (trend) => {
        switch (trend) {
            case "improving":
                return (
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        Improving
                    </Badge>
                )
            case "declining":
                return (
                    <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                        Declining
                    </Badge>
                )
            default:
                return (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                        Stable
                    </Badge>
                )
        }
    }

    // Get attendance color
    const getAttendanceColor = (attendance) => {
        if (attendance < 65) return "text-red-500"
        if (attendance < 70) return "text-orange-500"
        return "text-yellow-500"
    }

    // Handle sending intervention
    const handleSendIntervention = () => {
        // In a real app, this would send the intervention and update the database
        console.log(
            `Sending ${interventionType} to ${selectedStudent.contactInfo.parentName} regarding ${selectedStudent.name}`,
        )
        console.log(`Message: ${messageContent}`)

        // Close dialog and reset form
        setMessageContent("")
    }

    // Generate AI intervention plan
    const generateAIIntervention = () => {
        // In a real app, this would call an AI service to generate a plan
        const templates = [
            "Based on the attendance pattern, I recommend scheduling a parent-teacher conference to discuss the underlying issues.",
            "The student's attendance shows a pattern of missing morning classes. Consider adjusting their schedule if possible.",
            "Regular check-ins with the school counselor might help address potential social or emotional factors affecting attendance.",
            "A personalized attendance improvement plan with weekly goals and incentives could help motivate the student.",
        ]

        setMessageContent(templates[Math.floor(Math.random() * templates.length)])
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 gap-1" onClick={() => toggleSort("attendance")}>
                        Attendance
                        <ArrowUpDown className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 gap-1" onClick={() => toggleSort("name")}>
                        Name
                        <ArrowUpDown className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 gap-1" onClick={() => toggleSort("absences")}>
                        Absences
                        <ArrowUpDown className="h-3 w-3" />
                    </Button>
                </div>
                <Input placeholder="Search students..." className="max-w-xs h-8" />
            </div>

            <Accordion type="single" collapsible className="w-full">
                {sortedStudents.map((student) => (
                    <AccordionItem key={student.id} value={student.id}>
                        <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-4 w-full">
                                <Avatar>
                                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={student.name} />
                                    <AvatarFallback>
                                        {student.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-left">{student.name}</p>
                                        <p className="text-xs text-muted-foreground text-left">
                                            Grade {student.grade} • {student.absences} absences
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {getTrendBadge(student.trend)}
                                        <p className={`text-sm font-medium ${getAttendanceColor(student.attendance)}`}>
                                            {student.attendance}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="pl-14 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-sm font-medium mb-2">Attendance Details</h4>
                                        <div className="space-y-2">
                                            <div>
                                                <div className="flex items-center justify-between text-xs mb-1">
                                                    <span>Overall Attendance</span>
                                                    <span className={getAttendanceColor(student.attendance)}>{student.attendance}%</span>
                                                </div>
                                                <Progress value={student.attendance} className="h-2" />
                                            </div>

                                            {student.subjects.map((subject) => (
                                                <div key={subject.name}>
                                                    <div className="flex items-center justify-between text-xs mb-1">
                                                        <span>{subject.name}</span>
                                                        <span className={getAttendanceColor(subject.attendance)}>{subject.attendance}%</span>
                                                    </div>
                                                    <Progress value={subject.attendance} className="h-2" />
                                                </div>
                                            ))}

                                            <div className="flex items-center gap-2 mt-4">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-xs">Last present: {student.lastPresent}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium mb-2">Risk Factors</h4>
                                        <div className="space-y-1">
                                            {student.riskFactors.map((factor, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <AlertCircle className="h-3 w-3 text-yellow-500" />
                                                    <span className="text-xs">{factor}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <h4 className="text-sm font-medium mt-4 mb-2">Contact Information</h4>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <UserRound className="h-3 w-3 text-muted-foreground" />
                                                <span className="text-xs">{student.contactInfo.parentName} (Parent/Guardian)</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-3 w-3 text-muted-foreground" />
                                                <span className="text-xs">{student.contactInfo.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MessageSquare className="h-3 w-3 text-muted-foreground" />
                                                <span className="text-xs">{student.contactInfo.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-2">Intervention History</h4>
                                    {student.interventions.length > 0 ? (
                                        <div className="space-y-2">
                                            {student.interventions.map((intervention, index) => (
                                                <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-3 w-3 text-muted-foreground" />
                                                        <span className="text-xs">{intervention.date}</span>
                                                        <Badge variant="outline" className="text-xs">
                                                            {intervention.type}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-muted-foreground">{intervention.response}</span>
                                                        <Badge
                                                            variant="outline"
                                                            className={
                                                                intervention.status === "Completed"
                                                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                                                    : intervention.status === "Scheduled"
                                                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                                                                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                                            }
                                                        >
                                                            {intervention.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-muted-foreground">No interventions recorded yet.</p>
                                    )}
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-2">Notes</h4>
                                    <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-md">{student.notes}</p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="default"
                                                size="sm"
                                                className="h-8 gap-1"
                                                onClick={() => setSelectedStudent(student)}
                                            >
                                                <MessageSquare className="h-3 w-3" />
                                                <span className="text-xs">Contact Parent</span>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Contact Parent/Guardian</DialogTitle>
                                                <DialogDescription>
                                                    Send a message to {selectedStudent?.contactInfo?.parentName} regarding {selectedStudent?.name}
                                                    's attendance.
                                                </DialogDescription>
                                            </DialogHeader>

                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="intervention-type" className="text-right">
                                                        Contact Method
                                                    </Label>
                                                    <Select value={interventionType} onValueChange={setInterventionType}>
                                                        <SelectTrigger className="col-span-3">
                                                            <SelectValue placeholder="Select contact method" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="email">Email</SelectItem>
                                                            <SelectItem value="sms">SMS</SelectItem>
                                                            <SelectItem value="call">Phone Call</SelectItem>
                                                            <SelectItem value="meeting">Schedule Meeting</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="message" className="text-right">
                                                        Message
                                                    </Label>
                                                    <Textarea
                                                        id="message"
                                                        className="col-span-3"
                                                        placeholder="Enter your message here..."
                                                        value={messageContent}
                                                        onChange={(e) => setMessageContent(e.target.value)}
                                                        rows={5}
                                                    />
                                                </div>

                                                <Button variant="outline" className="ml-auto gap-1" onClick={generateAIIntervention}>
                                                    <Sparkles className="h-4 w-4" />
                                                    Generate AI Suggestion
                                                </Button>
                                            </div>

                                            <DialogFooter>
                                                <Button variant="outline">Cancel</Button>
                                                <Button onClick={handleSendIntervention}>Send Message</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 gap-1"
                                                onClick={() => setSelectedStudent(student)}
                                            >
                                                <Sparkles className="h-3 w-3" />
                                                <span className="text-xs">Intervention Plan</span>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>AI-Generated Intervention Plan</DialogTitle>
                                                <DialogDescription>
                                                    Personalized attendance improvement plan for {selectedStudent?.name}
                                                </DialogDescription>
                                            </DialogHeader>

                                            <Tabs defaultValue="plan">
                                                <TabsList className="grid w-full grid-cols-3">
                                                    <TabsTrigger value="plan">Intervention Plan</TabsTrigger>
                                                    <TabsTrigger value="analysis">Attendance Analysis</TabsTrigger>
                                                    <TabsTrigger value="resources">Resources</TabsTrigger>
                                                </TabsList>

                                                <TabsContent value="plan" className="space-y-4 pt-4">
                                                    <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                                                        <div className="flex items-start gap-2">
                                                            <Sparkles className="h-4 w-4 text-purple-500 mt-0.5" />
                                                            <div>
                                                                <h4 className="font-medium text-sm">Recommended Approach</h4>
                                                                <p className="text-sm text-muted-foreground">
                                                                    Schedule a parent-teacher conference to discuss the underlying issues affecting{" "}
                                                                    {selectedStudent?.name}'s attendance. Focus on transportation challenges mentioned in
                                                                    previous communications.
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-start gap-2">
                                                            <Calendar className="h-4 w-4 text-purple-500 mt-0.5" />
                                                            <div>
                                                                <h4 className="font-medium text-sm">Suggested Timeline</h4>
                                                                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                                                                    <li>Week 1: Initial parent contact and meeting</li>
                                                                    <li>Week 2: Implement attendance monitoring system</li>
                                                                    <li>Week 3-4: Weekly check-ins with student</li>
                                                                    <li>Week 6: Follow-up assessment and adjustment</li>
                                                                </ul>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-start gap-2">
                                                            <FileText className="h-4 w-4 text-purple-500 mt-0.5" />
                                                            <div>
                                                                <h4 className="font-medium text-sm">Success Metrics</h4>
                                                                <p className="text-sm text-muted-foreground">
                                                                    Target improvement of 10% in overall attendance within 30 days, with particular focus
                                                                    on morning classes where absences are most frequent.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline">Modify Plan</Button>
                                                        <Button>Implement Plan</Button>
                                                    </div>
                                                </TabsContent>

                                                <TabsContent value="analysis" className="pt-4">
                                                    <div className="space-y-4">
                                                        <div className="bg-muted/50 p-4 rounded-lg">
                                                            <h4 className="font-medium text-sm mb-2">Attendance Pattern Analysis</h4>
                                                            <div className="space-y-2">
                                                                <div>
                                                                    <div className="flex items-center justify-between text-xs mb-1">
                                                                        <span>Monday</span>
                                                                        <span className="text-red-500">55%</span>
                                                                    </div>
                                                                    <Progress value={55} className="h-2" />
                                                                </div>
                                                                <div>
                                                                    <div className="flex items-center justify-between text-xs mb-1">
                                                                        <span>Tuesday</span>
                                                                        <span className="text-yellow-500">70%</span>
                                                                    </div>
                                                                    <Progress value={70} className="h-2" />
                                                                </div>
                                                                <div>
                                                                    <div className="flex items-center justify-between text-xs mb-1">
                                                                        <span>Wednesday</span>
                                                                        <span className="text-green-500">85%</span>
                                                                    </div>
                                                                    <Progress value={85} className="h-2" />
                                                                </div>
                                                                <div>
                                                                    <div className="flex items-center justify-between text-xs mb-1">
                                                                        <span>Thursday</span>
                                                                        <span className="text-yellow-500">75%</span>
                                                                    </div>
                                                                    <Progress value={75} className="h-2" />
                                                                </div>
                                                                <div>
                                                                    <div className="flex items-center justify-between text-xs mb-1">
                                                                        <span>Friday</span>
                                                                        <span className="text-red-500">60%</span>
                                                                    </div>
                                                                    <Progress value={60} className="h-2" />
                                                                </div>
                                                            </div>

                                                            <h4 className="font-medium text-sm mt-4 mb-2">Key Insights</h4>
                                                            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                                                                <li>Attendance is lowest on Mondays and Fridays</li>
                                                                <li>Morning classes have significantly lower attendance than afternoon classes</li>
                                                                <li>Attendance drops during assessment periods</li>
                                                                <li>Weather conditions correlate with attendance patterns</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </TabsContent>

                                                <TabsContent value="resources" className="pt-4">
                                                    <div className="space-y-4">
                                                        <div className="bg-muted/50 p-4 rounded-lg">
                                                            <h4 className="font-medium text-sm mb-2">Available Support Resources</h4>
                                                            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-2">
                                                                <li>
                                                                    <span className="font-medium">School Counseling Services</span>
                                                                    <p>
                                                                        Schedule regular check-ins with the school counselor to address any social or
                                                                        emotional factors.
                                                                    </p>
                                                                </li>
                                                                <li>
                                                                    <span className="font-medium">Transportation Assistance Program</span>
                                                                    <p>
                                                                        The school offers transportation support for students with documented transportation
                                                                        challenges.
                                                                    </p>
                                                                </li>
                                                                <li>
                                                                    <span className="font-medium">Peer Mentoring Program</span>
                                                                    <p>
                                                                        Connect the student with a peer mentor to provide additional support and
                                                                        accountability.
                                                                    </p>
                                                                </li>
                                                                <li>
                                                                    <span className="font-medium">Attendance Incentive Program</span>
                                                                    <p>
                                                                        Enroll the student in the school's attendance incentive program with weekly rewards
                                                                        for improvement.
                                                                    </p>
                                                                </li>
                                                            </ul>
                                                        </div>

                                                        <div className="flex justify-end">
                                                            <Button variant="outline">Request Resources</Button>
                                                        </div>
                                                    </div>
                                                </TabsContent>
                                            </Tabs>
                                        </DialogContent>
                                    </Dialog>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                                                <ChevronDown className="h-3 w-3" />
                                                <span className="text-xs">More Actions</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Student Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>View Full Profile</DropdownMenuItem>
                                            <DropdownMenuItem>View Academic Record</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Schedule Counselor Meeting</DropdownMenuItem>
                                            <DropdownMenuItem>Add to Watch List</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Generate Attendance Report</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

