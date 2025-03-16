"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  Calendar,
  Clock,
  FileText,
  Award,
  AlertCircle,
  Search,
  Filter,
  Bell,
  CalendarIcon,
  BarChart,
} from "lucide-react"
import { format, isAfter, isBefore, isToday } from "date-fns"
import AssignmentSubmissionForm from "./assignment-submission-form"
import SubmissionDetails from "./submission-details"

import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import AssignmentCalendar from "./assignment-calendar"
import AssignmentStats from "./assignment-stats"
// import NotificationsPanel from "./notifications-panel"




const fetchNotifications = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return [
    {
      _id: "1",
      title: "New Assignment Added",
      message: "A new assignment 'Programming Assignment: Data Structures' has been added to Computer Science.",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: false,
      type: "new_assignment",
      relatedId: "4",
    },
    {
      _id: "2",
      title: "Assignment Graded",
      message: "Your submission for 'Introduction to Algebra' has been graded. You received 85/100.",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      read: true,
      type: "grade",
      relatedId: "1",
    },
    {
      _id: "3",
      title: "Upcoming Due Date",
      message: "Reminder: 'Essay on Climate Change' is due in 3 days.",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      read: false,
      type: "reminder",
      relatedId: "2",
    },
  ]
}

export default function StudentAssignmentsPage({assignments,submissions}) {

  const [notifications, setNotifications] = useState([])
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [activeTab, setActiveTab] = useState("assignments")
  const [activeView, setActiveView] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterSubject, setFilterSubject] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
 
  const [showCalendar, setShowCalendar] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(0)

  

  const handleViewAssignment = (assignment) => {
    setSelectedAssignment(assignment)
    setSelectedSubmission(null)
  }

  const handleViewSubmission = (submission) => {
    setSelectedSubmission(submission)
    setSelectedAssignment(null)
  }

  const handleBackToList = () => {
    setSelectedAssignment(null)
    setSelectedSubmission(null)
  }

  const getAssignmentTypeColor = (type) => {
    switch (type) {
      case "homework":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
      case "classwork":
        return "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300"
      case "project":
        return "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
      case "quiz":
        return "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getDueDateStatus = (dueDate) => {
    const now = new Date()
    const diff = dueDate - now
    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24))

    if (daysLeft < 0) return { text: "Overdue", color: "text-red-500" }
    if (daysLeft === 0) return { text: "Due today", color: "text-orange-500" }
    if (daysLeft === 1) return { text: "Due tomorrow", color: "text-yellow-500" }
    return { text: `Due in ${daysLeft} days`, color: "text-green-500" }
  }

  const filteredAssignments = assignments.filter((assignment) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.subjectId.subjectName.toLowerCase().includes(searchQuery.toLowerCase())

    // Subject filter
    const matchesSubject = filterSubject === "all" || assignment.subjectId.subjectName === filterSubject

    // Status filter
    let matchesStatus = true
    if (filterStatus === "upcoming") {
      matchesStatus = isAfter(new Date(assignment.dueDate), new Date())
    } else if (filterStatus === "overdue") {
      matchesStatus = isBefore(new Date(assignment.dueDate), new Date())
    } else if (filterStatus === "today") {
      matchesStatus = isToday(new Date(assignment.dueDate))
    }

    return matchesSearch && matchesSubject && matchesStatus
  })

  const subjects = [...new Set(assignments.map((a) => a.subjectId.subjectName))]

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification._id === id ? { ...notification, read: true } : notification)),
    )
    setUnreadNotifications((prev) => Math.max(0, prev - 1))
  }

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    setUnreadNotifications(0)
  }

  const renderAssignmentSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderSubmissionSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">My Assignments</h1>

        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="flex justify-between items-center">
                  <span>Notifications</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllNotificationsAsRead}
                    disabled={unreadNotifications === 0}
                  >
                    Mark all as read
                  </Button>
                </SheetTitle>
              </SheetHeader>
              {/* <NotificationsPanel
                notifications={notifications}
                onMarkAsRead={markNotificationAsRead}
                onViewItem={(type, id) => {
                  if (type === "new_assignment" || type === "reminder") {
                    const assignment = assignments.find((a) => a._id === id)
                    if (assignment) {
                      setActiveTab("assignments")
                      handleViewAssignment(assignment)
                    }
                  } else if (type === "grade") {
                    const submission = submissions.find((s) => s._id === id)
                    if (submission) {
                      setActiveTab("submissions")
                      handleViewSubmission(submission)
                    }
                  }
                }}
              /> */}
            </SheetContent>
          </Sheet>

          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setShowCalendar(true)
              setShowStats(false)
            }}
          >
            <CalendarIcon className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setShowStats(true)
              setShowCalendar(false)
            }}
          >
            <BarChart className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {showCalendar && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="mb-8"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Assignment Calendar</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowCalendar(false)}>
                &times;
              </Button>
            </CardHeader>
            <CardContent>
              <AssignmentCalendar assignments={assignments} onSelectAssignment={handleViewAssignment} />
            </CardContent>
          </Card>
        </motion.div>
      )}

      {showStats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="mb-8"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Performance Analytics</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowStats(false)}>
                &times;
              </Button>
            </CardHeader>
            <CardContent>
              <AssignmentStats submissions={submissions} />
            </CardContent>
          </Card>
        </motion.div>
      )}

      <Tabs defaultValue="assignments" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="submissions">My Submissions</TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assignments..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Subject</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => setFilterSubject("all")}
                  className={filterSubject === "all" ? "bg-muted" : ""}
                >
                  All Subjects
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {subjects.map((subject) => (
                  <DropdownMenuItem
                    key={subject}
                    onClick={() => setFilterSubject(subject)}
                    className={filterSubject === subject ? "bg-muted" : ""}
                  >
                    {subject}
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => setFilterStatus("all")}
                  className={filterStatus === "all" ? "bg-muted" : ""}
                >
                  All
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilterStatus("upcoming")}
                  className={filterStatus === "upcoming" ? "bg-muted" : ""}
                >
                  Upcoming
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilterStatus("today")}
                  className={filterStatus === "today" ? "bg-muted" : ""}
                >
                  Due Today
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilterStatus("overdue")}
                  className={filterStatus === "overdue" ? "bg-muted" : ""}
                >
                  Overdue
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  {activeView === "grid" ? (
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
                      <rect width="7" height="7" x="3" y="3" rx="1" />
                      <rect width="7" height="7" x="14" y="3" rx="1" />
                      <rect width="7" height="7" x="14" y="14" rx="1" />
                      <rect width="7" height="7" x="3" y="14" rx="1" />
                    </svg>
                  ) : (
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
                      <line x1="3" x2="21" y1="6" y2="6" />
                      <line x1="3" x2="21" y1="12" y2="12" />
                      <line x1="3" x2="21" y1="18" y2="18" />
                    </svg>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setActiveView("grid")}>Grid View</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveView("list")}>List View</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent value="assignments" className="space-y-4">
          <AnimatePresence mode="wait">
            {selectedAssignment ? (
              <motion.div
                key="assignment-detail"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <Button variant="outline" onClick={handleBackToList} className="mb-4 gap-2">
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
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  Back to Assignments
                </Button>

                <Card
                  className="overflow-hidden border-t-4"
                  // style={{ borderTopColor: selectedAssignment.subjectId.color }}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">{selectedAssignment.title}</CardTitle>
                        <CardDescription className="text-lg mt-1 flex items-center gap-2">
                          <span
                            className="inline-block w-3 h-3 rounded-full"
                            // style={{ backgroundColor: selectedAssignment.subjectId.color }}
                          />
                          {selectedAssignment.subjectId.subjectName}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getAssignmentTypeColor(selectedAssignment.assignmentType)}>
                          {selectedAssignment.assignmentType.charAt(0).toUpperCase() +
                            selectedAssignment.assignmentType.slice(1)}
                        </Badge>
                        <span className={`text-sm font-medium ${getDueDateStatus(selectedAssignment.dueDate).color}`}>
                          {getDueDateStatus(selectedAssignment.dueDate).text}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={selectedAssignment.createdBy.imgUrl}
                          alt={selectedAssignment.createdBy.fullName}
                        />
                        <AvatarFallback>{selectedAssignment.createdBy.fullName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <p className="font-medium">{selectedAssignment.createdBy.fullName}</p>
                        <p className="text-muted-foreground">
                          Posted on {format(new Date(selectedAssignment.createdAt), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2">Description</h3>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-muted-foreground whitespace-pre-wrap">{selectedAssignment.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <span>Due: {format(new Date(selectedAssignment.dueDate), "PPP")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-muted-foreground" />
                        <span>Total Marks: {selectedAssignment.totalMarks}</span>
                      </div>
                    </div>

                    {selectedAssignment.attachments.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Attachments</h3>
                        <div className="grid gap-2">
                          {selectedAssignment.attachments.map((attachment, index) => (
                            <Card key={index} className="p-3 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">{attachment}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {attachment.endsWith(".pdf")
                                      ? "PDF Document"
                                      : attachment.endsWith(".docx")
                                        ? "Word Document"
                                        : attachment.endsWith(".xlsx")
                                          ? "Excel Spreadsheet"
                                          : "File"}
                                  </p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" className="gap-1">
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
                                Download
                              </Button>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    <Separator />

                    <AssignmentSubmissionForm assignmentId={selectedAssignment._id} />
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="assignment-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                { filteredAssignments.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-3 mb-4">
                      <AlertCircle className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No assignments found</h3>
                    <p className="text-muted-foreground mt-1">
                      {searchQuery || filterSubject !== "all" || filterStatus !== "all"
                        ? "Try adjusting your filters or search query"
                        : "You don't have any assignments yet"}
                    </p>
                  </div>
                ) : activeView === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAssignments.map((assignment) => (
                      <motion.div
                        key={assignment._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card
                          className="hover:shadow-md transition-all duration-300 overflow-hidden border-t-2"
                          // style={{ borderTopColor: assignment.subjectId.color }}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-xl">{assignment.title}</CardTitle>
                              <Badge className={getAssignmentTypeColor(assignment.assignmentType)}>
                                {assignment.assignmentType.charAt(0).toUpperCase() + assignment.assignmentType.slice(1)}
                              </Badge>
                            </div>
                            <CardDescription className="flex items-center gap-1">
                              <span
                                className="inline-block w-2 h-2 rounded-full"
                                // style={{ backgroundColor: assignment.subjectId.color }}
                              />
                              {assignment.subjectId.subjectName}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground line-clamp-2">{assignment.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className={`text-sm ${getDueDateStatus(assignment.dueDate).color}`}>
                                  {getDueDateStatus(assignment.dueDate).text}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Award className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{assignment.totalMarks} marks</span>
                              </div>
                            </div>
                            <Button className="w-full" onClick={() => handleViewAssignment(assignment)}>
                              View & Submit
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredAssignments.map((assignment) => (
                      <motion.div
                        key={assignment._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card>
                          <div className="flex flex-col md:flex-row md:items-center p-4 gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className="inline-block w-3 h-3 rounded-full"
                                  // style={{ backgroundColor: assignment.subjectId.color }}
                                />
                                <span className="text-sm text-muted-foreground">{assignment.subjectId.subjectName}</span>
                                <Badge className={getAssignmentTypeColor(assignment.assignmentType)}>
                                  {assignment.assignmentType.charAt(0).toUpperCase() +
                                    assignment.assignmentType.slice(1)}
                                </Badge>
                              </div>
                              <h3 className="font-medium text-lg">{assignment.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                                {assignment.description}
                              </p>
                            </div>
                            <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className={`text-sm ${getDueDateStatus(assignment.dueDate).color}`}>
                                  {format(new Date(assignment.dueDate), "MMM d")}
                                </span>
                              </div>
                              <Button size="sm" onClick={() => handleViewAssignment(assignment)}>
                                View
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-4">
          <AnimatePresence mode="wait">
            {selectedSubmission ? (
              <motion.div
                key="submission-detail"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <Button variant="outline" onClick={handleBackToList} className="mb-4 gap-2">
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
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  Back to Submissions
                </Button>

                <SubmissionDetails submission={selectedSubmission} />
              </motion.div>
            ) : (
              <motion.div
                key="submission-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                { submissions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-3 mb-4">
                      <AlertCircle className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No submissions yet</h3>
                    <p className="text-muted-foreground mt-1">You haven&apos;t submitted any assignments yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {submissions.map((submission) => (
                      <motion.div
                        key={submission._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card
                          className="hover:shadow-md transition-all duration-300 overflow-hidden border-t-2"
                          // style={{ borderTopColor: submission.assignmentId.subjectId.color }}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-xl">{submission.assignmentId?.title}</CardTitle>
                              <Badge variant={submission.submission.isMarked ? "default" : "outline"}>
                                {submission.submission.isMarked ? "Graded" : "Pending"}
                              </Badge>
                            </div>
                            <CardDescription className="flex items-center gap-1">
                              <span
                                className="inline-block w-2 h-2 rounded-full"
                                // style={{ backgroundColor: submission.assignmentId.subjectId.color }}
                              />
                              {submission.assignmentId?.subjectId?.subjectName}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                Submitted: {format(new Date(submission.submission.submittedAt), "PPP")}
                              </span>
                            </div>

                            {submission.submission.isMarked ? (
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1">
                                    <Award className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">
                                      {submission.submission.marks} / {submission.assignmentId.totalMarks}
                                    </span>
                                  </div>
                                  <span className="text-sm font-medium">
                                    {Math.round(
                                      (submission.submission.marks / submission.assignmentId.totalMarks) * 100,
                                    )}
                                    %
                                  </span>
                                </div>
                                <Progress
                                  value={(submission.submission.marks / submission.assignmentId.totalMarks) * 100}
                                  className="h-2"
                                />
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">Waiting for grading</span>
                              </div>
                            )}

                            <Button className="w-full" onClick={() => handleViewSubmission(submission)}>
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </div>
  )
}

