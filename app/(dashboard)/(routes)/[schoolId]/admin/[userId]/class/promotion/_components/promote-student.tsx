"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowUpDown, ChevronDown, Filter, GraduationCap, MoreHorizontal, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// Types
type Student = {
    id: string
    name: string
    currentGrade: string
    nextGrade: string
    section: string
    enrollmentDate: string
    status: "active" | "inactive" | "graduated"
    academicPerformance: number
    attendance: number
    avatar?: string
}

type Grade = {
    id: string
    name: string
}

type Section = {
    id: string
    name: string
}

// Mock data
const GRADES: Grade[] = [
    { id: "1", name: "Grade 1" },
    { id: "2", name: "Grade 2" },
    { id: "3", name: "Grade 3" },
    { id: "4", name: "Grade 4" },
    { id: "5", name: "Grade 5" },
    { id: "6", name: "Grade 6" },
    { id: "7", name: "Grade 7" },
    { id: "8", name: "Grade 8" },
    { id: "9", name: "Grade 9" },
    { id: "10", name: "Grade 10" },
    { id: "11", name: "Grade 11" },
    { id: "12", name: "Grade 12" },
    { id: "g", name: "Graduated" },
]

const SECTIONS: Section[] = [
    { id: "a", name: "Section A" },
    { id: "b", name: "Section B" },
    { id: "c", name: "Section C" },
]

const STUDENTS: Student[] = Array.from({ length: 50 }).map((_, i) => {
    const gradeIndex = Math.floor(Math.random() * (GRADES.length - 1))
    const nextGradeIndex = gradeIndex + 1 >= GRADES.length - 1 ? GRADES.length - 1 : gradeIndex + 1

    return {
        id: `STU${(i + 1).toString().padStart(4, "0")}`,
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
            "Scarlett King",
            "Daniel Wright",
            "Grace Lopez",
            "Matthew Hill",
            "Chloe Scott",
            "Henry Green",
            "Lily Adams",
            "Joseph Baker",
            "Avery Gonzalez",
            "Samuel Nelson",
            "Victoria Carter",
            "David Mitchell",
            "Penelope Perez",
            "Owen Roberts",
            "Riley Turner",
            "Wyatt Phillips",
            "Layla Campbell",
            "John Parker",
            "Zoey Evans",
            "Gabriel Edwards",
            "Madison Collins",
            "Julian Stewart",
        ][i % 50],
        currentGrade: GRADES[gradeIndex].name,
        nextGrade: GRADES[nextGradeIndex].name,
        section: SECTIONS[Math.floor(Math.random() * SECTIONS.length)].name,
        enrollmentDate: new Date(
            2020 + Math.floor(Math.random() * 3),
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 28) + 1,
        )
            .toISOString()
            .split("T")[0],
        status: Math.random() > 0.1 ? "active" : Math.random() > 0.5 ? "inactive" : "graduated",
        academicPerformance: Math.floor(Math.random() * 100),
        attendance: Math.floor(Math.random() * 100),
        avatar: Math.random() > 0.3 ? `/placeholder.svg?height=40&width=40` : undefined,
    }
})

