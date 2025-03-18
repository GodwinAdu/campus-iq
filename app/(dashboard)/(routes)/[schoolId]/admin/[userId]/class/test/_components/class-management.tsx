"use client"

import { useState, useEffect } from "react"
import {
    ArrowUpDown,
    BookOpen,
    Calendar,
    Clock,
    Download,
    Edit,
    ExternalLink,
    Eye,
    FileText,
    Filter,
    LineChart,
    Mail,
    MessageSquare,
    MoreHorizontal,
    PenTool,
    Plus,
    Search,
    Send,
    Settings,
    Share,
    Shield,
    Star,
    UserPlus,
    Users,
    X,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Types
interface Class {
    id: string
    name: string
    grade: string
    section: string
    roomNumber: string
    academicYear: string
    classTeacher: Teacher
    students: Student[]
    subjects: Subject[]
    schedule: ScheduleItem[]
    metrics: {
        attendance: number
        performance: number
        assignments: number
    }
}

interface Teacher {
    id: string
    name: string
    email: string
    phone: string
    avatar?: string
    qualification: string
    specialization: string
    joinDate: string
    experience: number
    rating: number
    bio: string
    subjects: string[]
}

interface Student {
    id: string
    name: string
    email: string
    avatar?: string
    attendance: number
    performance: number
    behavior: number
    gender: string
    parentName: string
    parentContact: string
    enrollmentDate: string
    status: "active" | "inactive" | "transferred"
}

interface Subject {
    id: string
    name: string
    code: string
    teacherId: string
    teacherName: string
    category: string
    creditHours: number
    description: string
    syllabus: string[]
    assignments: number
    tests: number
    resources: Resource[]
}

interface ScheduleItem {
    id: string
    day: string
    startTime: string
    endTime: string
    subjectId: string
    subjectName: string
    teacherId: string
    teacherName: string
    roomNumber: string
    type: "regular" | "lab" | "extra" | "event"
}

interface Resource {
    id: string
    title: string
    type: "document" | "video" | "link" | "quiz"
    url: string
}

interface Announcement {
    id: string
    title: string
    content: string
    date: string
    author: string
    authorAvatar?: string
    priority: "low" | "medium" | "high"
}

// Mock data
const CLASSES: Class[] = [
    {
        id: "CLS001",
        name: "10-A Science",
        grade: "Grade 10",
        section: "Section A",
        roomNumber: "R-101",
        academicYear: "2023-2024",
        classTeacher: {
            id: "TCH001",
            name: "Dr. Sarah Johnson",
            email: "sarah.johnson@school.edu",
            phone: "+1-234-567-890",
            avatar: "/placeholder.svg?height=80&width=80",
            qualification: "Ph.D. in Physics",
            specialization: "Applied Physics",
            joinDate: "2018-06-15",
            experience: 8,
            rating: 4.8,
            bio: "Dr. Sarah Johnson is a passionate educator with a strong background in Physics and Mathematics. She believes in practical learning and encourages students to explore concepts through experiments and real-world applications.",
            subjects: ["Physics", "Mathematics"],
        },
        students: Array.from({ length: 28 }).map((_, i) => ({
            id: `STU${String(i + 1).padStart(3, "0")}`,
            name: [
                "Emma Thompson",
                "Liam Johnson",
                "Olivia Williams",
                "Noah Brown",
                "Ava Jones",
                "Ethan Davis",
                "Sophia Miller",
                "Mason Wilson",
                "Isabella Moore",
                "Logan Taylor",
                "Mia Anderson",
                "Lucas Thomas",
                "Harper White",
                "Jackson Harris",
                "Evelyn Martin",
                "Aiden Thompson",
                "Abigail Garcia",
                "Elijah Martinez",
                "Emily Robinson",
                "James Clark",
                "Charlotte Rodriguez",
                "Benjamin Lewis",
                "Amelia Lee",
                "Alexander Walker",
                "Sofia Hall",
                "Michael Allen",
                "Ella Young",
                "William Hernandez",
            ][i],
            email: `student${i + 1}@school.edu`,
            avatar: Math.random() > 0.3 ? `/placeholder.svg?height=40&width=40` : undefined,
            attendance: Math.floor(Math.random() * 20) + 80,
            performance: Math.floor(Math.random() * 30) + 70,
            behavior: Math.floor(Math.random() * 15) + 85,
            gender: Math.random() > 0.5 ? "Male" : "Female",
            parentName: `${Math.random() > 0.5 ? "Mr." : "Mrs."} ${["Thompson", "Johnson", "Williams", "Brown", "Jones", "Davis", "Miller", "Wilson", "Moore", "Taylor"][i % 10]}`,
            parentContact: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
            enrollmentDate: `202${Math.floor(Math.random() * 3) + 1}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
            status: Math.random() > 0.9 ? (Math.random() > 0.5 ? "inactive" : "transferred") : "active",
        })),
        subjects: [
            {
                id: "SUB001",
                name: "Physics",
                code: "PHY101",
                teacherId: "TCH001",
                teacherName: "Dr. Sarah Johnson",
                category: "Science",
                creditHours: 4,
                description:
                    "This course covers mechanics, thermodynamics, waves, and modern physics with practical lab experiments.",
                syllabus: [
                    "Introduction to Physics and Measurements",
                    "Kinematics in One and Two Dimensions",
                    "Forces and Newton's Laws of Motion",
                    "Work, Energy, and Power",
                    "Momentum and Collisions",
                    "Rotational Motion and the Law of Gravity",
                    "Fluid Mechanics",
                    "Thermal Physics and Heat Transfer",
                    "Oscillations and Waves",
                    "Sound and Acoustics",
                    "Electricity and Magnetism Basics",
                    "Optics and Light Phenomena",
                    "Introduction to Modern Physics",
                ],
                assignments: 8,
                tests: 4,
                resources: [
                    {
                        id: "RES001",
                        title: "Physics Textbook - Chapter 1",
                        type: "document",
                        url: "#",
                    },
                    {
                        id: "RES002",
                        title: "Mechanics Video Lecture Series",
                        type: "video",
                        url: "#",
                    },
                    {
                        id: "RES003",
                        title: "Interactive Physics Simulations",
                        type: "link",
                        url: "#",
                    },
                ],
            },
            {
                id: "SUB002",
                name: "Mathematics",
                code: "MAT101",
                teacherId: "TCH002",
                teacherName: "Mr. Robert Wilson",
                category: "Mathematics",
                creditHours: 5,
                description: "This course covers algebra, geometry, trigonometry, and an introduction to calculus.",
                syllabus: [
                    "Algebraic Expressions and Equations",
                    "Functions and Graphs",
                    "Quadratic Equations and Inequalities",
                    "Polynomial and Rational Functions",
                    "Exponential and Logarithmic Functions",
                    "Trigonometric Functions and Applications",
                    "Analytic Geometry",
                    "Systems of Equations and Matrices",
                    "Sequences and Series",
                    "Introduction to Calculus",
                    "Limits and Continuity",
                    "Differentiation and Applications",
                    "Integration and Applications",
                ],
                assignments: 12,
                tests: 5,
                resources: [
                    {
                        id: "RES004",
                        title: "Mathematics Textbook",
                        type: "document",
                        url: "#",
                    },
                    {
                        id: "RES005",
                        title: "Algebra Problem Set",
                        type: "document",
                        url: "#",
                    },
                    {
                        id: "RES006",
                        title: "Trigonometry Practice Quiz",
                        type: "quiz",
                        url: "#",
                    },
                ],
            },
            {
                id: "SUB003",
                name: "Chemistry",
                code: "CHM101",
                teacherId: "TCH003",
                teacherName: "Dr. Emily Chen",
                category: "Science",
                creditHours: 4,
                description:
                    "This course covers atomic structure, periodic table, chemical bonding, and basic organic chemistry.",
                syllabus: [
                    "Introduction to Chemistry and Matter",
                    "Atomic Structure and the Periodic Table",
                    "Chemical Bonding and Molecular Structure",
                    "Chemical Reactions and Stoichiometry",
                    "Gases, Liquids, and Solids",
                    "Solutions and Solubility",
                    "Acids, Bases, and pH",
                    "Oxidation-Reduction Reactions",
                    "Thermochemistry",
                    "Electrochemistry",
                    "Nuclear Chemistry",
                    "Introduction to Organic Chemistry",
                    "Biochemistry Basics",
                ],
                assignments: 7,
                tests: 4,
                resources: [
                    {
                        id: "RES007",
                        title: "Chemistry Textbook",
                        type: "document",
                        url: "#",
                    },
                    {
                        id: "RES008",
                        title: "Periodic Table Interactive",
                        type: "link",
                        url: "#",
                    },
                    {
                        id: "RES009",
                        title: "Chemical Reactions Lab Guide",
                        type: "document",
                        url: "#",
                    },
                ],
            },
            {
                id: "SUB004",
                name: "Biology",
                code: "BIO101",
                teacherId: "TCH004",
                teacherName: "Dr. Mark Thompson",
                category: "Science",
                creditHours: 4,
                description: "This course covers cell biology, genetics, human physiology, and ecology.",
                syllabus: [
                    "Introduction to Biology and Scientific Method",
                    "Cell Structure and Function",
                    "Cell Division and Reproduction",
                    "Genetics and Heredity",
                    "DNA Structure and Function",
                    "Evolution and Natural Selection",
                    "Human Anatomy and Physiology",
                    "Circulatory and Respiratory Systems",
                    "Digestive and Excretory Systems",
                    "Nervous and Endocrine Systems",
                    "Plant Biology",
                    "Ecology and Ecosystems",
                    "Environmental Biology",
                ],
                assignments: 9,
                tests: 4,
                resources: [
                    {
                        id: "RES010",
                        title: "Biology Textbook",
                        type: "document",
                        url: "#",
                    },
                    {
                        id: "RES011",
                        title: "Cell Biology Animations",
                        type: "video",
                        url: "#",
                    },
                    {
                        id: "RES012",
                        title: "Genetics Problem Set",
                        type: "document",
                        url: "#",
                    },
                ],
            },
            {
                id: "SUB005",
                name: "English",
                code: "ENG101",
                teacherId: "TCH005",
                teacherName: "Ms. Jessica Brown",
                category: "Languages",
                creditHours: 3,
                description: "This course focuses on literature analysis, writing skills, and effective communication.",
                syllabus: [
                    "Literary Analysis and Interpretation",
                    "Critical Reading Strategies",
                    "Writing Process and Structure",
                    "Narrative, Descriptive, and Expository Writing",
                    "Argumentative and Persuasive Writing",
                    "Grammar and Mechanics",
                    "Vocabulary Development",
                    "Poetry Analysis and Appreciation",
                    "Drama and Shakespeare Studies",
                    "Novel Studies",
                    "Research Paper Writing",
                    "Public Speaking and Presentations",
                    "Media Literacy",
                ],
                assignments: 10,
                tests: 3,
                resources: [
                    {
                        id: "RES013",
                        title: "English Literature Anthology",
                        type: "document",
                        url: "#",
                    },
                    {
                        id: "RES014",
                        title: "Grammar Guide",
                        type: "document",
                        url: "#",
                    },
                    {
                        id: "RES015",
                        title: "Essay Writing Workshop",
                        type: "video",
                        url: "#",
                    },
                ],
            },
        ],
        schedule: [
            {
                id: "SCH001",
                day: "Monday",
                startTime: "08:00",
                endTime: "09:30",
                subjectId: "SUB001",
                subjectName: "Physics",
                teacherId: "TCH001",
                teacherName: "Dr. Sarah Johnson",
                roomNumber: "R-101",
                type: "regular",
            },
            {
                id: "SCH002",
                day: "Monday",
                startTime: "09:45",
                endTime: "11:15",
                subjectId: "SUB002",
                subjectName: "Mathematics",
                teacherId: "TCH002",
                teacherName: "Mr. Robert Wilson",
                roomNumber: "R-101",
                type: "regular",
            },
            {
                id: "SCH003",
                day: "Monday",
                startTime: "11:30",
                endTime: "13:00",
                subjectId: "SUB003",
                subjectName: "Chemistry",
                teacherId: "TCH003",
                teacherName: "Dr. Emily Chen",
                roomNumber: "R-101",
                type: "regular",
            },
            {
                id: "SCH004",
                day: "Monday",
                startTime: "14:00",
                endTime: "15:30",
                subjectId: "SUB001",
                subjectName: "Physics",
                teacherId: "TCH001",
                teacherName: "Dr. Sarah Johnson",
                roomNumber: "LAB-1",
                type: "lab",
            },
            {
                id: "SCH005",
                day: "Tuesday",
                startTime: "08:00",
                endTime: "09:30",
                subjectId: "SUB004",
                subjectName: "Biology",
                teacherId: "TCH004",
                teacherName: "Dr. Mark Thompson",
                roomNumber: "R-101",
                type: "regular",
            },
            {
                id: "SCH006",
                day: "Tuesday",
                startTime: "09:45",
                endTime: "11:15",
                subjectId: "SUB002",
                subjectName: "Mathematics",
                teacherId: "TCH002",
                teacherName: "Mr. Robert Wilson",
                roomNumber: "R-101",
                type: "regular",
            },
            {
                id: "SCH007",
                day: "Tuesday",
                startTime: "11:30",
                endTime: "13:00",
                subjectId: "SUB005",
                subjectName: "English",
                teacherId: "TCH005",
                teacherName: "Ms. Jessica Brown",
                roomNumber: "R-101",
                type: "regular",
            },
            {
                id: "SCH008",
                day: "Tuesday",
                startTime: "14:00",
                endTime: "15:30",
                subjectId: "SUB004",
                subjectName: "Biology",
                teacherId: "TCH004",
                teacherName: "Dr. Mark Thompson",
                roomNumber: "LAB-2",
                type: "lab",
            },
            {
                id: "SCH009",
                day: "Wednesday",
                startTime: "08:00",
                endTime: "09:30",
                subjectId: "SUB001",
                subjectName: "Physics",
                teacherId: "TCH001",
                teacherName: "Dr. Sarah Johnson",
                roomNumber: "R-101",
                type: "regular",
            },
            {
                id: "SCH010",
                day: "Wednesday",
                startTime: "09:45",
                endTime: "11:15",
                subjectId: "SUB003",
                subjectName: "Chemistry",
                teacherId: "TCH003",
                teacherName: "Dr. Emily Chen",
                roomNumber: "R-101",
                type: "regular",
            },
        ],
        metrics: {
            attendance: 92,
            performance: 87,
            assignments: 85,
        },
    },
    {
        id: "CLS002",
        name: "10-B Science",
        grade: "Grade 10",
        section: "Section B",
        roomNumber: "R-102",
        academicYear: "2023-2024",
        classTeacher: {
            id: "TCH002",
            name: "Mr. Robert Wilson",
            email: "robert.wilson@school.edu",
            phone: "+1-234-567-891",
            avatar: "/placeholder.svg?height=80&width=80",
            qualification: "M.Sc. in Mathematics",
            specialization: "Pure Mathematics",
            joinDate: "2019-08-10",
            experience: 6,
            rating: 4.7,
            bio: "Mr. Robert Wilson has a passion for making Mathematics accessible and enjoyable for all students.",
            subjects: ["Mathematics"],
        },
        students: [],
        subjects: [],
        schedule: [],
        metrics: {
            attendance: 89,
            performance: 83,
            assignments: 81,
        },
    },
    {
        id: "CLS003",
        name: "10-C Humanities",
        grade: "Grade 10",
        section: "Section C",
        roomNumber: "R-103",
        academicYear: "2023-2024",
        classTeacher: {
            id: "TCH005",
            name: "Ms. Jessica Brown",
            email: "jessica.brown@school.edu",
            phone: "+1-234-567-892",
            avatar: "/placeholder.svg?height=80&width=80",
            qualification: "M.A. in English Literature",
            specialization: "Modern Literature",
            joinDate: "2020-01-15",
            experience: 5,
            rating: 4.9,
            bio: "Ms. Jessica Brown is a dynamic English teacher who inspires students to develop a love for literature and language.",
            subjects: ["English"],
        },
        students: [],
        subjects: [],
        schedule: [],
        metrics: {
            attendance: 94,
            performance: 88,
            assignments: 92,
        },
    },
]

const ANNOUNCEMENTS: Announcement[] = [
    {
        id: "ANN001",
        title: "Parent-Teacher Meeting",
        content: "The Parent-Teacher Meeting for Grade 10 is scheduled for 15th October 2023 from 10:00 AM to 2:00 PM.",
        date: "2023-10-05",
        author: "Dr. Sarah Johnson",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        priority: "high",
    },
    {
        id: "ANN002",
        title: "Science Exhibition Participation",
        content:
            "Students interested in participating in the Annual Science Exhibition should submit their project proposals.",
        date: "2023-10-08",
        author: "Dr. Emily Chen",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        priority: "medium",
    },
    {
        id: "ANN003",
        title: "Mathematics Olympiad Registration",
        content: "Registrations for the National Mathematics Olympiad are now open.",
        date: "2023-10-10",
        author: "Mr. Robert Wilson",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        priority: "medium",
    },
]

export default function ClassManagementDashboard() {
    const { toast } = useToast()
    const [selectedClass, setSelectedClass] = useState<Class>(CLASSES[0])
    const [activeTab, setActiveTab] = useState("overview")
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredStudents, setFilteredStudents] = useState<Student[]>(selectedClass.students)
    const [studentDetailOpen, setStudentDetailOpen] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
    const [teacherDetailOpen, setTeacherDetailOpen] = useState(false)
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
    const [subjectDetailOpen, setSubjectDetailOpen] = useState(false)
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
    const [activeDay, setActiveDay] = useState<string>("Monday")
    const [announcements] = useState<Announcement[]>(ANNOUNCEMENTS)
    const [showFilterPanel, setShowFilterPanel] = useState(false)
    const [studentSortField, setStudentSortField] = useState<keyof Student>("name")
    const [studentSortDirection, setStudentSortDirection] = useState<"asc" | "desc">("asc")
   

    // Effect for filtering students
    useEffect(() => {
        if (!searchQuery) {
            setFilteredStudents(selectedClass.students)
            return
        }

        const query = searchQuery.toLowerCase()
        const filtered = selectedClass.students.filter(student =>
            student.name.toLowerCase().includes(query) ||
            student.id.toLowerCase().includes(query) ||
            student.email.toLowerCase().includes(query)
        )

        setFilteredStudents(filtered)
    }, [searchQuery, selectedClass.students])

    // Handle class change
    const handleClassChange = (classId: string) => {
        const newClass = CLASSES.find(c => c.id === classId)
        if (newClass) {
            setSelectedClass(newClass)
            setSearchQuery("")
            setFilteredStudents(newClass.students)
        }
    }

    // Handle student sort
    const handleStudentSort = (field: keyof Student) => {
        if (field === studentSortField) {
            setStudentSortDirection(studentSortDirection === "asc" ? "desc" : "asc")
        } else {
            setStudentSortField(field)
            setStudentSortDirection("asc")
        }
    }

    // Sort students based on current sort field and direction
    const sortedStudents = [...filteredStudents].sort((a, b) => {
        const valueA = a[studentSortField]
        const valueB = b[studentSortField]

        if (typeof valueA === "string" && typeof valueB === "string") {
            return studentSortDirection === "asc"
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA)
        }

        // For numeric values
        if (typeof valueA === "number" && typeof valueB === "number") {
            return studentSortDirection === "asc"
                ? valueA - valueB
                : valueB - valueA
        }

        return 0
    })

    // Handle view student details
    const handleViewStudentDetails = (student: Student) => {
        setSelectedStudent(student)
        setStudentDetailOpen(true)
    }

    // Handle view teacher details
    const handleViewTeacherDetails = (teacher: Teacher) => {
        setSelectedTeacher(teacher)
        setTeacherDetailOpen(true)
    }

    // Handle view subject details
    const handleViewSubjectDetails = (subject: Subject) => {
        setSelectedSubject(subject)
        setSubjectDetailOpen(true)
    }

    // Handle export data
    const handleExportData = (type: string) => {
        toast({
            title: "Export Initiated",
            description: `The ${type} data is being exported. You'll receive a download link shortly.`,
        })
    }

    // Calculate class metrics
    const totalStudents = selectedClass.students.length
    const activeStudents = selectedClass.students.filter(s => s.status === "active").length
    const maleStudents = selectedClass.students.filter(s => s.gender === "Male").length
    const femaleStudents = selectedClass.students.filter(s => s.gender === "Female").length
    const averageAttendance = selectedClass.students.reduce((acc, student) => acc + student.attendance, 0) / totalStudents || 0
    const averagePerformance = selectedClass.students.reduce((acc, student) => acc + student.performance, 0) / totalStudents || 0

    // Filter schedule for active day
    const daySchedule = selectedClass.schedule.filter(item => item.day === activeDay)

    // Render status badge
    const renderStatusBadge = (status: Student["status"]) => {
        switch (status) {
            case "active":
                return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
            case "inactive":
                return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Inactive</Badge>
            case "transferred":
                return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Transferred</Badge>
            default:
                return null
        }
    }

    // Render schedule item type badge
    const renderScheduleTypeBadge = (type: ScheduleItem["type"]) => {
        switch (type) {
            case "regular":
                return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Regular</Badge>
            case "lab":
                return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Lab</Badge>
            case "extra":
                return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Extra</Badge>
            case "event":
                return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Event</Badge>
            default:
                return null
        }
    }

    // Render performance level
    const renderPerformanceLevel = (performance: number) => {
        if (performance >= 90) return "Excellent"
        if (performance >= 80) return "Good"
        if (performance >= 70) return "Satisfactory"
        if (performance >= 60) return "Needs Improvement"
        return "Poor"
    }

    // Render performance color
    const getPerformanceColor = (performance: number) => {
        if (performance >= 90) return "bg-green-500"
        if (performance >= 80) return "bg-blue-500"
        if (performance >= 70) return "bg-amber-500"
        if (performance >= 60) return "bg-orange-500"
        return "bg-red-500"
    }

    return (
        <div className="space-y-6">
            {/* Header with class selector */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center w-full sm:w-auto">
                    <Select value={selectedClass.id} onValueChange={handleClassChange}>
                        <SelectTrigger className="w-full sm:w-[250px]">
                            <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Science Stream</SelectLabel>
                                <SelectItem value="CLS001">10-A Science</SelectItem>
                                <SelectItem value="CLS002">10-B Science</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel>Humanities Stream</SelectLabel>
                                <SelectItem value="CLS003">10-C Humanities</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("overview")}>
                        <LineChart className="mr-2 h-4 w-4" />
                        Overview
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("students")}>
                        <Users className="mr-2 h-4 w-4" />
                        Students
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("timetable")}>
                        <Calendar className="mr-2 h-4 w-4" />
                        Timetable
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleExportData("class data")}>
                                <Download className="mr-2 h-4 w-4" />
                                Export Class Data
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExportData("attendance report")}>
                                <FileText className="mr-2 h-4 w-4" />
                                Export Attendance Report
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExportData("performance report")}>
                                <LineChart className="mr-2 h-4 w-4" />
                                Export Performance Report
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Share className="mr-2 h-4 w-4" />
                                Share Class Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                Class Settings
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Class profile card */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4">
                            <div className="aspect-video relative rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-black/20"></div>
                                <div className="relative z-10 text-center p-6">
                                    <h2 className="text-2xl font-bold text-white">{selectedClass.name}</h2>
                                    <p className="text-white/80">{selectedClass.academicYear}</p>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-2/4 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Grade & Section</p>
                                    <p className="font-medium">{selectedClass.grade} - {selectedClass.section}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Room Number</p>
                                    <p className="font-medium">{selectedClass.roomNumber}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Students</p>
                                    <p className="font-medium">{totalStudents} students</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Subjects</p>
                                    <p className="font-medium">{selectedClass.subjects.length} subjects</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Class Teacher</p>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        {selectedClass.classTeacher.avatar && <AvatarImage src={selectedClass.classTeacher.avatar} alt={selectedClass.classTeacher.name} />}
                                        <AvatarFallback>{selectedClass.classTeacher.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{selectedClass.classTeacher.name}</p>
                                        <p className="text-xs text-muted-foreground">{selectedClass.classTeacher.email}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="ml-auto"
                                        onClick={() => handleViewTeacherDetails(selectedClass.classTeacher)}
                                    >
                                        View Profile
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/4 space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Class Metrics</p>
                                <div className="space-y-2">
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Attendance</span>
                                            <span className="text-sm font-medium">{selectedClass.metrics.attendance}%</span>
                                        </div>
                                        <Progress
                                            value={selectedClass.metrics.attendance}
                                            className="h-1.5"
                                            indicatorClassName={selectedClass.metrics.attendance >= 90 ? "bg-green-500" : selectedClass.metrics.attendance >= 80 ? "bg-blue-500" : "bg-amber-500"}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Performance</span>
                                            <span className="text-sm font-medium">{selectedClass.metrics.performance}%</span>
                                        </div>
                                        <Progress
                                            value={selectedClass.metrics.performance}
                                            className="h-1.5"
                                            indicatorClassName={selectedClass.metrics.performance >= 90 ? "bg-green-500" : selectedClass.metrics.performance >= 80 ? "bg-blue-500" : "bg-amber-500"}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Assignment Completion</span>
                                            <span className="text-sm font-medium">{selectedClass.metrics.assignments}%</span>
                                        </div>
                                        <Progress
                                            value={selectedClass.metrics.assignments}
                                            className="h-1.5"
                                            indicatorClassName={selectedClass.metrics.assignments >= 90 ? "bg-green-500" : selectedClass.metrics.assignments >= 80 ? "bg-blue-500" : "bg-amber-500"}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            <Mail className="mr-2 h-4 w-4" />
                                            Contact
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Contact Class</DialogTitle>
                                            <DialogDescription>
                                                Send a message to all students and parents in {selectedClass.name}.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="subject">Subject</Label>
                                                <Input id="subject" placeholder="Enter message subject" />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="message">Message</Label>
                                                <Textarea id="message" placeholder="Enter your message" rows={5} />
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id="parents"
                                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/25"
                                                />
                                                <Label htmlFor="parents">Send to parents</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id="students"
                                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/25"
                                                    defaultChecked
                                                />
                                                <Label htmlFor="students">Send to students</Label>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit">
                                                <Send className="mr-2 h-4 w-4" />
                                                Send Message
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="secondary" size="sm">
                                                <FileText className="mr-2 h-4 w-4" />
                                                Report
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Generate class performance report</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Main content tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="students">Students</TabsTrigger>
                    <TabsTrigger value="subjects">Subjects</TabsTrigger>
                    <TabsTrigger value="timetable">Timetable</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                        {/* Class Summary */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Class Summary</CardTitle>
                                <CardDescription>Key metrics and statistics</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-sm font-medium mb-2">Enrollment Statistics</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">Total Students</span>
                                                <span className="text-sm font-medium">{totalStudents}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">Active Students</span>
                                                <span className="text-sm font-medium">{activeStudents}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">Male Students</span>
                                                <span className="text-sm font-medium">{maleStudents}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">Female Students</span>
                                                <span className="text-sm font-medium">{femaleStudents}</span>
                                            </div>
                                        </div>

                                        <h4 className="text-sm font-medium mt-6 mb-2">Performance Overview</h4>
                                        <div className="space-y-2">
                                            <div className="space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm">Average Attendance</span>
                                                    <span className="text-sm font-medium">{averageAttendance.toFixed(1)}%</span>
                                                </div>
                                                <Progress
                                                    value={averageAttendance}
                                                    className="h-1.5"
                                                    indicatorClassName={averageAttendance >= 90 ? "bg-green-500" : averageAttendance >= 80 ? "bg-blue-500" : "bg-amber-500"}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm">Average Performance</span>
                                                    <span className="text-sm font-medium">{averagePerformance.toFixed(1)}%</span>
                                                </div>
                                                <Progress
                                                    value={averagePerformance}
                                                    className="h-1.5"
                                                    indicatorClassName={averagePerformance >= 90 ? "bg-green-500" : averagePerformance >= 80 ? "bg-blue-500" : "bg-amber-500"}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium mb-2">Current Week Schedule</h4>
                                        <div className="space-y-3">
                                            {selectedClass.schedule.slice(0, 5).map((item) => (
                                                <div key={item.id} className="flex items-center gap-3 p-2 rounded-md border">
                                                    <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-md flex items-center justify-center">
                                                        <Clock className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-sm font-medium truncate">{item.subjectName}</p>
                                                            <p className="text-xs text-muted-foreground">{item.day}</p>
                                                        </div>
                                                        <div className="flex items-center justify-between mt-1">
                                                            <p className="text-xs text-muted-foreground">{item.startTime} - {item.endTime}</p>
                                                            <p className="text-xs text-muted-foreground">{item.roomNumber}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab("timetable")}>
                                                View Full Timetable
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Announcements */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="space-y-1">
                                    <CardTitle>Announcements</CardTitle>
                                    <CardDescription>Latest class announcements</CardDescription>
                                </div>
                                <Button size="sm">
                                    <Plus className="mr-2 h-4 w-4" />
                                    New
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {announcements.map((announcement) => (
                                        <div key={announcement.id} className="border rounded-lg p-3 space-y-2">
                                            <div className="flex items-start gap-2">
                                                <Badge
                                                    variant={announcement.priority === "high" ? "destructive" : announcement.priority === "medium" ? "default" : "outline"}
                                                    className="mt-0.5"
                                                >
                                                    {announcement.priority}
                                                </Badge>
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="text-sm font-medium">{announcement.title}</h4>
                                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{announcement.content}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Avatar className="h-5 w-5">
                                                        {announcement.authorAvatar && <AvatarImage src={announcement.authorAvatar} alt={announcement.author} />}
                                                        <AvatarFallback className="text-[10px]">{announcement.author.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                                    </Avatar>
                                                    <span>{announcement.author}</span>
                                                </div>
                                                <span>{announcement.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full" size="sm">
                                    View All Announcements
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* Subject overview */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Subject Overview</CardTitle>
                            <CardDescription>Performance metrics by subject</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {selectedClass.subjects.map((subject) => (
                                    <div
                                        key={subject.id}
                                        className="border rounded-lg p-4 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                                        onClick={() => handleViewSubjectDetails(subject)}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-medium">{subject.name}</h3>
                                            <Badge variant="outline">{subject.code}</Badge>
                                        </div>
                                        <div className="text-sm text-muted-foreground mb-3">
                                            Taught by {subject.teacherName}
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span>Assignments</span>
                                                <span className="font-medium">{subject.assignments}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span>Tests</span>
                                                <span className="font-medium">{subject.tests}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span>Resources</span>
                                                <span className="font-medium">{subject.resources.length}</span>
                                            </div>
                                        </div>
                                        <div className="mt-3 flex justify-end">
                                            <Button variant="ghost" size="sm">
                                                View Details
                                                <ExternalLink className="ml-2 h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Students Tab */}
                <TabsContent value="students" className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center w-full sm:w-auto">
                            <div className="relative w-full sm:w-[300px]">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search students..."
                                    className="w-full pl-8"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-9 w-9 p-0"
                                        onClick={() => setSearchQuery("")}
                                    >
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Clear</span>
                                    </Button>
                                )}
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                className="ml-2"
                                onClick={() => setShowFilterPanel(!showFilterPanel)}
                            >
                                <Filter className="h-4 w-4" />
                                <span className="sr-only">Filter</span>
                            </Button>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Students</SelectItem>
                                    <SelectItem value="active">Active Students</SelectItem>
                                    <SelectItem value="inactive">Inactive Students</SelectItem>
                                    <SelectItem value="transferred">Transferred Students</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add Student
                            </Button>
                        </div>
                    </div>

                    {showFilterPanel && (
                        <Card className="bg-muted/50 animate-in fade-in duration-300">
                            <CardContent className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                                        <Label className="text-xs">Performance</Label>
                                        <Select>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Any" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Any</SelectItem>
                                                <SelectItem value="excellent">Excellent (90%+)</SelectItem>
                                                <SelectItem value="good">Good (80-89%)</SelectItem>
                                                <SelectItem value="average">Average (70-79%)</SelectItem>
                                                <SelectItem value="below">Below Average (&lt; 70%)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label className="text-xs">Attendance</Label>
                                        <Select>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Any" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Any</SelectItem>
                                                <SelectItem value="excellent">Excellent (95%+)</SelectItem>
                                                <SelectItem value="good">Good (85-94%)</SelectItem>
                                                <SelectItem value="average">Average (75-84%)</SelectItem>
                                                <SelectItem value="poor">Poor (&lt; 75%)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label className="text-xs">Gender</Label>
                                        <Select>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Any" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Any</SelectItem>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label className="text-xs">Sort by</Label>
                                        <Select>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Name (A-Z)" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                                                <SelectItem value="name_desc">Name (Z-A)</SelectItem>
                                                <SelectItem value="performance_desc">Performance (High-Low)</SelectItem>
                                                <SelectItem value="performance_asc">Performance (Low-High)</SelectItem>
                                                <SelectItem value="attendance_desc">Attendance (High-Low)</SelectItem>
                                                <SelectItem value="attendance_asc">Attendance (Low-High)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <Button variant="outline" size="sm" className="mr-2">
                                        Reset Filters
                                    </Button>
                                    <Button size="sm">
                                        Apply Filters
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardContent className="p-0">
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm">
                                    <thead>
                                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                                <Button variant="ghost" size="sm" className="hover:bg-transparent p-0" onClick={() => handleStudentSort("name")}>
                                                    Student
                                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                                </Button>
                                            </th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                                <Button variant="ghost" size="sm" className="hover:bg-transparent p-0" onClick={() => handleStudentSort("attendance")}>
                                                    Attendance
                                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                                </Button>
                                            </th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                                <Button variant="ghost" size="sm" className="hover:bg-transparent p-0" onClick={() => handleStudentSort("performance")}>
                                                    Performance
                                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                                </Button>
                                            </th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedStudents.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="h-24 text-center">
                                                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                        <Search className="h-8 w-8 mb-2 opacity-40" />
                                                        <p>No students found</p>
                                                        <p className="text-sm">Try adjusting your search or filters</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            sortedStudents.map((student) => (
                                                <tr
                                                    key={student.id}
                                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer"
                                                    onClick={() => handleViewStudentDetails(student)}
                                                >
                                                    <td className="p-4 align-middle font-mono text-xs">{student.id}</td>
                                                    <td className="p-4 align-middle">
                                                        <div className="flex items-center gap-2">
                                                            <Avatar className="h-8 w-8">
                                                                {student.avatar && <AvatarImage src={student.avatar} alt={student.name} />}
                                                                <AvatarFallback>{student.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <div className="font-medium">{student.name}</div>
                                                                <div className="text-xs text-muted-foreground">{student.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <div className="flex items-center gap-2">
                                                            <Progress
                                                                value={student.attendance}
                                                                className="h-2 w-[60px]"
                                                                indicatorClassName={student.attendance >= 90 ? "bg-green-500" : student.attendance >= 80 ? "bg-blue-500" : "bg-amber-500"}
                                                            />
                                                            <span className="text-sm">{student.attendance}%</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <div className="flex items-center gap-2">
                                                            <Progress
                                                                value={student.performance}
                                                                className="h-2 w-[60px]"
                                                                indicatorClassName={getPerformanceColor(student.performance)}
                                                            />
                                                            <span className="text-sm">{student.performance}%</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        {renderStatusBadge(student.status)}
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">Open menu</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuItem onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    handleViewStudentDetails(student)
                                                                }}>
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View Details
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    Edit Student
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <MessageSquare className="mr-2 h-4 w-4" />
                                                                    Send Message
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem>
                                                                    <FileText className="mr-2 h-4 w-4" />
                                                                    Generate Report
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Subjects Tab */}
                <TabsContent value="subjects" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {selectedClass.subjects.map((subject) => (
                            <Card
                                key={subject.id}
                                className="hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer"
                                onClick={() => handleViewSubjectDetails(subject)}
                            >
                                <CardHeader className="pb-2">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle>{subject.name}</CardTitle>
                                            <CardDescription>{subject.code}</CardDescription>
                                        </div>
                                        <Badge>{subject.category}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Teacher</span>
                                            <span className="font-medium">{subject.teacherName}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Credit Hours</span>
                                            <span className="font-medium">{subject.creditHours}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Assignments</span>
                                            <span className="font-medium">{subject.assignments}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Tests</span>
                                            <span className="font-medium">{subject.tests}</span>
                                        </div>

                                        <div className="pt-2 border-t">
                                            <h4 className="text-sm font-medium mb-2">Resources</h4>
                                            <div className="space-y-1">
                                                {subject.resources.slice(0, 2).map((resource) => (
                                                    <div key={resource.id} className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            {resource.type === "document" && <FileText className="h-3.5 w-3.5 text-blue-500" />}
                                                            {resource.type === "video" && <PenTool className="h-3.5 w-3.5 text-red-500" />}
                                                            {resource.type === "link" && <ExternalLink className="h-3.5 w-3.5 text-green-500" />}
                                                            <span className="text-xs truncate">{resource.title}</span>
                                                        </div>
                                                        <Button variant="ghost" size="icon" className="h-6 w-6">
                                                            <ExternalLink className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                ))}

                                                {subject.resources.length > 2 && (
                                                    <div className="text-xs text-muted-foreground text-center mt-1">
                                                        + {subject.resources.length - 2} more resources
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button variant="outline" size="sm">
                                        <Eye className="mr-2 h-4 w-4" />
                                        View Subject
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Timetable Tab */}
                <TabsContent value="timetable" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Select value={activeDay} onValueChange={setActiveDay}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select day" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Monday">Monday</SelectItem>
                                    <SelectItem value="Tuesday">Tuesday</SelectItem>
                                    <SelectItem value="Wednesday">Wednesday</SelectItem>
                                    <SelectItem value="Thursday">Thursday</SelectItem>
                                    <SelectItem value="Friday">Friday</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="sm">
                                Day View
                            </Button>
                            <Button variant="outline" size="sm">
                                Week View
                            </Button>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <Calendar className="mr-2 h-4 w-4" />
                                Jump to Date
                            </Button>
                            <Button size="sm">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Session
                            </Button>
                        </div>
                    </div>

                    <Card>
                        <CardContent className="p-0">
                            <div className="p-4 border-b bg-muted/50">
                                <h3 className="font-medium text-lg">{activeDay}'s Schedule</h3>
                                <p className="text-sm text-muted-foreground">{selectedClass.name} - {selectedClass.roomNumber}</p>
                            </div>

                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm">
                                    <thead>
                                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[150px]">Time</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Subject</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Teacher</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Room</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[100px]">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {daySchedule.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="h-24 text-center">
                                                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                        <Calendar className="h-8 w-8 mb-2 opacity-40" />
                                                        <p>No schedule found for {activeDay}</p>
                                                        <Button variant="link" className="mt-2">
                                                            Add a new session
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            daySchedule.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer"
                                                >
                                                    <td className="p-4 align-middle font-medium">
                                                        {item.startTime} - {item.endTime}
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        {item.subjectName}
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        {item.teacherName}
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        {item.roomNumber}
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        {renderScheduleTypeBadge(item.type)}
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">Open menu</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuItem>
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    Edit Session
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <BookOpen className="mr-2 h-4 w-4" />
                                                                    Lesson Plan
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem className="text-red-600">
                                                                    <X className="mr-2 h-4 w-4" />
                                                                    Cancel Session
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Student Detail Sheet */}
            <Sheet open={studentDetailOpen} onOpenChange={setStudentDetailOpen}>
                <SheetContent className="sm:max-w-xl overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Student Profile</SheetTitle>
                        <SheetDescription>
                            View and manage student information
                        </SheetDescription>
                    </SheetHeader>

                    {selectedStudent && (
                        <div className="py-6 space-y-6">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20 border-2 border-primary">
                                    {selectedStudent.avatar && <AvatarImage src={selectedStudent.avatar} alt={selectedStudent.name} />}
                                    <AvatarFallback>{selectedStudent.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                                    <p className="text-sm text-muted-foreground">{selectedStudent.email}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                            {selectedStudent.id}
                                        </Badge>
                                        {renderStatusBadge(selectedStudent.status)}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium">Grade & Section</p>
                                    <p className="text-sm text-muted-foreground">{selectedClass.grade} - {selectedClass.section}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Gender</p>
                                    <p className="text-sm text-muted-foreground">{selectedStudent.gender}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Enrollment Date</p>
                                    <p className="text-sm text-muted-foreground">{selectedStudent.enrollmentDate}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Status</p>
                                    <p className="text-sm text-muted-foreground">{selectedStudent.status.charAt(0).toUpperCase() + selectedStudent.status.slice(1)}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium mb-2">Academic Performance</h4>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Overall Performance</span>
                                            <div className="flex items-center gap-1">
                                                <span className="text-sm font-medium">{selectedStudent.performance}%</span>
                                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                    {renderPerformanceLevel(selectedStudent.performance)}
                                                </Badge>
                                            </div>
                                        </div>
                                        <Progress
                                            value={selectedStudent.performance}
                                            className="h-2"
                                            indicatorClassName={getPerformanceColor(selectedStudent.performance)}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Attendance</span>
                                            <span className="text-sm font-medium">{selectedStudent.attendance}%</span>
                                        </div>
                                        <Progress
                                            value={selectedStudent.attendance}
                                            className="h-2"
                                            indicatorClassName={selectedStudent.attendance >= 90 ? "bg-green-500" : selectedStudent.attendance >= 80 ? "bg-blue-500" : "bg-amber-500"}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium mb-2">Parent Information</h4>
                                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Parent/Guardian Name</span>
                                        <span className="text-sm font-medium">{selectedStudent.parentName}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Contact Number</span>
                                        <span className="text-sm font-medium">{selectedStudent.parentContact}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button variant="outline">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Generate Report
                                </Button>
                                <Button>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Profile
                                </Button>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>

            {/* Teacher Detail Sheet */}
            <Sheet open={teacherDetailOpen} onOpenChange={setTeacherDetailOpen}>
                <SheetContent className="sm:max-w-xl overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Teacher Profile</SheetTitle>
                        <SheetDescription>
                            View teacher information and performance
                        </SheetDescription>
                    </SheetHeader>

                    {selectedTeacher && (
                        <div className="py-6 space-y-6">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20 border-2 border-primary">
                                    {selectedTeacher.avatar && <AvatarImage src={selectedTeacher.avatar} alt={selectedTeacher.name} />}
                                    <AvatarFallback>{selectedTeacher.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-xl font-bold">{selectedTeacher.name}</h3>
                                    <p className="text-sm text-muted-foreground">{selectedTeacher.email}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex items-center">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={cn(
                                                        "h-4 w-4",
                                                        i < Math.floor(selectedTeacher.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm">{selectedTeacher.rating}/5</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium">Qualification</p>
                                    <p className="text-sm text-muted-foreground">{selectedTeacher.qualification}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Specialization</p>
                                    <p className="text-sm text-muted-foreground">{selectedTeacher.specialization}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Join Date</p>
                                    <p className="text-sm text-muted-foreground">{selectedTeacher.joinDate}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Experience</p>
                                    <p className="text-sm text-muted-foreground">{selectedTeacher.experience} years</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium mb-2">Biography</h4>
                                <div className="bg-muted/50 rounded-lg p-4">
                                    <p className="text-sm">{selectedTeacher.bio}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium mb-2">Subjects Taught</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedTeacher.subjects.map((subject) => (
                                        <Badge key={subject} variant="outline" className="bg-primary/10">
                                            {subject}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button variant="outline">
                                    <Mail className="mr-2 h-4 w-4" />
                                    Contact
                                </Button>
                                <Button>
                                    <Calendar className="mr-2 h-4 w-4" />
                                    View Schedule
                                </Button>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>

            {/* Subject Detail Sheet */}
            <Sheet open={subjectDetailOpen} onOpenChange={setSubjectDetailOpen}>
                <SheetContent className="sm:max-w-xl overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Subject Details</SheetTitle>
                        <SheetDescription>
                            View subject information and curriculum
                        </SheetDescription>
                    </SheetHeader>

                    {selectedSubject && (
                        <div className="py-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold">{selectedSubject.name}</h3>
                                    <p className="text-sm text-muted-foreground">{selectedSubject.code}</p>
                                </div>
                                <Badge className="bg-primary/10 text-primary border-primary/20">
                                    {selectedSubject.category}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium">Teacher</p>
                                    <p className="text-sm text-muted-foreground">{selectedSubject.teacherName}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Credit Hours</p>
                                    <p className="text-sm text-muted-foreground">{selectedSubject.creditHours}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Assignments</p>
                                    <p className="text-sm text-muted-foreground">{selectedSubject.assignments}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Tests</p>
                                    <p className="text-sm text-muted-foreground">{selectedSubject.tests}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium mb-2">Description</h4>
                                <div className="bg-muted/50 rounded-lg p-4">
                                    <p className="text-sm">{selectedSubject.description}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium mb-2">Syllabus</h4>
                                <div className="bg-muted/50 rounded-lg p-4">
                                    <ol className="list-decimal pl-5 space-y-1">
                                        {selectedSubject.syllabus.map((item, index) => (
                                            <li key={index} className="text-sm">{item}</li>
                                        ))}
                                    </ol>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button variant="outline">
                                    <Shield className="mr-2 h-4 w-4" />
                                    Manage Access
                                </Button>
                                <Button>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Subject
                                </Button>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    )
}

