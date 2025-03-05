"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
} from "recharts"
import { CheckCircle, XCircle, AlertCircle, CalendarIcon, Clock, ArrowUpRight } from "lucide-react"

// Sample data for attendance records
const courses = [
    { id: "CS101", name: "Introduction to Computer Science" },
    { id: "MATH201", name: "Calculus II" },
    { id: "ENG102", name: "English Composition" },
    { id: "PHYS101", name: "Physics I" },
    { id: "CHEM201", name: "Organic Chemistry" },
]

const attendanceData = {
    overall: {
        present: 85,
        absent: 10,
        excused: 5,
        total: 100,
    },
    courses: {
        CS101: { present: 90, absent: 5, excused: 5, total: 100 },
        MATH201: { present: 80, absent: 15, excused: 5, total: 100 },
        ENG102: { present: 95, absent: 0, excused: 5, total: 100 },
        PHYS101: { present: 75, absent: 20, excused: 5, total: 100 },
        CHEM201: { present: 85, absent: 10, excused: 5, total: 100 },
    },
    byMonth: [
        { name: "Jan", present: 90, absent: 10 },
        { name: "Feb", present: 85, absent: 15 },
        { name: "Mar", present: 88, absent: 12 },
        { name: "Apr", present: 92, absent: 8 },
        { name: "May", present: 95, absent: 5 },
    ],
    byWeekday: [
        { name: "Mon", present: 90, absent: 10 },
        { name: "Tue", present: 85, absent: 15 },
        { name: "Wed", present: 95, absent: 5 },
        { name: "Thu", present: 80, absent: 20 },
        { name: "Fri", present: 75, absent: 25 },
    ],
    recentRecords: [
        { date: "2023-07-10", course: "CS101", status: "present", time: "09:00 AM" },
        { date: "2023-07-10", course: "MATH201", status: "present", time: "11:00 AM" },
        { date: "2023-07-09", course: "ENG102", status: "absent", time: "02:00 PM" },
        { date: "2023-07-09", course: "PHYS101", status: "present", time: "10:00 AM" },
        { date: "2023-07-08", course: "CHEM201", status: "excused", time: "01:00 PM" },
    ],
    calendarData: {
        "2023-07-01": { status: "present", courses: ["CS101", "MATH201"] },
        "2023-07-02": { status: "absent", courses: ["ENG102"] },
        "2023-07-03": { status: "present", courses: ["PHYS101", "CHEM201"] },
        "2023-07-04": { status: "holiday", courses: [] },
        "2023-07-05": { status: "present", courses: ["CS101", "ENG102"] },
        "2023-07-06": { status: "present", courses: ["MATH201", "PHYS101"] },
        "2023-07-07": { status: "weekend", courses: [] },
        "2023-07-08": { status: "weekend", courses: [] },
        "2023-07-09": { status: "present", courses: ["CS101", "CHEM201"] },
        "2023-07-10": { status: "present", courses: ["MATH201", "ENG102"] },
    },
}

// Helper function to format date
const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