export default function PromoteStudentsPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { toast } = useToast()

    // State
    const [students, setStudents] = useState<Student[]>(STUDENTS)
    const [filteredStudents, setFilteredStudents] = useState<Student[]>(STUDENTS)
    const [selectedStudents, setSelectedStudents] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [gradeFilter, setGradeFilter] = useState<string>("all")
    const [sectionFilter, setSectionFilter] = useState<string>("all")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [sortField, setSortField] = useState<keyof Student>("name")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [isPromoteDialogOpen, setIsPromoteDialogOpen] = useState(false)
    const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)
    const [studentDetailId, setStudentDetailId] = useState<string | null>(null)
    const [isPromoting, setIsPromoting] = useState(false)

    // Effects
    useEffect(() => {
        // Apply filters and search
        let result = [...students]

        // Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(
                (student) => student.name.toLowerCase().includes(query) || student.id.toLowerCase().includes(query),
            )
        }

        // Grade filter
        if (gradeFilter !== "all") {
            result = result.filter((student) => student.currentGrade === gradeFilter)
        }

        // Section filter
        if (sectionFilter !== "all") {
            result = result.filter((student) => student.section === sectionFilter)
        }

        // Status filter
        if (statusFilter !== "all") {
            result = result.filter((student) => student.status === statusFilter)
        }

        // Sort
        result.sort((a, b) => {
            const valueA = a[sortField]
            const valueB = b[sortField]

            if (typeof valueA === "string" && typeof valueB === "string") {
                return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
            }

            // For numeric values
            return sortDirection === "asc" ? (valueA as number) - (valueB as number) : (valueB as number) - (valueA as number)
        })

        setFilteredStudents(result)
    }, [students, searchQuery, gradeFilter, sectionFilter, statusFilter, sortField, sortDirection])

    // Handlers
    const handleSort = (field: keyof Student) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    const handleSelectAll = () => {
        if (selectedStudents.length === filteredStudents.length) {
            setSelectedStudents([])
        } else {
            setSelectedStudents(filteredStudents.map((student) => student.id))
        }
    }

    const handleSelectStudent = (id: string) => {
        if (selectedStudents.includes(id)) {
            setSelectedStudents(selectedStudents.filter((studentId) => studentId !== id))
        } else {
            setSelectedStudents([...selectedStudents, id])
        }
    }

    const handlePromoteStudents = () => {
        setIsPromoting(true)

        // Simulate API call
        setTimeout(() => {
            const updatedStudents = students.map((student) => {
                if (selectedStudents.includes(student.id)) {
                    // Handle graduation case
                    if (student.nextGrade === "Graduated") {
                        return {
                            ...student,
                            status: "graduated" as const,
                            currentGrade: "Graduated",
                            nextGrade: "Graduated",
                        }
                    }

                    // Find the next grade index
                    const currentGradeIndex = GRADES.findIndex((g) => g.name === student.currentGrade)
                    const nextGradeIndex = currentGradeIndex + 1

                    return {
                        ...student,
                        currentGrade: GRADES[nextGradeIndex]?.name || student.currentGrade,
                        nextGrade: GRADES[nextGradeIndex + 1]?.name || "Graduated",
                    }
                }
                return student
            })

            setStudents(updatedStudents)
            setSelectedStudents([])
            setIsPromoteDialogOpen(false)
            setIsPromoting(false)

            toast({
                title: "Students Promoted",
                description: `Successfully promoted ${selectedStudents.length} student${selectedStudents.length === 1 ? "" : "s"}.`,
            })
        }, 1500)
    }

    const handleClearFilters = () => {
        setSearchQuery("")
        setGradeFilter("all")
        setSectionFilter("all")
        setStatusFilter("all")
        setIsFilterSheetOpen(false)
    }

    const getStudentById = (id: string) => {
        return students.find((student) => student.id === id) || null
    }

    const selectedStudent = studentDetailId ? getStudentById(studentDetailId) : null

    // Render status badge
    const renderStatusBadge = (status: Student["status"]) => {
        switch (status) {
            case "active":
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Active
                    </Badge>
                )
            case "inactive":
                return (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Inactive
                    </Badge>
                )
            case "graduated":
                return (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Graduated
                    </Badge>
                )
        }
    }

    return (
        <>
            <div className="space-y-4">
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
                        <Button variant="outline" size="icon" className="ml-2" onClick={() => setIsFilterSheetOpen(true)}>
                            <Filter className="h-4 w-4" />
                            <span className="sr-only">Filter</span>
                        </Button>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Select value={gradeFilter} onValueChange={setGradeFilter}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="All Grades" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Grades</SelectItem>
                                {GRADES.map((grade) => (
                                    <SelectItem key={grade.id} value={grade.name}>
                                        {grade.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Button
                            className="ml-auto"
                            disabled={selectedStudents.length === 0}
                            onClick={() => setIsPromoteDialogOpen(true)}
                        >
                            <GraduationCap className="mr-2 h-4 w-4" />
                            Promote
                        </Button>
                    </div>
                </div>

                {selectedStudents.length > 0 && (
                    <div className="bg-muted/50 p-2 rounded-lg flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={selectedStudents.length === filteredStudents.length}
                                onCheckedChange={handleSelectAll}
                            />
                            <span className="text-sm font-medium">
                                {selectedStudents.length} student{selectedStudents.length === 1 ? "" : "s"} selected
                            </span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedStudents([])}>
                            Clear selection
                        </Button>
                    </div>
                )}

                <Card>
                    <CardContent className="p-0">
                        <div className="relative w-full overflow-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[40px]">
                                            <Checkbox
                                                checked={filteredStudents.length > 0 && selectedStudents.length === filteredStudents.length}
                                                onCheckedChange={handleSelectAll}
                                                aria-label="Select all"
                                            />
                                        </TableHead>
                                        <TableHead className="w-[80px]">ID</TableHead>
                                        <TableHead>
                                            <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("name")}>
                                                Name
                                                <ArrowUpDown
                                                    className={cn("ml-2 h-4 w-4", sortField === "name" ? "opacity-100" : "opacity-40")}
                                                />
                                            </Button>
                                        </TableHead>
                                        <TableHead>Current Grade</TableHead>
                                        <TableHead>Next Grade</TableHead>
                                        <TableHead>Section</TableHead>
                                        <TableHead>
                                            <Button
                                                variant="ghost"
                                                className="p-0 font-medium"
                                                onClick={() => handleSort("academicPerformance")}
                                            >
                                                Performance
                                                <ArrowUpDown
                                                    className={cn(
                                                        "ml-2 h-4 w-4",
                                                        sortField === "academicPerformance" ? "opacity-100" : "opacity-40",
                                                    )}
                                                />
                                            </Button>
                                        </TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="w-[60px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredStudents.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={9} className="h-24 text-center">
                                                <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                    <Search className="h-8 w-8 mb-2 opacity-40" />
                                                    <p>No students found</p>
                                                    <p className="text-sm">Try adjusting your search or filters</p>
                                                    {(searchQuery ||
                                                        gradeFilter !== "all" ||
                                                        sectionFilter !== "all" ||
                                                        statusFilter !== "all") && (
                                                            <Button variant="link" className="mt-2" onClick={handleClearFilters}>
                                                                Clear all filters
                                                            </Button>
                                                        )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredStudents.map((student) => (
                                            <TableRow
                                                key={student.id}
                                                className={cn(
                                                    selectedStudents.includes(student.id) && "bg-muted/50",
                                                    "cursor-pointer transition-colors hover:bg-muted/50",
                                                    student.status === "graduated" && "opacity-70",
                                                )}
                                                onClick={() => setStudentDetailId(student.id)}
                                            >
                                                <TableCell className="p-2" onClick={(e) => e.stopPropagation()}>
                                                    <Checkbox
                                                        checked={selectedStudents.includes(student.id)}
                                                        onCheckedChange={() => handleSelectStudent(student.id)}
                                                        aria-label={`Select ${student.name}`}
                                                        disabled={student.status === "graduated"}
                                                    />
                                                </TableCell>
                                                <TableCell className="font-mono text-xs">{student.id}</TableCell>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-8 w-8">
                                                            {student.avatar && <AvatarImage src={student.avatar} alt={student.name} />}
                                                            <AvatarFallback>
                                                                {student.name
                                                                    .split(" ")
                                                                    .map((n) => n[0])
                                                                    .join("")}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        {student.name}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{student.currentGrade}</TableCell>
                                                <TableCell>{student.nextGrade}</TableCell>
                                                <TableCell>{student.section}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Progress
                                                            value={student.academicPerformance}
                                                            className="h-2 w-[60px]"
                                                            indicatorClassName={cn(
                                                                student.academicPerformance < 60
                                                                    ? "bg-red-500"
                                                                    : student.academicPerformance < 80
                                                                        ? "bg-amber-500"
                                                                        : "bg-green-500",
                                                            )}
                                                        />
                                                        <span className="text-xs">{student.academicPerformance}%</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{renderStatusBadge(student.status)}</TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Open menu</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem onClick={() => setStudentDetailId(student.id)}>
                                                                View details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                disabled={student.status === "graduated" || selectedStudents.includes(student.id)}
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    handleSelectStudent(student.id)
                                                                }}
                                                            >
                                                                Select
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                disabled={student.status === "graduated"}
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    setSelectedStudents([student.id])
                                                                    setIsPromoteDialogOpen(true)
                                                                }}
                                                                className="text-primary"
                                                            >
                                                                Promote student
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        Showing <strong>{filteredStudents.length}</strong> of <strong>{students.length}</strong> students
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" disabled={filteredStudents.length === 0}>
                            Previous
                        </Button>
                        <Button variant="outline" size="sm" disabled={filteredStudents.length === 0}>
                            Next
                        </Button>
                    </div>
                </div>
            </div>

            {/* Promote Dialog */}
            <Dialog open={isPromoteDialogOpen} onOpenChange={setIsPromoteDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Promote Students</DialogTitle>
                        <DialogDescription>
                            You are about to promote {selectedStudents.length} student{selectedStudents.length === 1 ? "" : "s"} to
                            the next grade level.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <h4 className="text-sm font-medium mb-3">Students to be promoted:</h4>
                        <ScrollArea className="h-[200px] rounded-md border p-4">
                            <div className="space-y-2">
                                {selectedStudents.map((id) => {
                                    const student = getStudentById(id)
                                    if (!student) return null

                                    return (
                                        <div key={id} className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6">
                                                    {student.avatar && <AvatarImage src={student.avatar} alt={student.name} />}
                                                    <AvatarFallback className="text-xs">
                                                        {student.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span>{student.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-muted-foreground">{student.currentGrade}</span>
                                                <ChevronDown className="h-3 w-3 text-muted-foreground rotate-270" />
                                                <span className="font-medium">{student.nextGrade}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </ScrollArea>

                        <div className="mt-4 rounded-md bg-muted p-4">
                            <div className="flex items-start gap-2">
                                <div className="mt-0.5 rounded-full bg-amber-400/20 p-1 text-amber-600">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM7.5 4.5C7.5 4.22386 7.72386 4 8 4C8.27614 4 8.5 4.22386 8.5 4.5V9.5C8.5 9.77614 8.27614 10 8 10C7.72386 10 7.5 9.77614 7.5 9.5V4.5ZM8 12C8.55228 12 9 11.5523 9 11C9 10.4477 8.55228 10 8 10C7.44772 10 7 10.4477 7 11C7 11.5523 7.44772 12 8 12Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">This action cannot be undone</p>
                                    <p className="text-xs text-muted-foreground">
                                        Students will be promoted to their next grade level immediately. Academic records will be updated
                                        accordingly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPromoteDialogOpen(false)} disabled={isPromoting}>
                            Cancel
                        </Button>
                        <Button onClick={handlePromoteStudents} disabled={isPromoting} className="gap-1">
                            {isPromoting ? (
                                <>
                                    <svg
                                        className="h-4 w-4 animate-spin"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <GraduationCap className="h-4 w-4" />
                                    <span>Promote Students</span>
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Filter Sheet */}
            <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
                <SheetContent className="w-full sm:max-w-md">
                    <SheetHeader>
                        <SheetTitle>Filter Students</SheetTitle>
                        <SheetDescription>Apply filters to narrow down the student list</SheetDescription>
                    </SheetHeader>

                    <div className="py-6 space-y-6">
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">Grade</h4>
                            <Select value={gradeFilter} onValueChange={setGradeFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Grades" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Grades</SelectItem>
                                    {GRADES.map((grade) => (
                                        <SelectItem key={grade.id} value={grade.name}>
                                            {grade.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">Section</h4>
                            <Select value={sectionFilter} onValueChange={setSectionFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Sections" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Sections</SelectItem>
                                    {SECTIONS.map((section) => (
                                        <SelectItem key={section.id} value={section.name}>
                                            {section.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">Status</h4>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Statuses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                    <SelectItem value="graduated">Graduated</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">Sort By</h4>
                            <Select
                                value={`${sortField}-${sortDirection}`}
                                onValueChange={(value) => {
                                    const [field, direction] = value.split("-")
                                    setSortField(field as keyof Student)
                                    setSortDirection(direction as "asc" | "desc")
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                                    <SelectItem value="currentGrade-asc">Grade (Low-High)</SelectItem>
                                    <SelectItem value="currentGrade-desc">Grade (High-Low)</SelectItem>
                                    <SelectItem value="academicPerformance-desc">Performance (High-Low)</SelectItem>
                                    <SelectItem value="academicPerformance-asc">Performance (Low-High)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <Button variant="outline" onClick={handleClearFilters}>
                            Reset Filters
                        </Button>
                        <Button onClick={() => setIsFilterSheetOpen(false)}>Apply Filters</Button>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Student Detail Sheet */}
            <Sheet open={!!studentDetailId} onOpenChange={(open) => !open && setStudentDetailId(null)}>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                    {selectedStudent && (
                        <>
                            <SheetHeader>
                                <SheetTitle>Student Details</SheetTitle>
                                <SheetDescription>View and manage student information</SheetDescription>
                            </SheetHeader>

                            <div className="py-6">
                                <div className="flex flex-col items-center justify-center mb-6">
                                    <Avatar className="h-24 w-24 mb-4">
                                        {selectedStudent.avatar && <AvatarImage src={selectedStudent.avatar} alt={selectedStudent.name} />}
                                        <AvatarFallback className="text-2xl">
                                            {selectedStudent.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-xl font-bold">{selectedStudent.name}</h2>
                                    <p className="text-sm text-muted-foreground">{selectedStudent.id}</p>
                                    <div className="mt-2">{renderStatusBadge(selectedStudent.status)}</div>
                                </div>

                                <Tabs defaultValue="overview">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="overview">Overview</TabsTrigger>
                                        <TabsTrigger value="academic">Academic</TabsTrigger>
                                        <TabsTrigger value="promotion">Promotion</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="overview" className="space-y-4 pt-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Current Grade</p>
                                                <p className="font-medium">{selectedStudent.currentGrade}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Section</p>
                                                <p className="font-medium">{selectedStudent.section}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Enrollment Date</p>
                                                <p className="font-medium">{selectedStudent.enrollmentDate}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Next Grade</p>
                                                <p className="font-medium">{selectedStudent.nextGrade}</p>
                                            </div>
                                        </div>

                                        <div className="rounded-lg border p-4 space-y-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium">Academic Performance</p>
                                                    <span
                                                        className={cn(
                                                            "text-xs font-medium rounded-full px-2 py-0.5",
                                                            selectedStudent.academicPerformance < 60
                                                                ? "bg-red-100 text-red-700"
                                                                : selectedStudent.academicPerformance < 80
                                                                    ? "bg-amber-100 text-amber-700"
                                                                    : "bg-green-100 text-green-700",
                                                        )}
                                                    >
                                                        {selectedStudent.academicPerformance}%
                                                    </span>
                                                </div>
                                                <Progress
                                                    value={selectedStudent.academicPerformance}
                                                    className="h-2"
                                                    indicatorClassName={cn(
                                                        selectedStudent.academicPerformance < 60
                                                            ? "bg-red-500"
                                                            : selectedStudent.academicPerformance < 80
                                                                ? "bg-amber-500"
                                                                : "bg-green-500",
                                                    )}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium">Attendance</p>
                                                    <span
                                                        className={cn(
                                                            "text-xs font-medium rounded-full px-2 py-0.5",
                                                            selectedStudent.attendance < 60
                                                                ? "bg-red-100 text-red-700"
                                                                : selectedStudent.attendance < 80
                                                                    ? "bg-amber-100 text-amber-700"
                                                                    : "bg-green-100 text-green-700",
                                                        )}
                                                    >
                                                        {selectedStudent.attendance}%
                                                    </span>
                                                </div>
                                                <Progress
                                                    value={selectedStudent.attendance}
                                                    className="h-2"
                                                    indicatorClassName={cn(
                                                        selectedStudent.attendance < 60
                                                            ? "bg-red-500"
                                                            : selectedStudent.attendance < 80
                                                                ? "bg-amber-500"
                                                                : "bg-green-500",
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="academic" className="space-y-4 pt-4">
                                        <div className="rounded-lg border">
                                            <div className="p-4 border-b">
                                                <h4 className="font-medium">Academic Summary</h4>
                                            </div>
                                            <div className="p-4 space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <p className="text-sm text-muted-foreground">GPA</p>
                                                        <p className="font-medium">{(selectedStudent.academicPerformance / 20).toFixed(1)}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm text-muted-foreground">Class Rank</p>
                                                        <p className="font-medium">{Math.floor(Math.random() * 30) + 1} of 50</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <h5 className="text-sm font-medium">Subject Performance</h5>
                                                    <div className="space-y-3">
                                                        {[
                                                            { subject: "Mathematics", score: Math.floor(Math.random() * 100) },
                                                            { subject: "Science", score: Math.floor(Math.random() * 100) },
                                                            { subject: "English", score: Math.floor(Math.random() * 100) },
                                                            { subject: "History", score: Math.floor(Math.random() * 100) },
                                                            { subject: "Art", score: Math.floor(Math.random() * 100) },
                                                        ].map((subject) => (
                                                            <div key={subject.subject} className="space-y-1">
                                                                <div className="flex items-center justify-between">
                                                                    <p className="text-sm">{subject.subject}</p>
                                                                    <span
                                                                        className={cn(
                                                                            "text-xs font-medium",
                                                                            subject.score < 60
                                                                                ? "text-red-600"
                                                                                : subject.score < 80
                                                                                    ? "text-amber-600"
                                                                                    : "text-green-600",
                                                                        )}
                                                                    >
                                                                        {subject.score}%
                                                                    </span>
                                                                </div>
                                                                <Progress
                                                                    value={subject.score}
                                                                    className="h-1.5"
                                                                    indicatorClassName={cn(
                                                                        subject.score < 60
                                                                            ? "bg-red-500"
                                                                            : subject.score < 80
                                                                                ? "bg-amber-500"
                                                                                : "bg-green-500",
                                                                    )}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="promotion" className="space-y-4 pt-4">
                                        <div className="rounded-lg border">
                                            <div className="p-4 border-b">
                                                <h4 className="font-medium">Promotion History</h4>
                                            </div>
                                            <div className="p-4">
                                                <div className="space-y-4">
                                                    {[...Array(3)].map((_, i) => {
                                                        const year = new Date().getFullYear() - i
                                                        const prevGradeIndex =
                                                            GRADES.findIndex((g) => g.name === selectedStudent.currentGrade) - i - 1
                                                        const prevGrade = prevGradeIndex >= 0 ? GRADES[prevGradeIndex].name : "N/A"
                                                        const toGradeIndex = prevGradeIndex + 1
                                                        const toGrade =
                                                            toGradeIndex >= 0 && toGradeIndex < GRADES.length ? GRADES[toGradeIndex].name : "N/A"

                                                        return (
                                                            <div key={i} className="flex items-start space-x-4">
                                                                <div className="mt-0.5">
                                                                    <div className="flex h-7 w-7 items-center justify-center rounded-full border bg-background">
                                                                        <GraduationCap className="h-4 w-4" />
                                                                    </div>
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <p className="text-sm font-medium">Promoted to {toGrade}</p>
                                                                    <div className="flex items-center text-xs text-muted-foreground">
                                                                        <span>From {prevGrade}</span>
                                                                        <span className="mx-2">•</span>
                                                                        <span>{year}</span>
                                                                    </div>
                                                                    <p className="text-xs text-muted-foreground">
                                                                        Academic Performance: {Math.floor(Math.random() * 30) + 70}%
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-lg border p-4">
                                            <div className="space-y-3">
                                                <h4 className="font-medium">Promotion Eligibility</h4>

                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm">Current Grade</p>
                                                        <p className="text-sm font-medium">{selectedStudent.currentGrade}</p>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm">Next Grade</p>
                                                        <p className="text-sm font-medium">{selectedStudent.nextGrade}</p>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm">Status</p>
                                                        <div>{renderStatusBadge(selectedStudent.status)}</div>
                                                    </div>
                                                </div>

                                                {selectedStudent.status !== "graduated" && (
                                                    <Button
                                                        className="w-full mt-4"
                                                        onClick={() => {
                                                            setSelectedStudents([selectedStudent.id])
                                                            setStudentDetailId(null)
                                                            setIsPromoteDialogOpen(true)
                                                        }}
                                                    >
                                                        <GraduationCap className="mr-2 h-4 w-4" />
                                                        Promote to {selectedStudent.nextGrade}
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </>
    )
}

