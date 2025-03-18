"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
    AlertCircle,
    Award,
    Calendar,
    Camera,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Clock,
    Download,
    Eye,
    FileText,
    Filter,
    Fingerprint,
    Info,
    Lock,
    MapPin,
    QrCode,
    Settings,
    Smartphone,
    TrendingUp,
    Trophy,
    User,
    UserCheck,
    X,
    Zap,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

// Types
interface Student {
    id: string
    name: string
    email: string
    phone: string
    avatar?: string
    status: "present" | "absent" | "late" | "excused" | "pending"
    checkInTime?: string
    location?: string
    method?: "qr" | "face" | "geo" | "manual" | "fingerprint"
    notes?: string
    streak: number
    attendanceRate: number
    punctualityRate: number
    lastActive: string
}

interface Course {
    id: string
    name: string
    instructor: string
    schedule: string
    room: string
    attendanceRequired: boolean
}

interface AttendanceRecord {
    date: string
    status: "present" | "absent" | "late" | "excused"
    checkInTime?: string
    method?: string
    location?: string
    notes?: string
}

interface Achievement {
    id: string
    title: string
    description: string
    icon: React.ReactNode
    earned: boolean
    progress?: number
    date?: string
}

// Mock data
const CURRENT_STUDENT: Student = {
    id: "STU12345",
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=128&width=128",
    status: "pending",
    streak: 15,
    attendanceRate: 94,
    punctualityRate: 97,
    lastActive: "2 hours ago",
}

const COURSES: Course[] = [
    {
        id: "CS101",
        name: "Introduction to Computer Science",
        instructor: "Dr. Sarah Miller",
        schedule: "Mon, Wed, Fri 10:00 - 11:30 AM",
        room: "Tech Building 305",
        attendanceRequired: true,
    },
    {
        id: "MATH201",
        name: "Advanced Calculus",
        instructor: "Prof. Robert Chen",
        schedule: "Tue, Thu 1:00 - 2:30 PM",
        room: "Science Hall 210",
        attendanceRequired: true,
    },
    {
        id: "ENG150",
        name: "Academic Writing",
        instructor: "Dr. Emily Wilson",
        schedule: "Mon, Wed 3:00 - 4:30 PM",
        room: "Humanities 110",
        attendanceRequired: true,
    },
    {
        id: "PHYS202",
        name: "Electricity and Magnetism",
        instructor: "Prof. James Thompson",
        schedule: "Tue, Thu 9:00 - 10:30 AM",
        room: "Science Hall 305",
        attendanceRequired: true,
    },
    {
        id: "BIO101",
        name: "Introduction to Biology",
        instructor: "Dr. Lisa Rodriguez",
        schedule: "Wed, Fri 2:00 - 3:30 PM",
        room: "Life Sciences 201",
        attendanceRequired: false,
    },
]

const ATTENDANCE_HISTORY: AttendanceRecord[] = [
    { date: "2023-10-16", status: "present", checkInTime: "09:58 AM", method: "qr", location: "Tech Building 305" },
    { date: "2023-10-14", status: "present", checkInTime: "09:55 AM", method: "face", location: "Tech Building 305" },
    {
        date: "2023-10-13",
        status: "late",
        checkInTime: "10:12 AM",
        method: "geo",
        location: "Tech Building 305",
        notes: "Traffic delay",
    },
    { date: "2023-10-11", status: "present", checkInTime: "09:50 AM", method: "qr", location: "Tech Building 305" },
    { date: "2023-10-09", status: "present", checkInTime: "09:57 AM", method: "face", location: "Tech Building 305" },
    { date: "2023-10-07", status: "absent", notes: "Medical appointment" },
    { date: "2023-10-06", status: "present", checkInTime: "09:59 AM", method: "qr", location: "Tech Building 305" },
    { date: "2023-10-04", status: "present", checkInTime: "09:52 AM", method: "geo", location: "Tech Building 305" },
    { date: "2023-10-02", status: "excused", notes: "University event" },
    { date: "2023-09-30", status: "present", checkInTime: "09:56 AM", method: "face", location: "Tech Building 305" },
    { date: "2023-09-28", status: "present", checkInTime: "09:54 AM", method: "qr", location: "Tech Building 305" },
    { date: "2023-09-26", status: "present", checkInTime: "09:58 AM", method: "geo", location: "Tech Building 305" },
    {
        date: "2023-09-24",
        status: "late",
        checkInTime: "10:15 AM",
        method: "manual",
        location: "Tech Building 305",
        notes: "Public transport delay",
    },
    { date: "2023-09-22", status: "present", checkInTime: "09:51 AM", method: "qr", location: "Tech Building 305" },
    { date: "2023-09-20", status: "present", checkInTime: "09:53 AM", method: "face", location: "Tech Building 305" },
]