export default function AttendancePage() {
    const [selectedCourse, setSelectedCourse] = useState("all")
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [dateAttendance, setDateAttendance] = useState<any>(null)

    // Pie chart data for overall attendance
    const pieData = [
        { name: "Present", value: attendanceData.overall.present, color: "#10b981" },
        { name: "Absent", value: attendanceData.overall.absent, color: "#ef4444" },
        { name: "Excused", value: attendanceData.overall.excused, color: "#f59e0b" },
    ]

    // Handle date selection in calendar
    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date)
        if (date) {
            const dateString = date.toISOString().split("T")[0]
            setDateAttendance(attendanceData.calendarData[dateString] || null)
        } else {
            setDateAttendance(null)
        }
    }

    // Get attendance data based on selected course
    const getAttendanceData = () => {
        if (selectedCourse === "all") {
            return attendanceData.overall
        }
        return attendanceData.courses[selectedCourse]
    }

    const currentAttendance = getAttendanceData()
    const attendancePercentage = (currentAttendance.present / currentAttendance.total) * 100

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Attendance Records</h1>

            <div className="flex items-center space-x-4">
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Courses</SelectItem>
                        {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                                {course.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="flex-1">
                    <Badge
                        variant={attendancePercentage >= 90 ? "default" : attendancePercentage >= 75 ? "secondary" : "destructive"}
                        className="ml-2"
                    >
                        {attendancePercentage >= 90 ? "Excellent" : attendancePercentage >= 75 ? "Good" : "At Risk"}
                    </Badge>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Present</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-500">{currentAttendance.present}%</div>
                        <p className="text-xs text-muted-foreground">of total classes</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Absent</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-500">{currentAttendance.absent}%</div>
                        <p className="text-xs text-muted-foreground">of total classes</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Excused</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-amber-500">{currentAttendance.excused}%</div>
                        <p className="text-xs text-muted-foreground">of total classes</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Overall</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{currentAttendance.present}%</div>
                        <Progress value={currentAttendance.present} className="mt-2" />
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                    <TabsTrigger value="trends">Trends</TabsTrigger>
                    <TabsTrigger value="records">Records</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Attendance Distribution</CardTitle>
                                <CardDescription>Overall attendance breakdown</CardDescription>
                            </CardHeader>
                            <CardContent className="flex justify-center">
                                <div className="h-[300px] w-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={100}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Course-wise Attendance</CardTitle>
                                <CardDescription>Attendance percentage by course</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={Object.entries(attendanceData.courses).map(([id, data]) => ({
                                                name: id,
                                                present: data.present,
                                                absent: data.absent,
                                                excused: data.excused,
                                            }))}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="present" stackId="a" fill="#10b981" name="Present" />
                                            <Bar dataKey="absent" stackId="a" fill="#ef4444" name="Absent" />
                                            <Bar dataKey="excused" stackId="a" fill="#f59e0b" name="Excused" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="calendar">
                    <Card>
                        <CardHeader>
                            <CardTitle>Attendance Calendar</CardTitle>
                            <CardDescription>View your attendance by date</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-2">
                            <div>
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={handleDateSelect}
                                    className="rounded-md border"
                                    modifiers={{
                                        present: (date) => {
                                            const dateStr = date.toISOString().split("T")[0]
                                            return attendanceData.calendarData[dateStr]?.status === "present"
                                        },
                                        absent: (date) => {
                                            const dateStr = date.toISOString().split("T")[0]
                                            return attendanceData.calendarData[dateStr]?.status === "absent"
                                        },
                                        excused: (date) => {
                                            const dateStr = date.toISOString().split("T")[0]
                                            return attendanceData.calendarData[dateStr]?.status === "excused"
                                        },
                                    }}
                                    modifiersClassNames={{
                                        present: "bg-green-100 text-green-700",
                                        absent: "bg-red-100 text-red-700",
                                        excused: "bg-amber-100 text-amber-700",
                                    }}
                                />
                            </div>

                            <div>
                                {dateAttendance ? (
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold">{selectedDate && formatDate(selectedDate.toISOString())}</h3>

                                        <div className="flex items-center space-x-2">
                                            <span>Status:</span>
                                            {dateAttendance.status === "present" && (
                                                <Badge variant="outline" className="bg-green-100 text-green-700">
                                                    Present
                                                </Badge>
                                            )}
                                            {dateAttendance.status === "absent" && (
                                                <Badge variant="outline" className="bg-red-100 text-red-700">
                                                    Absent
                                                </Badge>
                                            )}
                                            {dateAttendance.status === "excused" && (
                                                <Badge variant="outline" className="bg-amber-100 text-amber-700">
                                                    Excused
                                                </Badge>
                                            )}
                                            {dateAttendance.status === "holiday" && (
                                                <Badge variant="outline" className="bg-blue-100 text-blue-700">
                                                    Holiday
                                                </Badge>
                                            )}
                                            {dateAttendance.status === "weekend" && (
                                                <Badge variant="outline" className="bg-purple-100 text-purple-700">
                                                    Weekend
                                                </Badge>
                                            )}
                                        </div>

                                        {dateAttendance.courses && dateAttendance.courses.length > 0 && (
                                            <div>
                                                <h4 className="text-sm font-medium mb-2">Classes:</h4>
                                                <ul className="space-y-2">
                                                    {dateAttendance.courses.map((courseId) => {
                                                        const course = courses.find((c) => c.id === courseId)
                                                        return (
                                                            <li key={courseId} className="flex items-center space-x-2">
                                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                                <span>{course?.name || courseId}</span>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <CalendarIcon className="h-12 w-12 text-muted-foreground mb-2" />
                                        <p className="text-muted-foreground">Select a date to view attendance details</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="trends">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Monthly Trends</CardTitle>
                                <CardDescription>Attendance patterns by month</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={attendanceData.byMonth} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="present" stroke="#10b981" name="Present %" />
                                            <Line type="monotone" dataKey="absent" stroke="#ef4444" name="Absent %" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Weekday Analysis</CardTitle>
                                <CardDescription>Attendance patterns by day of week</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={attendanceData.byWeekday} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="present" fill="#10b981" name="Present %" />
                                            <Bar dataKey="absent" fill="#ef4444" name="Absent %" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="records">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Attendance Records</CardTitle>
                            <CardDescription>Your latest attendance entries</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {attendanceData.recentRecords.map((record, index) => (
                                    <Card key={index}>
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    {record.status === "present" && <CheckCircle className="h-5 w-5 text-green-500" />}
                                                    {record.status === "absent" && <XCircle className="h-5 w-5 text-red-500" />}
                                                    {record.status === "excused" && <AlertCircle className="h-5 w-5 text-amber-500" />}
                                                    <div>
                                                        <p className="font-medium">{record.course}</p>
                                                        <p className="text-sm text-muted-foreground">{formatDate(record.date)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm text-muted-foreground">{record.time}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                View All Records
                                <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

