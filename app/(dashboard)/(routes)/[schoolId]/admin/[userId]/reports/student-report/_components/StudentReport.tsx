"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
} from "recharts"
import { MoonIcon, SunIcon, Search, Download, Calendar, TrendingUp, TrendingDown } from "lucide-react"
import { format, subMonths } from "date-fns"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import "jspdf-autotable"
import { useTheme } from "next-themes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import ClassSelection from "@/components/commons/ClassSelection"

const generateStudentsData = (count: number) => {
    const grades = ["A", "B", "C", "D", "F"]
    const subjects = ["Math", "Science", "English", "History", "Art"]
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `Student ${i + 1}`,
        avatar: `/placeholder.svg?height=40&width=40`,
        grade: grades[Math.floor(Math.random() * grades.length)],
        attendance: Math.floor(Math.random() * (100 - 70 + 1) + 70),
        performance: Math.floor(Math.random() * (100 - 50 + 1) + 50),
        lastUpdated: format(subMonths(new Date(), Math.floor(Math.random() * 6)), "yyyy-MM-dd"),
        subjects: subjects.map((subject) => ({
            name: subject,
            grade: grades[Math.floor(Math.random() * grades.length)],
            performance: Math.floor(Math.random() * (100 - 50 + 1) + 50),
        })),
        trendData: Array.from({ length: 6 }, (_, i) => ({
            month: format(subMonths(new Date(), 5 - i), "MMM"),
            performance: Math.floor(Math.random() * (100 - 50 + 1) + 50),
        })),
    }))
}

const studentsData = generateStudentsData(100)

const ITEMS_PER_PAGE = 10

