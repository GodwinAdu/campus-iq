"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Calendar, Clock, Search, Save, UserCheck, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import ClassSelection from "@/components/commons/ClassSelection"
import { createOrFetchAttendance, updateAttendance } from "@/lib/actions/student-attendance.actions"

interface IStudent {
    _id: string
    fullName: string
    imgUrl?: string
    studentID: string
}

interface IAttendanceRecord {
    _id: string
    studentId: IStudent
    status: "present" | "absent" | "late" | "excused"
    remarks: string
}

interface IAttendance {
    _id: string
    schoolId: string
    classId: string
    date: string
    records: IAttendanceRecord[]
}

// Form schema
const formSchema = z.object({
    attendanceId: z.string(),
    classId: z.string({
        required_error: "Please select a class",
    }),
    date: z.string(),
    records: z.array(
        z.object({
            _id: z.string().optional(),
            studentId: z.string(),
            status: z.enum(["present", "absent", "late", "excused"], {
                required_error: "Please select a status",
            }),
            remarks: z.string().optional(),
        }),
    ),
})

type FormValues = z.infer<typeof formSchema>

export default function AttendanceSystem({ classes }: { classes: IClass[] }) {
    const { toast } = useToast()
    const [date, setDate] = useState<Date>(new Date())
    const [searchQuery, setSearchQuery] = useState("")
    const [bulkAction, setBulkAction] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    const [selectedClass, setSelectedClass] = useState(classes[0]?._id)
    const [attendance, setAttendance] = useState<IAttendance | null>(null)

    // Initialize form
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            attendanceId: "",
            classId: selectedClass || "",
            date: format(date, "yyyy-MM-dd"),
            records: [],
        },
    });

    const { isSubmitting } = form.formState;

    // Fetch attendance data when class changes
    useEffect(() => {
        const fetchAttendance = async () => {
            if (!selectedClass) return

            try {
                setIsLoading(true)
                const data = await createOrFetchAttendance(selectedClass)
                setAttendance(data)

                // Update form values
                form.reset({
                    attendanceId: data._id,
                    classId: selectedClass,
                    date: format(new Date(data.date), "yyyy-MM-dd"),
                    records: data.records.map((record: IAttendanceRecord) => ({
                        _id: record._id,
                        studentId: record.studentId._id,
                        status: record.status,
                        remarks: record.remarks,
                    })),
                })
            } catch (error) {
                console.error("Error fetching attendance:", error)
                toast({
                    title: "Error",
                    description: "Failed to fetch attendance data",
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        }

        fetchAttendance()
    }, [selectedClass, form, toast])

    // Filter students based on search query
    const filteredRecords =
        attendance?.records.filter(
            (record) =>
                record.studentId.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                record.studentId.studentID.toLowerCase().includes(searchQuery.toLowerCase()),
        ) || []

    // Update student status
    const updateStudentStatus = (studentId: string, status: "present" | "absent" | "late" | "excused") => {
        if (!attendance) return

        // Update local state
        const updatedRecords = attendance.records.map((record) =>
            record.studentId._id === studentId ? { ...record, status } : record,
        )
        setAttendance({ ...attendance, records: updatedRecords })

        // Update form values
        const formRecords = form.getValues().records
        const updatedFormRecords = formRecords.map((record) =>
            record.studentId === studentId ? { ...record, status } : record,
        )
        form.setValue("records", updatedFormRecords)
    }

    // Update student remarks
    const updateStudentRemarks = (studentId: string, remarks: string) => {
        if (!attendance) return

        // Update local state
        const updatedRecords = attendance.records.map((record) =>
            record.studentId._id === studentId ? { ...record, remarks } : record,
        )
        setAttendance({ ...attendance, records: updatedRecords })

        // Update form values
        const formRecords = form.getValues().records
        const updatedFormRecords = formRecords.map((record) =>
            record.studentId === studentId ? { ...record, remarks } : record,
        )
        form.setValue("records", updatedFormRecords)
    }

    // Apply bulk action to all students
    const applyBulkAction = () => {
        if (!bulkAction || !attendance) return

        // Update local state
        const updatedRecords = attendance.records.map((record) => ({
            ...record,
            status: bulkAction as "present" | "absent" | "late" | "excused",
        }))
        setAttendance({ ...attendance, records: updatedRecords })

        // Update form values
        const formRecords = form.getValues().records
        const updatedFormRecords = formRecords.map((record) => ({
            ...record,
            status: bulkAction as "present" | "absent" | "late" | "excused",
        }))
        form.setValue("records", updatedFormRecords)
    }

    // Handle form submission
    const onSubmit = async (data: FormValues) => {
        try {

            console.log(data, "values data")
            const result = await updateAttendance(data.attendanceId, data.records)

            if (result) {
                toast({
                    title: "Success!",
                    description: "Attendance has been saved successfully.",
                    variant: "default",
                })

                // Update local state with the result
                setAttendance(result)
            } else {
                throw new Error("Failed to save attendance")
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to save attendance",
                variant: "destructive",
            })
        }
    }

    // Get current class
    const currentClass = classes.find((c) => c._id === selectedClass)

    // Calculate attendance stats
    const attendanceStats = {
        present: attendance?.records.filter((r) => r.status === "present").length || 0,
        absent: attendance?.records.filter((r) => r.status === "absent").length || 0,
        late: attendance?.records.filter((r) => r.status === "late").length || 0,
        excused: attendance?.records.filter((r) => r.status === "excused").length || 0,
        total: attendance?.records.length || 0,
    }

    const attendancePercentage =
        attendanceStats.total > 0 ? Math.round((attendanceStats.present / attendanceStats.total) * 100) : 0

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="container mx-auto py-6 px-4 space-y-8">
                {/* Class Selection and Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="md:col-span-1">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-medium">Select Class</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ClassSelection classes={classes} selectedClass={(value) => setSelectedClass(value)} />

                            {currentClass && (
                                <div className="mt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Total Students:</span>
                                        <span className="font-medium">{attendanceStats.total}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Present Today:</span>
                                        <span className="font-medium">{attendanceStats.present}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Absent Today:</span>
                                        <span className="font-medium">{attendanceStats.absent}</span>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-3">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-medium">Attendance Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                    <div className="font-medium text-green-600 dark:text-green-400">Present</div>
                                    <div className="text-2xl font-bold">{attendanceStats.present}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {attendanceStats.total > 0
                                            ? Math.round((attendanceStats.present / attendanceStats.total) * 100)
                                            : 0}
                                        %
                                    </div>
                                </div>

                                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                    <div className="font-medium text-red-600 dark:text-red-400">Absent</div>
                                    <div className="text-2xl font-bold">{attendanceStats.absent}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {attendanceStats.total > 0 ? Math.round((attendanceStats.absent / attendanceStats.total) * 100) : 0}
                                        %
                                    </div>
                                </div>

                                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                                    <div className="font-medium text-amber-600 dark:text-amber-400">Late</div>
                                    <div className="text-2xl font-bold">{attendanceStats.late}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {attendanceStats.total > 0 ? Math.round((attendanceStats.late / attendanceStats.total) * 100) : 0}%
                                    </div>
                                </div>

                                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                    <div className="font-medium text-purple-600 dark:text-purple-400">Excused</div>
                                    <div className="text-2xl font-bold">{attendanceStats.excused}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {attendanceStats.total > 0
                                            ? Math.round((attendanceStats.excused / attendanceStats.total) * 100)
                                            : 0}
                                        %
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-medium">Attendance Rate</span>
                                    <span className="text-sm font-medium">{attendancePercentage}%</span>
                                </div>
                                <Progress value={attendancePercentage} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Attendance Management */}
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <CardTitle>Student Attendance</CardTitle>
                            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                <div className="relative w-full sm:w-auto">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search students..."
                                        className="pl-8 w-full sm:w-[250px]"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <Select value={bulkAction} onValueChange={setBulkAction}>
                                        <SelectTrigger className="w-full sm:w-[180px]">
                                            <SelectValue placeholder="Mark all as..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="present">Present</SelectItem>
                                            <SelectItem value="absent">Absent</SelectItem>
                                            <SelectItem value="late">Late</SelectItem>
                                            <SelectItem value="excused">Excused</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button type="button" variant="outline" size="icon" onClick={applyBulkAction} disabled={!bulkAction}>
                                        <UserCheck className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                                <span className="ml-2">Loading attendance data...</span>
                            </div>
                        ) : (
                            <>
                                <div className="rounded-md border">
                                    <div className="grid grid-cols-12 bg-muted/50 p-4 text-sm font-medium">
                                        <div className="col-span-5 md:col-span-4">Student</div>
                                        <div className="col-span-2 md:col-span-2 hidden md:block">Student ID</div>
                                        <div className="col-span-5 md:col-span-4">Status</div>
                                        <div className="col-span-2 md:col-span-2 hidden md:block">Remarks</div>
                                    </div>

                                    <div className="divide-y">
                                        {filteredRecords.length > 0 ? (
                                            filteredRecords.map((record) => {
                                                // Find the corresponding index in the form records array
                                                const formIndex = form
                                                    .getValues()
                                                    .records.findIndex((r) => r.studentId === record.studentId._id)

                                                return (
                                                    <div key={record._id} className="grid grid-cols-12 p-4 text-sm items-center">
                                                        <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                                                            <Avatar>
                                                                <AvatarImage src={record.studentId.imgUrl} alt={record.studentId.fullName} />
                                                                <AvatarFallback>{record.studentId.fullName.charAt(0)}</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <div className="font-medium">{record.studentId.fullName}</div>
                                                                <div className="text-xs text-muted-foreground md:hidden">
                                                                    {record.studentId.studentID}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-span-2 md:col-span-2 hidden md:block">
                                                            <div className="text-muted-foreground">{record.studentId.studentID}</div>
                                                        </div>

                                                        <div className="col-span-5 md:col-span-4">
                                                            {formIndex !== -1 && (
                                                                <FormField
                                                                    control={form.control}
                                                                    name={`records.${formIndex}.status`}
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormControl>
                                                                                <RadioGroup
                                                                                    value={record.status}
                                                                                    onValueChange={(value) => {
                                                                                        updateStudentStatus(record.studentId._id, value as any)
                                                                                        field.onChange(value)
                                                                                    }}
                                                                                    className="flex flex-wrap gap-2"
                                                                                >
                                                                                    <div className="flex items-center space-x-1">
                                                                                        <RadioGroupItem value="present" id={`present-${record._id}`} />
                                                                                        <Label
                                                                                            htmlFor={`present-${record._id}`}
                                                                                            className="text-xs px-1.5 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                                                        >
                                                                                            Present
                                                                                        </Label>
                                                                                    </div>

                                                                                    <div className="flex items-center space-x-1">
                                                                                        <RadioGroupItem value="absent" id={`absent-${record._id}`} />
                                                                                        <Label
                                                                                            htmlFor={`absent-${record._id}`}
                                                                                            className="text-xs px-1.5 py-0.5 rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                                                                        >
                                                                                            Absent
                                                                                        </Label>
                                                                                    </div>

                                                                                    <div className="flex items-center space-x-1">
                                                                                        <RadioGroupItem value="late" id={`late-${record._id}`} />
                                                                                        <Label
                                                                                            htmlFor={`late-${record._id}`}
                                                                                            className="text-xs px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                                                                        >
                                                                                            Late
                                                                                        </Label>
                                                                                    </div>

                                                                                    <div className="flex items-center space-x-1">
                                                                                        <RadioGroupItem value="excused" id={`excused-${record._id}`} />
                                                                                        <Label
                                                                                            htmlFor={`excused-${record._id}`}
                                                                                            className="text-xs px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                                                                                        >
                                                                                            Excused
                                                                                        </Label>
                                                                                    </div>
                                                                                </RadioGroup>
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            )}
                                                        </div>

                                                        <div className="col-span-2 md:col-span-2 hidden md:block">
                                                            {formIndex !== -1 && (
                                                                <FormField
                                                                    control={form.control}
                                                                    name={`records.${formIndex}.remarks`}
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormControl>
                                                                                <Textarea
                                                                                    placeholder="Add remarks..."
                                                                                    className="min-h-[60px] text-xs"
                                                                                    value={record.remarks}
                                                                                    onChange={(e) => {
                                                                                        updateStudentRemarks(record.studentId._id, e.target.value)
                                                                                        field.onChange(e.target.value)
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            <div className="p-4 text-center text-muted-foreground">
                                                {searchQuery ? "No students found matching your search." : "No students found in this class."}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Mobile Remarks (shown in accordion when clicked on mobile) */}
                                <div className="mt-6 md:hidden">
                                    <h3 className="font-medium mb-2">Student Remarks</h3>
                                    <div className="space-y-2">
                                        {filteredRecords.map((record) => {
                                            const formIndex = form.getValues().records.findIndex((r) => r.studentId === record.studentId._id)

                                            return (
                                                <div key={`remarks-${record._id}`} className="border rounded-md p-3">
                                                    <div className="font-medium text-sm mb-1">{record.studentId.fullName}</div>
                                                    {formIndex !== -1 && (
                                                        <FormField
                                                            control={form.control}
                                                            name={`records.${formIndex}.remarks`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <Textarea
                                                                            placeholder="Add remarks..."
                                                                            className="min-h-[60px] text-xs"
                                                                            value={record.remarks}
                                                                            onChange={(e) => {
                                                                                updateStudentRemarks(record.studentId._id, e.target.value)
                                                                                field.onChange(e.target.value)
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="flex justify-between mt-6">
                                    <Button type="button" variant="outline">
                                        <Download className="mr-2 h-4 w-4" />
                                        Export
                                    </Button>
                                    <Button type="submit" disabled={ isSubmitting}>
                                        {isSubmitting  ? (
                                            <>
                                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Save Attendance
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}