const ACHIEVEMENTS: Achievement[] = [
    {
        id: "perfect-month",
        title: "Perfect Month",
        description: "Attend all classes for an entire month",
        icon: <Calendar className="h-6 w-6 text-green-500" />,
        earned: true,
        date: "September 2023",
    },
    {
        id: "early-bird",
        title: "Early Bird",
        description: "Arrive early to class 10 times",
        icon: <Clock className="h-6 w-6 text-blue-500" />,
        earned: true,
        date: "October 2023",
    },
    {
        id: "tech-savvy",
        title: "Tech Savvy",
        description: "Use all attendance marking methods",
        icon: <Smartphone className="h-6 w-6 text-purple-500" />,
        earned: true,
        date: "October 2023",
    },
    {
        id: "attendance-streak",
        title: "Attendance Streak",
        description: "Attend 20 consecutive classes",
        icon: <Zap className="h-6 w-6 text-yellow-500" />,
        earned: false,
        progress: 75,
    },
    {
        id: "perfect-semester",
        title: "Perfect Semester",
        description: "100% attendance for a full semester",
        icon: <Trophy className="h-6 w-6 text-amber-500" />,
        earned: false,
        progress: 60,
    },
    {
        id: "punctuality-master",
        title: "Punctuality Master",
        description: "Be on time for 50 classes",
        icon: <Award className="h-6 w-6 text-red-500" />,
        earned: false,
        progress: 82,
    },
]

// Helper functions
const getStatusColor = (status: string) => {
    switch (status) {
        case "present":
            return "bg-green-500"
        case "absent":
            return "bg-red-500"
        case "late":
            return "bg-amber-500"
        case "excused":
            return "bg-blue-500"
        case "pending":
            return "bg-gray-300"
        default:
            return "bg-gray-300"
    }
}

const getStatusBadge = (status: string) => {
    switch (status) {
        case "present":
            return (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Present
                </Badge>
            )
        case "absent":
            return (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Absent
                </Badge>
            )
        case "late":
            return (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    Late
                </Badge>
            )
        case "excused":
            return (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Excused
                </Badge>
            )
        case "pending":
            return (
                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    Pending
                </Badge>
            )
        default:
            return null
    }
}

const getMethodIcon = (method?: string) => {
    switch (method) {
        case "qr":
            return <QrCode className="h-4 w-4 text-purple-500" />
        case "face":
            return <Camera className="h-4 w-4 text-blue-500" />
        case "geo":
            return <MapPin className="h-4 w-4 text-green-500" />
        case "manual":
            return <User className="h-4 w-4 text-gray-500" />
        case "fingerprint":
            return <Fingerprint className="h-4 w-4 text-indigo-500" />
        default:
            return null
    }
}