export default function StudentsReport({ classes }: { classes: IClass[] }) {
    const { theme, setTheme } = useTheme()
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [gradeFilter, setGradeFilter] = useState("All")
    const [performanceRange, setPerformanceRange] = useState([0, 100])
    const [dateRange, setDateRange] = useState({ from: undefined, to: undefined })
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [selectedClass, setSelectedClass] = useState(classes[0]?._id)

    const filteredStudents = useMemo(() => {
        return studentsData.filter(
            (student) =>
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (gradeFilter === "All" || student.grade === gradeFilter) &&
                student.performance >= performanceRange[0] &&
                student.performance <= performanceRange[1] &&
                (!dateRange.from || new Date(student.lastUpdated) >= dateRange.from) &&
                (!dateRange.to || new Date(student.lastUpdated) <= dateRange.to),
        )
    }, [searchTerm, gradeFilter, performanceRange, dateRange])

    const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE)
    const paginatedStudents = filteredStudents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

    const performanceData = useMemo(() => {
        return filteredStudents.slice(0, 10).map((student) => ({
            name: student.name,
            performance: student.performance,
        }))
    }, [filteredStudents])

    const gradeDistribution = useMemo(() => {
        const distribution = filteredStudents.reduce((acc, student) => {
            acc[student.grade] = (acc[student.grade] || 0) + 1
            return acc
        }, {})
        return Object.entries(distribution).map(([grade, count]) => ({ grade, count }))
    }, [filteredStudents])

    const toggleTheme = useCallback(() => {
        setTheme(theme === "light" ? "dark" : "light")
    }, [theme, setTheme])

    const exportToPDF = useCallback(() => {
        const doc = new jsPDF()
        doc.text("Students Report", 14, 15)
        autoTable(doc, {
            head: [["Name", "Grade", "Attendance", "Performance"]],
            body: filteredStudents.map((student) => [
                student.name,
                student.grade,
                `${student.attendance}%`,
                `${student.performance}%`,
            ]),
        })
        doc.save("students-report.pdf")
    }, [filteredStudents])

    const exportToCSV = useCallback(() => {
        const csvContent =
            "data:text/csv;charset=utf-8," +
            "Name,Grade,Attendance,Performance\n" +
            filteredStudents
                .map((student) => `${student.name},${student.grade},${student.attendance}%,${student.performance}%`)
                .join("\n")
        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "students-report.csv")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }, [filteredStudents])

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="bg-primary  p-4 sticky top-0 z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <ClassSelection selectedClass={(value) => setSelectedClass(value)} classes={classes} />
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={exportToPDF}>
                            <Download className="h-[1.2rem] w-[1.2rem]" />
                            <span className="sr-only">Export to PDF</span>
                        </Button>
                        <Button variant="outline" size="icon" onClick={exportToCSV}>
                            <Calendar className="h-[1.2rem] w-[1.2rem]" />
                            <span className="sr-only">Export to CSV</span>
                        </Button>
                    </div>
                </div>
            </header>
            <main className="container mx-auto py-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{filteredStudents.length}</div>
                            <p className="text-xs text-muted-foreground">
                                {filteredStudents.length > studentsData.length / 2 ? (
                                    <span className="text-green-600 flex items-center">
                                        <TrendingUp className="mr-1" size={12} />
                                        Above average
                                    </span>
                                ) : (
                                    <span className="text-red-600 flex items-center">
                                        <TrendingDown className="mr-1" size={12} />
                                        Below average
                                    </span>
                                )}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {(
                                    filteredStudents.reduce((sum, student) => sum + student.performance, 0) / filteredStudents.length
                                ).toFixed(2)}
                                %
                            </div>
                            <Progress
                                value={
                                    filteredStudents.reduce((sum, student) => sum + student.performance, 0) / filteredStudents.length
                                }
                                className="mt-2"
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {(
                                    filteredStudents.reduce((sum, student) => sum + student.attendance, 0) / filteredStudents.length
                                ).toFixed(2)}
                                %
                            </div>
                            <Progress
                                value={filteredStudents.reduce((sum, student) => sum + student.attendance, 0) / filteredStudents.length}
                                className="mt-2"
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Top Grade</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {gradeDistribution.sort((a, b) => b.count - a.count)[0]?.grade || "N/A"}
                            </div>
                            <p className="text-xs text-muted-foreground">Most common grade</p>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="charts" className="mt-6">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="charts">Charts</TabsTrigger>
                        <TabsTrigger value="table">Table</TabsTrigger>
                    </TabsList>
                    <TabsContent value="charts">
                        <div className="grid gap-6 md:grid-cols-2 mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Student Performance Chart</CardTitle>
                                    <CardDescription>Overview of top 10 student performance scores</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={performanceData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="performance" fill="hsl(var(--primary))" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Grade Distribution</CardTitle>
                                    <CardDescription>Overview of grade distribution</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={gradeDistribution}
                                                dataKey="count"
                                                nameKey="grade"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                fill="hsl(var(--primary))"
                                                label
                                            >
                                                {gradeDistribution.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value="table">
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Students List</CardTitle>
                                <CardDescription>Detailed information about each student</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                        <div className="relative">
                                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="Search students..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-8 w-full sm:w-[250px]"
                                            />
                                        </div>
                                        <Select value={gradeFilter} onValueChange={setGradeFilter}>
                                            <SelectTrigger className="w-full sm:w-[180px]">
                                                <SelectValue placeholder="Select Grade" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="All">All Grades</SelectItem>
                                                <SelectItem value="A">Grade A</SelectItem>
                                                <SelectItem value="B">Grade B</SelectItem>
                                                <SelectItem value="C">Grade C</SelectItem>
                                                <SelectItem value="D">Grade D</SelectItem>
                                                <SelectItem value="F">Grade F</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                                        <div className="w-full sm:w-[250px]">
                                            <label className="text-sm font-medium">Performance Range</label>
                                            <Slider
                                                value={performanceRange}
                                                onValueChange={setPerformanceRange}
                                                min={0}
                                                max={100}
                                                step={1}
                                                className="mt-2"
                                            />
                                            <div className="flex justify-between text-sm mt-1">
                                                <span>{performanceRange[0]}%</span>
                                                <span>{performanceRange[1]}%</span>
                                            </div>
                                        </div>
                                        <DateRangePicker date={dateRange} setDate={setDateRange} />
                                    </div>
                                </div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Student</TableHead>
                                            <TableHead>Grade</TableHead>
                                            <TableHead>Attendance</TableHead>
                                            <TableHead>Performance</TableHead>
                                            <TableHead>Progress</TableHead>
                                            <TableHead>Last Updated</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedStudents.map((student) => (
                                            <TableRow key={student.id}>
                                                <TableCell>
                                                    <div className="flex items-center space-x-3">
                                                        <Avatar>
                                                            <AvatarImage src={student.avatar} alt={student.name} />
                                                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-medium">{student.name}</p>
                                                            <p className="text-sm text-muted-foreground">ID: {student.id}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={student.grade === "A" || student.grade === "B" ? "default" : "secondary"}>
                                                        {student.grade}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{student.attendance}%</TableCell>
                                                <TableCell>{student.performance}%</TableCell>
                                                <TableCell>
                                                    <Progress value={student.performance} className="w-[60px]" />
                                                </TableCell>
                                                <TableCell>{student.lastUpdated}</TableCell>
                                                <TableCell>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="outline" size="sm" onClick={() => setSelectedStudent(student)}>
                                                                View Details
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>{student.name}'s Details</DialogTitle>
                                                                <DialogDescription>Detailed performance across subjects</DialogDescription>
                                                            </DialogHeader>
                                                            <div className="mt-4">
                                                                <h4 className="font-semibold mb-2">Subject Performance</h4>
                                                                {student.subjects.map((subject, index) => (
                                                                    <div key={index} className="flex justify-between items-center mb-2">
                                                                        <span>{subject.name}</span>
                                                                        <div className="flex items-center">
                                                                            <Badge
                                                                                variant={
                                                                                    subject.grade === "A" || subject.grade === "B" ? "default" : "secondary"
                                                                                }
                                                                                className="mr-2"
                                                                            >
                                                                                {subject.grade}
                                                                            </Badge>
                                                                            <Progress value={subject.performance} className="w-[60px]" />
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="mt-4">
                                                                <h4 className="font-semibold mb-2">Performance Trend</h4>
                                                                <ResponsiveContainer width="100%" height={200}>
                                                                    <LineChart data={student.trendData}>
                                                                        <CartesianGrid strokeDasharray="3 3" />
                                                                        <XAxis dataKey="month" />
                                                                        <YAxis />
                                                                        <Tooltip />
                                                                        <Line type="monotone" dataKey="performance" stroke="hsl(var(--primary))" />
                                                                    </LineChart>
                                                                </ResponsiveContainer>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="text-sm text-muted-foreground">
                                        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                                        {Math.min(currentPage * ITEMS_PER_PAGE, filteredStudents.length)} of {filteredStudents.length}{" "}
                                        students
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}