export default function StudentAttendanceSystem() {
    const { toast } = useToast()
    const [student, setStudent] = useState<Student>(CURRENT_STUDENT)
    const [selectedCourse, setSelectedCourse] = useState<Course>(COURSES[0])
    const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>(ATTENDANCE_HISTORY)
    const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS)
    const [activeTab, setActiveTab] = useState("dashboard")
    const [isMarkingAttendance, setIsMarkingAttendance] = useState(false)
    const [isQRDialogOpen, setIsQRDialogOpen] = useState(false)
    const [isFaceRecognitionActive, setIsFaceRecognitionActive] = useState(false)
    const [isGeoVerificationActive, setIsGeoVerificationActive] = useState(false)
    const [isFingerprintActive, setIsFingerprintActive] = useState(false)
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0])
    const [calendarView, setCalendarView] = useState<"month" | "week" | "day">("month")
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [notificationsEnabled, setNotificationsEnabled] = useState(true)
    const [locationEnabled, setLocationEnabled] = useState(true)
    const [biometricsEnabled, setBiometricsEnabled] = useState(true)
    const [darkModeEnabled, setDarkModeEnabled] = useState(false)
    const [isAttendanceDetailsOpen, setIsAttendanceDetailsOpen] = useState(false)
    const [selectedAttendanceRecord, setSelectedAttendanceRecord] = useState<AttendanceRecord | null>(null)
    const videoRef = useRef<HTMLVideoElement>(null)

    // Calculate attendance statistics
    const totalClasses = attendanceHistory.length
    const presentClasses = attendanceHistory.filter((record) => record.status === "present").length
    const lateClasses = attendanceHistory.filter((record) => record.status === "late").length
    const absentClasses = attendanceHistory.filter((record) => record.status === "absent").length
    const excusedClasses = attendanceHistory.filter((record) => record.status === "excused").length
    const attendanceRate = totalClasses > 0 ? ((presentClasses + lateClasses) / totalClasses) * 100 : 0
    const punctualityRate = presentClasses + lateClasses > 0 ? (presentClasses / (presentClasses + lateClasses)) * 100 : 0

    // Effect for dark mode
    useEffect(() => {
        if (darkModeEnabled) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [darkModeEnabled])

    // Handle QR code scanning
    const handleQRCodeScan = () => {
        setIsQRDialogOpen(false)
        setIsMarkingAttendance(true)

        // Simulate QR code scanning process
        setTimeout(() => {
            markAttendance("qr")
        }, 2000)
    }

    // Handle face recognition
    const handleFaceRecognition = () => {
        setIsFaceRecognitionActive(true)

        // Simulate camera access
        if (videoRef.current) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream
                    }
                })
                .catch((err) => {
                    console.error("Error accessing camera:", err)
                    toast({
                        title: "Camera Access Error",
                        description: "Unable to access camera for face recognition.",
                        variant: "destructive",
                    })
                    setIsFaceRecognitionActive(false)
                })
        }

        // Simulate face recognition process
        setTimeout(() => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream
                stream.getTracks().forEach((track) => track.stop())
            }
            setIsFaceRecognitionActive(false)
            markAttendance("face")
        }, 3000)
    }

    // Handle geolocation verification
    const handleGeoVerification = () => {
        setIsGeoVerificationActive(true)

        // Simulate geolocation verification
        setTimeout(() => {
            setIsGeoVerificationActive(false)
            markAttendance("geo")
        }, 2500)
    }

    // Handle fingerprint verification
    const handleFingerprintVerification = () => {
        setIsFingerprintActive(true)

        // Simulate fingerprint verification
        setTimeout(() => {
            setIsFingerprintActive(false)
            markAttendance("fingerprint")
        }, 2000)
    }

    // Mark attendance
    const markAttendance = (method: "qr" | "face" | "geo" | "manual" | "fingerprint") => {
        setIsMarkingAttendance(false)

        // Update student status
        const updatedStudent = {
            ...student,
            status: "present" as const,
            checkInTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            method,
            location: selectedCourse.room,
        }
        setStudent(updatedStudent)

        // Add to attendance history
        const newRecord: AttendanceRecord = {
            date: new Date().toISOString().split("T")[0],
            status: "present",
            checkInTime: updatedStudent.checkInTime,
            method,
            location: selectedCourse.room,
        }

        // Check if there's already a record for today
        const todayRecordIndex = attendanceHistory.findIndex((record) => record.date === newRecord.date)
        if (todayRecordIndex >= 0) {
            const updatedHistory = [...attendanceHistory]
            updatedHistory[todayRecordIndex] = newRecord
            setAttendanceHistory(updatedHistory)
        } else {
            setAttendanceHistory([newRecord, ...attendanceHistory])
        }

        // Check for achievements
        checkForAchievements(method)

        toast({
            title: "Attendance Marked",
            description: `You've been marked present for ${selectedCourse.name}`,
        })
    }

    // Check for new achievements
    const checkForAchievements = (method: string) => {
        const updatedAchievements = [...achievements]

        // Check for "Tech Savvy" achievement
        const techSavvyAchievement = updatedAchievements.find((a) => a.id === "tech-savvy")
        if (techSavvyAchievement && !techSavvyAchievement.earned) {
            const usedMethods = new Set(attendanceHistory.map((record) => record.method).filter(Boolean))
            usedMethods.add(method)

            if (usedMethods.size >= 3) {
                const index = updatedAchievements.findIndex((a) => a.id === "tech-savvy")
                updatedAchievements[index] = {
                    ...techSavvyAchievement,
                    earned: true,
                    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" }),
                }

                toast({
                    title: "Achievement Unlocked!",
                    description: "Tech Savvy: You've used all attendance marking methods!",
                })
            }
        }

        // Update streak and check for streak achievement
        const streakAchievement = updatedAchievements.find((a) => a.id === "attendance-streak")
        if (streakAchievement) {
            const newStreak = student.streak + 1
            setStudent({ ...student, streak: newStreak })

            if (newStreak >= 20 && !streakAchievement.earned) {
                const index = updatedAchievements.findIndex((a) => a.id === "attendance-streak")
                updatedAchievements[index] = {
                    ...streakAchievement,
                    earned: true,
                    progress: 100,
                    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" }),
                }

                toast({
                    title: "Achievement Unlocked!",
                    description: "Attendance Streak: You've attended 20 consecutive classes!",
                })
            } else if (!streakAchievement.earned) {
                const index = updatedAchievements.findIndex((a) => a.id === "attendance-streak")
                updatedAchievements[index] = {
                    ...streakAchievement,
                    progress: Math.min(100, (newStreak / 20) * 100),
                }
            }
        }

        setAchievements(updatedAchievements)
    }

    // View attendance details
    const viewAttendanceDetails = (record: AttendanceRecord) => {
        setSelectedAttendanceRecord(record)
        setIsAttendanceDetailsOpen(true)
    }

    // Generate calendar days
    const generateCalendarDays = () => {
        const firstDay = new Date(currentYear, currentMonth, 1)
        const lastDay = new Date(currentYear, currentMonth + 1, 0)
        const daysInMonth = lastDay.getDate()
        const startingDayOfWeek = firstDay.getDay()

        const days = []

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null)
        }

        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const date = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`
            const record = attendanceHistory.find((r) => r.date === date)
            days.push({ day: i, date, record })
        }

        return days
    }

    // Navigate to previous month
    const goToPreviousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11)
            setCurrentYear(currentYear - 1)
        } else {
            setCurrentMonth(currentMonth - 1)
        }
    }

    // Navigate to next month
    const goToNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0)
            setCurrentYear(currentYear + 1)
        } else {
            setCurrentMonth(currentMonth + 1)
        }
    }

    // Get month name
    const getMonthName = (month: number) => {
        return new Date(2000, month, 1).toLocaleString("default", { month: "long" })
    }

    return (
        <div className={cn("space-y-6", darkModeEnabled ? "dark" : "")}>
            {/* Header with student info and actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-primary">
                        {student.avatar && <AvatarImage src={student.avatar} alt={student.name} />}
                        <AvatarFallback>
                            {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-xl font-bold">{student.name}</h2>
                        <p className="text-sm text-muted-foreground">
                            {student.id} • Last active: {student.lastActive}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Select
                        value={selectedCourse.id}
                        onValueChange={(value) => setSelectedCourse(COURSES.find((c) => c.id === value) || COURSES[0])}
                    >
                        <SelectTrigger className="w-full sm:w-[220px]">
                            <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                            {COURSES.map((course) => (
                                <SelectItem key={course.id} value={course.id}>
                                    {course.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button variant="outline" size="icon" onClick={() => setIsSettingsOpen(true)}>
                        <Settings className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Course info card */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-2/3 space-y-4">
                            <div>
                                <h3 className="text-xl font-bold text-primary">{selectedCourse.name}</h3>
                                <p className="text-sm text-muted-foreground">{selectedCourse.id}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Instructor</p>
                                    <p className="font-medium">{selectedCourse.instructor}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Room</p>
                                    <p className="font-medium">{selectedCourse.room}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Schedule</p>
                                    <p className="font-medium">{selectedCourse.schedule}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Attendance Required</p>
                                    <p className="font-medium">{selectedCourse.attendanceRequired ? "Yes" : "No"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-1/3 flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Today&apos;s Status</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className={cn("w-3 h-3 rounded-full", getStatusColor(student.status))}></div>
                                        {getStatusBadge(student.status)}
                                    </div>
                                </div>

                                {student.checkInTime && (
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">Check-in Time</p>
                                        <p className="font-medium">{student.checkInTime}</p>
                                    </div>
                                )}
                            </div>

                            {student.status === "pending" ? (
                                <div className="mt-4">
                                    <Button className="w-full" onClick={() => setIsMarkingAttendance(true)}>
                                        <UserCheck className="mr-2 h-4 w-4" />
                                        Mark Attendance
                                    </Button>
                                </div>
                            ) : (
                                <div className="mt-4 bg-muted/50 p-3 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        {student.method && getMethodIcon(student.method)}
                                        <p className="text-sm">
                                            {student.method === "qr" && "Marked via QR Code"}
                                            {student.method === "face" && "Verified with Face Recognition"}
                                            {student.method === "geo" && "Verified with Geolocation"}
                                            {student.method === "manual" && "Manually Recorded"}
                                            {student.method === "fingerprint" && "Verified with Fingerprint"}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Main content tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>

                {/* Dashboard Tab */}
                <TabsContent value="dashboard" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-4">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Attendance Rate</p>
                                        <p className="text-2xl font-bold">{student.attendanceRate}%</p>
                                    </div>
                                    <div className="rounded-full bg-green-100 p-3">
                                        <UserCheck className="h-5 w-5 text-green-600" />
                                    </div>
                                </div>
                                <Progress value={student.attendanceRate} className="h-1.5 mt-4" />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Punctuality Rate</p>
                                        <p className="text-2xl font-bold">{student.punctualityRate}%</p>
                                    </div>
                                    <div className="rounded-full bg-blue-100 p-3">
                                        <Clock className="h-5 w-5 text-blue-600" />
                                    </div>
                                </div>
                                <Progress value={student.punctualityRate} className="h-1.5 mt-4" />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Current Streak</p>
                                        <p className="text-2xl font-bold">{student.streak} days</p>
                                    </div>
                                    <div className="rounded-full bg-amber-100 p-3">
                                        <Zap className="h-5 w-5 text-amber-600" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 mt-4">
                                    {Array.from({ length: 7 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={cn("h-1.5 flex-1 rounded-full", i < student.streak % 7 ? "bg-amber-500" : "bg-muted")}
                                        ></div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Achievements</p>
                                        <p className="text-2xl font-bold">
                                            {achievements.filter((a) => a.earned).length}/{achievements.length}
                                        </p>
                                    </div>
                                    <div className="rounded-full bg-purple-100 p-3">
                                        <Trophy className="h-5 w-5 text-purple-600" />
                                    </div>
                                </div>
                                <Progress
                                    value={(achievements.filter((a) => a.earned).length / achievements.length) * 100}
                                    className="h-1.5 mt-4"
                                    indicatorClassName="bg-purple-500"
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Attendance</CardTitle>
                                <CardDescription>Your last 5 attendance records</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {attendanceHistory.slice(0, 5).map((record, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                                            onClick={() => viewAttendanceDetails(record)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={cn("w-3 h-3 rounded-full", getStatusColor(record.status))}></div>
                                                <div>
                                                    <p className="font-medium">
                                                        {new Date(record.date).toLocaleDateString("en-US", {
                                                            weekday: "short",
                                                            month: "short",
                                                            day: "numeric",
                                                        })}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {record.checkInTime
                                                            ? record.checkInTime
                                                            : record.status === "absent"
                                                                ? "Absent"
                                                                : "Excused"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {record.method && getMethodIcon(record.method)}
                                                {getStatusBadge(record.status)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full" onClick={() => setActiveTab("history")}>
                                    View All Records
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Attendance Insights</CardTitle>
                                <CardDescription>AI-generated attendance patterns and recommendations</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="rounded-lg border p-4 bg-muted/50">
                                        <div className="flex items-start gap-4">
                                            <div className="rounded-full bg-blue-100 p-2 mt-0.5">
                                                <TrendingUp className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium">Attendance Pattern</h4>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Your attendance has improved by 5% compared to last month. Keep up the good work!
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border p-4 bg-muted/50">
                                        <div className="flex items-start gap-4">
                                            <div className="rounded-full bg-amber-100 p-2 mt-0.5">
                                                <Clock className="h-4 w-4 text-amber-600" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium">Punctuality Insight</h4>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    You tend to arrive later on Mondays. Consider leaving 10 minutes earlier to improve your
                                                    punctuality.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border p-4 bg-muted/50">
                                        <div className="flex items-start gap-4">
                                            <div className="rounded-full bg-green-100 p-2 mt-0.5">
                                                <CheckCircle className="h-4 w-4 text-green-600" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium">Achievement Progress</h4>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    You&apos;re 5 days away from unlocking the &quot;Attendance Streak&quot; achievement. Don&apos;t break your
                                                    streak!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* History Tab */}
                <TabsContent value="history" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Attendance History</CardTitle>
                                    <CardDescription>Complete record of your attendance</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm">
                                        <Filter className="mr-2 h-4 w-4" />
                                        Filter
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Download className="mr-2 h-4 w-4" />
                                        Export
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-lg border overflow-hidden">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-muted/50">
                                            <th className="text-left p-3 font-medium">Date</th>
                                            <th className="text-left p-3 font-medium">Status</th>
                                            <th className="text-left p-3 font-medium">Check-in Time</th>
                                            <th className="text-left p-3 font-medium">Method</th>
                                            <th className="text-left p-3 font-medium">Location</th>
                                            <th className="text-left p-3 font-medium">Notes</th>
                                            <th className="text-left p-3 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attendanceHistory.map((record, index) => (
                                            <tr key={index} className="border-t hover:bg-muted/50 transition-colors">
                                                <td className="p-3">
                                                    {new Date(record.date).toLocaleDateString("en-US", {
                                                        weekday: "short",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </td>
                                                <td className="p-3">{getStatusBadge(record.status)}</td>
                                                <td className="p-3">{record.checkInTime || "-"}</td>
                                                <td className="p-3">
                                                    {record.method ? (
                                                        <div className="flex items-center gap-1">
                                                            {getMethodIcon(record.method)}
                                                            <span className="text-sm capitalize">{record.method}</span>
                                                        </div>
                                                    ) : (
                                                        "-"
                                                    )}
                                                </td>
                                                <td className="p-3">{record.location || "-"}</td>
                                                <td className="p-3">{record.notes || "-"}</td>
                                                <td className="p-3">
                                                    <Button variant="ghost" size="sm" onClick={() => viewAttendanceDetails(record)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <div className="text-sm text-muted-foreground">
                                Showing <strong>{attendanceHistory.length}</strong> records
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" disabled>
                                    Previous
                                </Button>
                                <Button variant="outline" size="sm" disabled>
                                    Next
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Attendance Statistics</CardTitle>
                            <CardDescription>Breakdown of your attendance records</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-medium mb-4">Status Distribution</h4>
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                                    <span className="text-sm">Present</span>
                                                </div>
                                                <span className="text-sm font-medium">
                                                    {presentClasses} ({Math.round((presentClasses / totalClasses) * 100)}%)
                                                </span>
                                            </div>
                                            <Progress
                                                value={(presentClasses / totalClasses) * 100}
                                                className="h-2"
                                                indicatorClassName="bg-green-500"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                                    <span className="text-sm">Late</span>
                                                </div>
                                                <span className="text-sm font-medium">
                                                    {lateClasses} ({Math.round((lateClasses / totalClasses) * 100)}%)
                                                </span>
                                            </div>
                                            <Progress
                                                value={(lateClasses / totalClasses) * 100}
                                                className="h-2"
                                                indicatorClassName="bg-amber-500"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                    <span className="text-sm">Absent</span>
                                                </div>
                                                <span className="text-sm font-medium">
                                                    {absentClasses} ({Math.round((absentClasses / totalClasses) * 100)}%)
                                                </span>
                                            </div>
                                            <Progress
                                                value={(absentClasses / totalClasses) * 100}
                                                className="h-2"
                                                indicatorClassName="bg-red-500"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                                    <span className="text-sm">Excused</span>
                                                </div>
                                                <span className="text-sm font-medium">
                                                    {excusedClasses} ({Math.round((excusedClasses / totalClasses) * 100)}%)
                                                </span>
                                            </div>
                                            <Progress
                                                value={(excusedClasses / totalClasses) * 100}
                                                className="h-2"
                                                indicatorClassName="bg-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-4">Check-in Methods</h4>
                                    <div className="space-y-4">
                                        {["qr", "face", "geo", "manual", "fingerprint"].map((method) => {
                                            const count = attendanceHistory.filter((r) => r.method === method).length
                                            const percentage = (count / attendanceHistory.filter((r) => r.method).length) * 100 || 0

                                            return (
                                                <div key={method} className="space-y-1">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            {getMethodIcon(method)}
                                                            <span className="text-sm capitalize">{method}</span>
                                                        </div>
                                                        <span className="text-sm font-medium">
                                                            {count} ({Math.round(percentage)}%)
                                                        </span>
                                                    </div>
                                                    <Progress value={percentage} className="h-2" />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Calendar Tab */}
                <TabsContent value="calendar" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Attendance Calendar</CardTitle>
                                    <CardDescription>Visual representation of your attendance</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <span className="text-sm font-medium">
                                        {getMonthName(currentMonth)} {currentYear}
                                    </span>
                                    <Button variant="outline" size="sm" onClick={goToNextMonth}>
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-7 gap-1">
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                    <div key={day} className="text-center p-2 text-sm font-medium">
                                        {day}
                                    </div>
                                ))}

                                {generateCalendarDays().map((day, index) => (
                                    <div
                                        key={index}
                                        className={cn("aspect-square p-1", day ? "cursor-pointer" : "")}
                                        onClick={() => day && viewAttendanceDetails(day.record || { date: day.date, status: "absent" })}
                                    >
                                        {day && (
                                            <div
                                                className={cn(
                                                    "h-full w-full rounded-md flex flex-col items-center justify-center",
                                                    day.record ? `${getStatusColor(day.record.status)} bg-opacity-20` : "hover:bg-muted",
                                                    day.date === selectedDate && "ring-2 ring-primary",
                                                )}
                                            >
                                                <span className="text-sm">{day.day}</span>
                                                {day.record && (
                                                    <div className={cn("w-2 h-2 rounded-full mt-1", getStatusColor(day.record.status))}></div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span>Present</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                    <span>Late</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <span>Absent</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                    <span>Excused</span>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Attendance Patterns</CardTitle>
                            <CardDescription>Analysis of your attendance habits</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-medium mb-3">Day of Week Analysis</h4>
                                    <div className="grid grid-cols-7 gap-2">
                                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => {
                                            // Calculate mock attendance rate for each day
                                            const rate = Math.floor(Math.random() * 30) + 70

                                            return (
                                                <div key={day} className="flex flex-col items-center">
                                                    <div className="text-sm mb-2">{day}</div>
                                                    <div className="relative w-full h-24">
                                                        <div
                                                            className={cn(
                                                                "absolute bottom-0 w-full rounded-t-sm",
                                                                rate > 90 ? "bg-green-500" : rate > 80 ? "bg-blue-500" : "bg-amber-500",
                                                            )}
                                                            style={{ height: `${rate}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="text-xs mt-1">{rate}%</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-3">Time of Arrival</h4>
                                    <div className="space-y-2">
                                        {["Before 9:45", "9:45 - 9:55", "9:55 - 10:00", "10:00 - 10:05", "After 10:05"].map(
                                            (timeRange, index) => {
                                                // Calculate mock percentages for arrival times
                                                const percentage = [15, 35, 30, 15, 5][index]

                                                return (
                                                    <div key={timeRange} className="space-y-1">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm">{timeRange}</span>
                                                            <span className="text-sm font-medium">{percentage}%</span>
                                                        </div>
                                                        <Progress
                                                            value={percentage}
                                                            className="h-2"
                                                            indicatorClassName={
                                                                index < 3 ? "bg-green-500" : index === 3 ? "bg-amber-500" : "bg-red-500"
                                                            }
                                                        />
                                                    </div>
                                                )
                                            },
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Achievements Tab */}
                <TabsContent value="achievements" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                        {achievements.map((achievement) => (
                            <Card
                                key={achievement.id}
                                className={cn("transition-all", achievement.earned ? "border-primary/30 bg-primary/5" : "opacity-70")}
                            >
                                <CardContent className="pt-6">
                                    <div className="flex flex-col items-center text-center">
                                        <div className={cn("rounded-full p-3 mb-4", achievement.earned ? "bg-primary/20" : "bg-muted")}>
                                            {achievement.icon}
                                        </div>
                                        <h3 className="font-bold mb-1">{achievement.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>

                                        {achievement.earned ? (
                                            <Badge className="bg-primary/20 text-primary border-primary/10">Earned {achievement.date}</Badge>
                                        ) : (
                                            <div className="w-full space-y-1">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span>Progress</span>
                                                    <span>{achievement.progress}%</span>
                                                </div>
                                                <Progress value={achievement.progress} className="h-1.5" />
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Achievement Insights</CardTitle>
                            <CardDescription>Your progress and upcoming achievements</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-medium mb-3">Achievement Progress</h4>
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-24 rounded-full border-4 border-primary/30 flex items-center justify-center relative">
                                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="8"
                                                    strokeDasharray="251.2"
                                                    strokeDashoffset={
                                                        251.2 - 251.2 * (achievements.filter((a) => a.earned).length / achievements.length)
                                                    }
                                                    className="text-primary"
                                                    transform="rotate(-90 50 50)"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="text-xl font-bold">{achievements.filter((a) => a.earned).length}</div>
                                                    <div className="text-xs text-muted-foreground">of {achievements.length}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <p className="text-sm mb-2">
                                                You&apos;ve earned {achievements.filter((a) => a.earned).length} out of {achievements.length}{" "}
                                                achievements.
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Keep up your attendance streak to unlock more achievements and rewards!
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-3">Next Achievement</h4>
                                    {achievements.some((a) => !a.earned) ? (
                                        <div className="rounded-lg border p-4 bg-muted/50">
                                            <div className="flex items-start gap-4">
                                                <div className="rounded-full bg-primary/20 p-2">
                                                    {achievements.find((a) => !a.earned)?.icon}
                                                </div>
                                                <div>
                                                    <h4 className="font-medium">{achievements.find((a) => !a.earned)?.title}</h4>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {achievements.find((a) => !a.earned)?.description}
                                                    </p>
                                                    <div className="w-full space-y-1 mt-3">
                                                        <div className="flex items-center justify-between text-xs">
                                                            <span>Progress</span>
                                                            <span>{achievements.find((a) => !a.earned)?.progress}%</span>
                                                        </div>
                                                        <Progress value={achievements.find((a) => !a.earned)?.progress} className="h-1.5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="rounded-lg border p-4 bg-muted/50 text-center">
                                            <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                                            <h4 className="font-medium">Congratulations!</h4>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                You&apos;ve earned all available achievements. New achievements will be added soon!
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Mark Attendance Dialog */}
            <Dialog open={isMarkingAttendance} onOpenChange={setIsMarkingAttendance}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Mark Attendance</DialogTitle>
                        <DialogDescription>Choose a method to mark your attendance for {selectedCourse.name}</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <Button
                            variant="outline"
                            className="flex flex-col items-center justify-center h-24 gap-2"
                            onClick={() => setIsQRDialogOpen(true)}
                        >
                            <QrCode className="h-8 w-8 text-purple-500" />
                            <span>QR Code</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="flex flex-col items-center justify-center h-24 gap-2"
                            onClick={handleFaceRecognition}
                        >
                            <Camera className="h-8 w-8 text-blue-500" />
                            <span>Face Recognition</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="flex flex-col items-center justify-center h-24 gap-2"
                            onClick={handleGeoVerification}
                        >
                            <MapPin className="h-8 w-8 text-green-500" />
                            <span>Geolocation</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="flex flex-col items-center justify-center h-24 gap-2"
                            onClick={handleFingerprintVerification}
                        >
                            <Fingerprint className="h-8 w-8 text-indigo-500" />
                            <span>Fingerprint</span>
                        </Button>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsMarkingAttendance(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => markAttendance("manual")}>Mark Manually</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* QR Code Dialog */}
            <Dialog open={isQRDialogOpen} onOpenChange={setIsQRDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Scan QR Code</DialogTitle>
                        <DialogDescription>Scan this QR code to mark your attendance for {selectedCourse.name}</DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-center p-4">
                        <div className="w-64 h-64 bg-white border rounded-md flex items-center justify-center">
                            <div className="w-48 h-48 bg-[url('/placeholder.svg?height=192&width=192')]">
                                {/* QR Code placeholder */}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsQRDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleQRCodeScan}>Confirm Scan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Face Recognition Dialog */}
            <Dialog open={isFaceRecognitionActive}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Face Recognition</DialogTitle>
                        <DialogDescription>Please look at the camera for facial verification</DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-center p-4">
                        <div className="w-64 h-64 bg-black rounded-md overflow-hidden relative">
                            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted></video>
                            <div className="absolute inset-0 border-2 border-primary/50 rounded-md"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-40 h-40 border-2 border-dashed border-white/50 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                        Scanning... Please keep your face within the circle
                    </div>
                </DialogContent>
            </Dialog>

            {/* Geolocation Dialog */}
            <Dialog open={isGeoVerificationActive}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Geolocation Verification</DialogTitle>
                        <DialogDescription>Verifying your location for attendance</DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-center p-4">
                        <div className="w-64 h-64 bg-muted rounded-md flex items-center justify-center relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-primary/20 animate-ping"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-primary"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <MapPin className="h-6 w-6 text-white z-10" />
                            </div>
                        </div>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                        Verifying your location... Please stay in the classroom area
                    </div>
                </DialogContent>
            </Dialog>

            {/* Fingerprint Dialog */}
            <Dialog open={isFingerprintActive}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Fingerprint Verification</DialogTitle>
                        <DialogDescription>Place your finger on the scanner</DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-center p-4">
                        <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 rounded-full bg-primary/20 animate-pulse"></div>
                            </div>
                            <Fingerprint className="h-16 w-16 text-primary" />
                        </div>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                        Scanning fingerprint... Please don&apos;t move your finger
                    </div>
                </DialogContent>
            </Dialog>

            {/* Settings Sheet */}
            <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Settings</SheetTitle>
                        <SheetDescription>Customize your attendance system preferences</SheetDescription>
                    </SheetHeader>
                    <div className="py-6 space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium">Notifications</h3>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="notifications" className="text-sm">
                                        Enable Notifications
                                    </Label>
                                    <p className="text-xs text-muted-foreground">Receive alerts for attendance reminders</p>
                                </div>
                                <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium">Privacy</h3>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="location" className="text-sm">
                                        Location Services
                                    </Label>
                                    <p className="text-xs text-muted-foreground">Allow geolocation for attendance verification</p>
                                </div>
                                <Switch id="location" checked={locationEnabled} onCheckedChange={setLocationEnabled} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="biometrics" className="text-sm">
                                        Biometric Authentication
                                    </Label>
                                    <p className="text-xs text-muted-foreground">Use face recognition and fingerprint</p>
                                </div>
                                <Switch id="biometrics" checked={biometricsEnabled} onCheckedChange={setBiometricsEnabled} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium">Appearance</h3>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="darkMode" className="text-sm">
                                        Dark Mode
                                    </Label>
                                    <p className="text-xs text-muted-foreground">Switch between light and dark themes</p>
                                </div>
                                <Switch id="darkMode" checked={darkModeEnabled} onCheckedChange={setDarkModeEnabled} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium">Account</h3>
                            <div className="rounded-lg border p-4">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        {student.avatar && <AvatarImage src={student.avatar} alt={student.name} />}
                                        <AvatarFallback>
                                            {student.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{student.name}</p>
                                        <p className="text-sm text-muted-foreground">{student.email}</p>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-2">
                                    <Button variant="outline" size="sm" className="w-full">
                                        <User className="mr-2 h-4 w-4" />
                                        Edit Profile
                                    </Button>
                                    <Button variant="outline" size="sm" className="w-full">
                                        <Lock className="mr-2 h-4 w-4" />
                                        Change Password
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Attendance Details Sheet */}
            <Sheet open={isAttendanceDetailsOpen} onOpenChange={setIsAttendanceDetailsOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Attendance Details</SheetTitle>
                        <SheetDescription>Detailed information about your attendance record</SheetDescription>
                    </SheetHeader>
                    {selectedAttendanceRecord && (
                        <div className="py-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold">
                                        {new Date(selectedAttendanceRecord.date).toLocaleDateString("en-US", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{selectedCourse.name}</p>
                                </div>
                                <div
                                    className={cn(
                                        "w-12 h-12 rounded-full flex items-center justify-center",
                                        selectedAttendanceRecord.status === "present"
                                            ? "bg-green-100"
                                            : selectedAttendanceRecord.status === "late"
                                                ? "bg-amber-100"
                                                : selectedAttendanceRecord.status === "absent"
                                                    ? "bg-red-100"
                                                    : "bg-blue-100",
                                    )}
                                >
                                    {selectedAttendanceRecord.status === "present" && <CheckCircle className="h-6 w-6 text-green-600" />}
                                    {selectedAttendanceRecord.status === "late" && <Clock className="h-6 w-6 text-amber-600" />}
                                    {selectedAttendanceRecord.status === "absent" && <X className="h-6 w-6 text-red-600" />}
                                    {selectedAttendanceRecord.status === "excused" && <AlertCircle className="h-6 w-6 text-blue-600" />}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Status</p>
                                    <p className="font-medium capitalize">{selectedAttendanceRecord.status}</p>
                                </div>
                                {selectedAttendanceRecord.checkInTime && (
                                    <div>
                                        <p className="text-sm text-muted-foreground">Check-in Time</p>
                                        <p className="font-medium">{selectedAttendanceRecord.checkInTime}</p>
                                    </div>
                                )}
                                {selectedAttendanceRecord.method && (
                                    <div>
                                        <p className="text-sm text-muted-foreground">Method</p>
                                        <div className="flex items-center gap-1 font-medium">
                                            {getMethodIcon(selectedAttendanceRecord.method)}
                                            <span className="capitalize">{selectedAttendanceRecord.method}</span>
                                        </div>
                                    </div>
                                )}
                                {selectedAttendanceRecord.location && (
                                    <div>
                                        <p className="text-sm text-muted-foreground">Location</p>
                                        <p className="font-medium">{selectedAttendanceRecord.location}</p>
                                    </div>
                                )}
                            </div>

                            {selectedAttendanceRecord.notes && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Notes</p>
                                    <div className="mt-1 p-3 rounded-md bg-muted">
                                        <p>{selectedAttendanceRecord.notes}</p>
                                    </div>
                                </div>
                            )}

                            <div className="rounded-lg border p-4 bg-muted/50">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                                        <Info className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium">Attendance Policy</h4>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            This course requires a minimum of 80% attendance to be eligible for the final examination. Three
                                            late arrivals count as one absence.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button variant="outline">
                                    <Download className="mr-2 h-4 w-4" />
                                    Export Record
                                </Button>
                                {selectedAttendanceRecord.status === "absent" && !selectedAttendanceRecord.notes && (
                                    <Button>
                                        <FileText className="mr-2 h-4 w-4" />
                                        Request Excuse
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    )
}

