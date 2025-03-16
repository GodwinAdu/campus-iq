"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useParams, usePathname, useRouter } from "next/navigation"
import {
  Shield,
  Search,
  Save,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Info,
  Users,
  BookOpen,
  FileText,
  CreditCard,
  Settings,
  School,
  Calendar,
  Clock,
  Briefcase,
  BookOpenCheck,
  Home,
  Library,
  HeartPulse,
  Loader2,
  Bus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { createRole, updateRole } from "@/lib/actions/role.actions"

// Define the permission schema with Zod
const RoleSchema = z.object({
  name: z.string().min(1, "Role name is required"),
  displayName: z.string().min(1, "Display name is required"),
  description: z.string().min(1, "Description is required"),
  permissions: z.object({
    // Global Access
    manageAccess: z.boolean().default(false),

    // Management Access
    systemConfig: z.boolean().default(false),
    classManagement: z.boolean().default(false),
    studentManagement: z.boolean().default(false),
    employeeManagement: z.boolean().default(false),
    manageAttendance: z.boolean().default(false),
    homeWork: z.boolean().default(false),
    frontDesk: z.boolean().default(false),
    studentWellbeing: z.boolean().default(false),
    timetable: z.boolean().default(false),
    onlineLearning: z.boolean().default(false),
    examsManagement: z.boolean().default(false),
    canteenManagement: z.boolean().default(false),
    inventory: z.boolean().default(false),
    hostelManagement: z.boolean().default(false),
    library: z.boolean().default(false),
    transportManagement: z.boolean().default(false),
    feesManagement: z.boolean().default(false),
    hrManagement: z.boolean().default(false),
    depositAndExpense: z.boolean().default(false),
    message: z.boolean().default(false),
    healthManagement: z.boolean().default(false),
    report: z.boolean().default(false),

    // Dashboard Access
    dashboard: z.boolean().default(false),
    viewChart: z.boolean().default(false),
    viewMemberTab: z.boolean().default(false),
    viewEnquiries: z.boolean().default(false),
    viewExpenses: z.boolean().default(false),

    // Roles Access
    addRole: z.boolean().default(false),
    viewRole: z.boolean().default(false),
    editRole: z.boolean().default(false),
    deleteRole: z.boolean().default(false),
    manageRole: z.boolean().default(false),

    // Term Access
    addTerm: z.boolean().default(false),
    editTerm: z.boolean().default(false),
    deleteTerm: z.boolean().default(false),
    manageTerm: z.boolean().default(false),

    // Session Access
    addSession: z.boolean().default(false),
    editSession: z.boolean().default(false),
    deleteSession: z.boolean().default(false),
    manageSession: z.boolean().default(false),

    // Class Access
    addClass: z.boolean().default(false),
    editClass: z.boolean().default(false),
    deleteClass: z.boolean().default(false),
    manageClass: z.boolean().default(false),

    // Subject Access
    addSubject: z.boolean().default(false),
    editSubject: z.boolean().default(false),
    deleteSubject: z.boolean().default(false),
    manageSubject: z.boolean().default(false),

    // Canteen Access
    addCanteen: z.boolean().default(false),
    editCanteen: z.boolean().default(false),
    deleteCanteen: z.boolean().default(false),
    manageCanteen: z.boolean().default(false),

    // Student Access
    addStudent: z.boolean().default(false),
    editStudent: z.boolean().default(false),
    deleteStudent: z.boolean().default(false),
    manageStudent: z.boolean().default(false),

    // Parent Access
    addParent: z.boolean().default(false),
    editParent: z.boolean().default(false),
    deleteParent: z.boolean().default(false),
    manageParent: z.boolean().default(false),

    // Employee Access
    addEmployee: z.boolean().default(false),
    editEmployee: z.boolean().default(false),
    deleteEmployee: z.boolean().default(false),
    manageEmployee: z.boolean().default(false),

    // Attendance Access
    manageStudentAttendance: z.boolean().default(false),
    manageEmployeeAttendance: z.boolean().default(false),

    // Homework Access
    addHomework: z.boolean().default(false),
    viewHomework: z.boolean().default(false),
    editHomework: z.boolean().default(false),
    deleteHomework: z.boolean().default(false),
    manageHomework: z.boolean().default(false),

    // Exams Access
    addExam: z.boolean().default(false),
    viewExam: z.boolean().default(false),
    editExam: z.boolean().default(false),
    deleteExam: z.boolean().default(false),
    manageExam: z.boolean().default(false),

    // HR Access
    addHr: z.boolean().default(false),
    viewHr: z.boolean().default(false),
    editHr: z.boolean().default(false),
    deleteHr: z.boolean().default(false),
    manageHr: z.boolean().default(false),

    // Request Salary Access
    addRequestSalary: z.boolean().default(false),
    viewRequestSalary: z.boolean().default(false),
    editRequestSalary: z.boolean().default(false),
    deleteRequestSalary: z.boolean().default(false),
    manageRequestSalary: z.boolean().default(false),

    // Request Leave Access
    addRequestLeave: z.boolean().default(false),
    viewRequestLeave: z.boolean().default(false),
    editRequestLeave: z.boolean().default(false),
    deleteRequestLeave: z.boolean().default(false),
    manageRequestLeave: z.boolean().default(false),

    // Leave Category Access
    addLeaveCategory: z.boolean().default(false),
    viewLeaveCategory: z.boolean().default(false),
    editLeaveCategory: z.boolean().default(false),
    deleteLeaveCategory: z.boolean().default(false),
    manageLeaveCategory: z.boolean().default(false),

    // Timetable Access
    addTimetable: z.boolean().default(false),
    viewTimetable: z.boolean().default(false),
    editTimetable: z.boolean().default(false),
    deleteTimetable: z.boolean().default(false),
    manageTimetable: z.boolean().default(false),

    // Inventory Access
    addInventory: z.boolean().default(false),
    viewInventory: z.boolean().default(false),
    editInventory: z.boolean().default(false),
    deleteInventory: z.boolean().default(false),
    manageInventory: z.boolean().default(false),

    // Hostel Access
    addHostel: z.boolean().default(false),
    viewHostel: z.boolean().default(false),
    editHostel: z.boolean().default(false),
    deleteHostel: z.boolean().default(false),
    manageHostel: z.boolean().default(false),

    // Library Access
    addLibrary: z.boolean().default(false),
    viewLibrary: z.boolean().default(false),
    editLibrary: z.boolean().default(false),
    deleteLibrary: z.boolean().default(false),
    manageLibrary: z.boolean().default(false),

    // Health Access
    addHealth: z.boolean().default(false),
    viewHealth: z.boolean().default(false),
    editHealth: z.boolean().default(false),
    deleteHealth: z.boolean().default(false),
    manageHealth: z.boolean().default(false),

    // Account Access
    addAccount: z.boolean().default(false),
    viewAccount: z.boolean().default(false),
    editAccount: z.boolean().default(false),
    deleteAccount: z.boolean().default(false),
    manageAccount: z.boolean().default(false),

    // Transport Access
    addTransport: z.boolean().default(false),
    viewTransport: z.boolean().default(false),
    editTransport: z.boolean().default(false),
    deleteTransport: z.boolean().default(false),
    manageTransport: z.boolean().default(false),

    // Fees Access
    addFees: z.boolean().default(false),
    viewFees: z.boolean().default(false),
    editFees: z.boolean().default(false),
    deleteFees: z.boolean().default(false),
    manageFees: z.boolean().default(false),



    // Report Access
    studentReport: z.boolean().default(false),
    financialReport: z.boolean().default(false),
    attendanceReport: z.boolean().default(false),
    hrReport: z.boolean().default(false),
    inventoryReport: z.boolean().default(false),
    libraryReport: z.boolean().default(false),
    transportationReport: z.boolean().default(false),
    canteenReport: z.boolean().default(false),
    healthReport: z.boolean().default(false),
    accountReport: z.boolean().default(false),
  }),
})

// Role presets
const rolePresets = {
  accountant: {
    label: "Accountant",
    description: "Access to student and employee accounts",
    permissions: {
      manageAccess: true,
      inventory: true,
      feesManagement: true,
      depositAndExpense: true,
      message: true,
      report: true,
      dashboard: true,
      viewChart: true,
      viewMemberTab: true,
      viewEnquiries: true,
      viewExpenses: true,
      financialReport: true,
      accountReport: true,

    },
  },
  receptionist: {
    label: "Receptionist",
    description: "Access to reception services",
    permissions: {
      manageAccess: true,
      frontDesk: true,
      dashboard: true,
      viewChart: true,
      viewMemberTab: true,
      viewEnquiries: true,
      viewExpenses: true,
      // Other permissions set appropriately for staff
    },
  },
  teacher: {
    label: "Teacher",
    description: "Access to academic and student features",
    permissions: {
      manageAccess: false,
      classManagement: true,
      studentManagement: true,
      studentWellbeing: true,
      manageAttendance: true,
      homeWork: true,
      timetable: true,
      onlineLearning: true,
      examsManagement: true,
      library: true,
      message: true,
      report: true,
      dashboard: true,
      viewChart: true,
      viewMemberTab: true,
      viewEnquiries: false,
      viewExpenses: false,
      addClass: true,
      viewClass: true,
      editClass: true,
      deleteClass: true,
      manageClass: true,
      addStudent: true,
      viewStudent: true,
      editStudent: true,
      deleteStudent: true,
      manageStudent: true,
      addParent: true,
      viewParent: true,
      editParent: true,
      deleteParent: true,
      manageParent: true,
      addExam: true,
      viewExam: true,
      editExam: true,
      deleteExam: true,
      manageExam: true,
      addHomework: true,
      viewHomework: true,
      editHomework: true,
      deleteHomework: true,
      manageHomework: true,
      addTimetable: true,
      viewTimetable: true,
      editTimetable: true,
      deleteTimetable: true,
      manageTimetable: true,
      addLibrary: true,
      viewLibrary: true,
      editLibrary: true,
      deleteLibrary: true,
      addSubject: true,
      viewSubject: true,
      editSubject: true,
      deleteSubject: true,
      manageSubject: true,
      manageLibrary: true,
      studentReport: true,
      attendanceReport: true,
    },
  },
  librarian: {
    label: "Librarian",
    description: "Access to Library Services",
    permissions: {
      manageAccess: false,
      systemConfig: false,
      classManagement: false,
      studentManagement: true,
      employeeManagement: false,
      manageAttendance: true,
      homeWork: false,
      timetable: true,
      onlineLearning: false,
      examsManagement: false,
      canteenManagement: true,
      inventory: true,
      hostelManagement: true,
      library: true,
      transportManagement: true,
      feesManagement: true,
      hrManagement: false,
      depositAndExpense: true,
      message: true,
      healthManagement: true,
      report: true,
      dashboard: true,
      viewChart: true,
      viewMemberTab: true,
      viewEnquiries: true,
      viewExpenses: true,
      // Other permissions set appropriately for staff
    },
  },
  nurses: {
    label: "Nurse",
    description: "Access to nursing services",
    permissions: {
      message: true,
      healthManagement: true,
      report: true,
      dashboard: true,
      viewChart: true,
      viewMemberTab: true,
      viewHealth: true,
      addHealth: true,
      editHealth: true,
      deleteHealth: true,
      manageHealth: true,
      healthReport: true,
      // Other permissions set appropriately for staff
    },
  },
}

// Permission category definitions
const permissionCategories = {
  global: {
    title: "Global Access",
    icon: <Shield className="h-5 w-5" />,
    permissions: ["manageAccess"],
  },
  management: {
    title: "Management Access",
    icon: <Settings className="h-5 w-5" />,
    permissions: [
      "systemConfig",
      "classManagement",
      "studentManagement",
      "employeeManagement",
      "manageAttendance",
      "homeWork",
      "frontDesk",
      "studentWellbeing",
      "timetable",
      "onlineLearning",
      "examsManagement",
      "canteenManagement",
      "inventory",
      "hostelManagement",
      "library",
      "transportManagement",
      "feesManagement",
      "hrManagement",
      "depositAndExpense",
      "message",
      "healthManagement",
      "report",
    ],
  },
  dashboard: {
    title: "Dashboard Access",
    icon: <BookOpen className="h-5 w-5" />,
    permissions: ["dashboard", "viewChart", "viewMemberTab", "viewEnquiries", "viewExpenses"],
  },
  roles: {
    title: "Roles Access",
    icon: <Users className="h-5 w-5" />,
    permissions: ["addRole", "viewRole", "editRole", "deleteRole", "manageRole"],
  },
  terms: {
    title: "Term Access",
    icon: <Calendar className="h-5 w-5" />,
    permissions: ["addTerm", "editTerm", "deleteTerm", "manageTerm"],
  },
  sessions: {
    title: "Session Access",
    icon: <Clock className="h-5 w-5" />,
    permissions: ["addSession", "editSession", "deleteSession", "manageSession"],
  },
  classes: {
    title: "Class Access",
    icon: <School className="h-5 w-5" />,
    permissions: ["addClass", "editClass", "deleteClass", "manageClass"],
  },
  subjects: {
    title: "Subject Access",
    icon: <BookOpenCheck className="h-5 w-5" />,
    permissions: ["addSubject", "editSubject", "deleteSubject", "manageSubject"],
  },
  canteen: {
    title: "Canteen Access",
    icon: <CreditCard className="h-5 w-5" />,
    permissions: ["addCanteen", "editCanteen", "deleteCanteen", "manageCanteen"],
  },
  students: {
    title: "Student Access",
    icon: <Users className="h-5 w-5" />,
    permissions: ["addStudent", "editStudent", "deleteStudent", "manageStudent"],
  },
  parents: {
    title: "Parent Access",
    icon: <Users className="h-5 w-5" />,
    permissions: ["addParent", "editParent", "deleteParent", "manageParent"],
  },
  employees: {
    title: "Employee Access",
    icon: <Briefcase className="h-5 w-5" />,
    permissions: ["addEmployee", "editEmployee", "deleteEmployee", "manageEmployee"],
  },
  attendance: {
    title: "Attendance Access",
    icon: <Clock className="h-5 w-5" />,
    permissions: ["manageStudentAttendance", "manageEmployeeAttendance"],
  },
  homework: {
    title: "Homework Access",
    icon: <FileText className="h-5 w-5" />,
    permissions: ["addHomework", "viewHomework", "editHomework", "deleteHomework", "manageHomework"],
  },
  exams: {
    title: "Exams Access",
    icon: <BookOpenCheck className="h-5 w-5" />,
    permissions: ["addExam", "viewExam", "editExam", "deleteExam", "manageExam"],
  },
  hr: {
    title: "HR Access",
    icon: <Briefcase className="h-5 w-5" />,
    permissions: ["addHr", "viewHr", "editHr", "deleteHr", "manageHr"],
  },
  salary: {
    title: "Salary Request Access",
    icon: <CreditCard className="h-5 w-5" />,
    permissions: [
      "addRequestSalary",
      "viewRequestSalary",
      "editRequestSalary",
      "deleteRequestSalary",
      "manageRequestSalary",
    ],
  },
  leave: {
    title: "Leave Request Access",
    icon: <Calendar className="h-5 w-5" />,
    permissions: [
      "addRequestLeave",
      "viewRequestLeave",
      "editRequestLeave",
      "deleteRequestLeave",
      "manageRequestLeave",
    ],
  },
  leaveCategory: {
    title: "Leave Category Access",
    icon: <FileText className="h-5 w-5" />,
    permissions: [
      "addLeaveCategory",
      "viewLeaveCategory",
      "editLeaveCategory",
      "deleteLeaveCategory",
      "manageLeaveCategory",
    ],
  },
  timetable: {
    title: "Timetable Access",
    icon: <Calendar className="h-5 w-5" />,
    permissions: ["addTimetable", "viewTimetable", "editTimetable", "deleteTimetable", "manageTimetable"],
  },
  inventory: {
    title: "Inventory Access",
    icon: <FileText className="h-5 w-5" />,
    permissions: ["addInventory", "viewInventory", "editInventory", "deleteInventory", "manageInventory"],
  },
  hostel: {
    title: "Hostel Access",
    icon: <Home className="h-5 w-5" />,
    permissions: ["addHostel", "viewHostel", "editHostel", "deleteHostel", "manageHostel"],
  },
  library: {
    title: "Library Access",
    icon: <Library className="h-5 w-5" />,
    permissions: ["addLibrary", "viewLibrary", "editLibrary", "deleteLibrary", "manageLibrary"],
  },
  health: {
    title: "Health Access",
    icon: <HeartPulse className="h-5 w-5" />,
    permissions: ["addHealth", "viewHealth", "editHealth", "deleteHealth", "manageHealth"],
  },
  account: {
    title: "Account Access",
    icon: <CreditCard className="h-5 w-5" />,
    permissions: ["addAccount", "viewAccount", "editAccount", "deleteAccount", "manageAccount"],
  },
  fees: {
    title: "Fees Management",
    icon: <CreditCard className="h-5 w-5" />,
    permissions: ["addFees", "viewFees", "editFees", "deleteFees", "manageFees"],
  },
  transport: {
    title: "Transport Access",
    icon: <Bus className="h-5 w-5" />,
    permissions: ["addTransport", "viewTransport", "editTransport", "deleteTransport", "manageTransport"],
  },
  report: {
    title: "Report Access",
    icon: <FileText className="h-5 w-5" />,
    permissions: [
      "studentReport",
      "financialReport",
      "attendanceReport",
      "hrReport",
      "inventoryReport",
      "libraryReport",
      "transportationReport",
      "canteenReport",
      "healthReport",
      "accountReport",
    ],
  }
}


// Permission descriptions
const permissionDescriptions = {
  manageAccess: "Full system access with all permissions",
  systemConfig: "Access to system configuration settings",
  classManagement: "Manage classes and related settings",
  studentManagement: "Access student management features",
  employeeManagement: "Access employee management features",
  manageAttendance: "Manage attendance records",
  homeWork: "Manage homework assignments",
  timetable: "Access and manage timetables",
  onlineLearning: "Access online learning features",
  examsManagement: "Manage exams and assessments",
  canteenManagement: "Manage canteen operations",
  inventory: "Access inventory management",
  hostelManagement: "Manage hostel facilities",
  library: "Access library management",
  transportManagement: "Manage transportation",
  feesManagement: "Manage fees and payments",
  hrManagement: "Access HR management features",
  depositAndExpense: "Manage deposits and expenses",
  message: "Access messaging system",
  healthManagement: "Manage health records",
  report: "Access and generate reports",
  // Add descriptions for all other permissions
}

// Function to get a human-readable name from a camelCase permission key
const getReadableName = (key: string) => {
  // Handle special cases
  if (key === "hr") return "HR"
  if (key === "hrManagement") return "HR Management"

  // Convert camelCase to Title Case with spaces
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
}

interface IRole {
  _id?: string
  name?: string
  displayName?: string
  description?: string
  permissions?: Record<string, boolean>
}

const CreateRoleForm = ({ type, initialData }: { type: "create" | "update"; initialData?: IRole }) => {
  const path = usePathname()
  const router = useRouter()
  const params = useParams()
  const { schoolId, userId } = params
  const roleId = initialData?._id as string

  const [searchTerm, setSearchTerm] = useState("")
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)

  // Create default values for the form
  const defaultValues = {
    name: initialData?.name || "",
    displayName: initialData?.displayName || "",
    description: initialData?.description || "",
    permissions:
      initialData?.permissions ||
      Object.fromEntries(Object.keys(RoleSchema.shape.permissions.shape).map((key) => [key, false])),
  }

  // Initialize form with existing permissions or defaults
  const form = useForm<z.infer<typeof RoleSchema>>({
    resolver: zodResolver(RoleSchema),
    defaultValues,
  })

  const { isSubmitting } = form.formState
  const submit = initialData ? "Update" : "Create"
  const submitting = initialData ? "Updating..." : "Creating..."

  // Function to apply a role preset
  const applyRolePreset = (presetKey: string) => {
    if (rolePresets[presetKey as keyof typeof rolePresets]) {
      const preset = rolePresets[presetKey as keyof typeof rolePresets]

      // Get current form values
      const currentValues = form.getValues()

      // Update only the permissions, keeping other fields intact
      form.reset({
        ...currentValues,
        permissions: preset.permissions as any,
      })

      setSelectedPreset(presetKey)

      toast({
        title: `Applied ${preset.label} preset`,
        description: preset.description,
      })
    }
  }

  // Function to toggle all permissions in a category
  const toggleCategoryPermissions = (category: string, value: boolean) => {
    const updatedValues = { ...form.getValues() }

    // Get all permissions in this category
    const permissionsInCategory = permissionCategories[category as keyof typeof permissionCategories].permissions

    // Update all permissions in the category
    permissionsInCategory.forEach((permission) => {
      updatedValues.permissions[permission] = value
    })

    form.reset(updatedValues)
  }

  // Function to check if a permission matches the search term
  const matchesSearch = (permission: string) => {
    if (!searchTerm) return true

    const searchLower = searchTerm.toLowerCase()
    const permissionName = getReadableName(permission).toLowerCase()
    const description = permissionDescriptions[permission as keyof typeof permissionDescriptions]?.toLowerCase()

    return permissionName.includes(searchLower) || (description && description.includes(searchLower))
  }

  // Function to count enabled permissions in a category
  const countEnabledPermissions = (category: string) => {
    const permissions = permissionCategories[category as keyof typeof permissionCategories].permissions
    const values = form.getValues().permissions
    return permissions.filter((p) => values[p]).length
  }

  // Function to get total permissions in a category
  const getTotalPermissions = (category: string) => {
    return permissionCategories[category as keyof typeof permissionCategories].permissions.length
  }

  // Toggle expanding/collapsing all sections
  const toggleAllSections = () => {
    if (expandedSections.length === Object.keys(permissionCategories).length) {
      setExpandedSections([])
    } else {
      setExpandedSections(Object.keys(permissionCategories))
    }
  }

  // Handle form submission
  async function onSubmit(values: z.infer<typeof RoleSchema>) {
    try {
      if (type === "create") {
        await createRole(values, path)
        // console.log(values,"role values")
      } else {
        await updateRole(roleId, values, path)
      }

      form.reset()

      toast({
        title: `Role ${type === "create" ? "Created" : "Updated"} successfully`,
        description: `A role was ${type === "create" ? "created" : "updated"} successfully...`,
      })

      router.push(`/${schoolId}/admin/${userId}/system-config/manage-role`)
    } catch (error) {
      console.log("something went wrong", error)
      toast({
        title: "Something went wrong",
        description: "Please try again later...",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="shadow-md border-0">
            <CardHeader className="bg-gray-50 dark:bg-gray-900 rounded-t-lg border-b">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-2xl font-bold">
                      {type === "create" ? "Create New Role" : "Update Role"}
                    </CardTitle>
                    <CardDescription className="text-base mt-1">
                      {type === "create"
                        ? "Define a new role with specific permissions"
                        : "Modify existing role permissions"}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-8">
              {/* Role Details Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Role Name..." {...field} />
                      </FormControl>
                      <FormDescription>Internal name used by the system</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Display Name..." {...field} />
                      </FormControl>
                      <FormDescription>Name shown to users in the interface</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Write a short description..." {...field} />
                      </FormControl>
                      <FormDescription>Brief explanation of this role&apos;s purpose</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Permissions Section */}
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h2 className="text-xl font-bold">Role Permissions</h2>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Select onValueChange={applyRolePreset} value={selectedPreset || undefined}>
                      <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="Apply preset" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(rolePresets).map(([key, preset]) => (
                          <SelectItem key={key} value={key}>
                            {preset.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search permissions..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={toggleAllSections} className="gap-1">
                      {expandedSections.length === Object.keys(permissionCategories).length ? (
                        <>
                          <ChevronUp className="h-4 w-4" />
                          Collapse All
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" />
                          Expand All
                        </>
                      )}
                    </Button>

                    {searchTerm && (
                      <Badge variant="outline" className="gap-1">
                        <Search className="h-3 w-3" />
                        {searchTerm}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                      <span>Enabled</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="inline-block w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                      <span>Disabled</span>
                    </div>
                  </div>
                </div>

                <Accordion
                  type="multiple"
                  value={expandedSections}
                  onValueChange={setExpandedSections}
                  className="space-y-4"
                >
                  {Object.entries(permissionCategories).map(([category, { title, icon, permissions }]) => {
                    const enabledCount = countEnabledPermissions(category)
                    const totalCount = getTotalPermissions(category)
                    const hasMatchingPermissions = permissions.some((permission) => matchesSearch(permission))

                    if (searchTerm && !hasMatchingPermissions) return null

                    return (
                      <AccordionItem key={category} value={category} className="border rounded-lg overflow-hidden">
                        <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 rounded-md bg-primary/10 text-primary">{icon}</div>
                              <div>
                                <h3 className="font-medium text-left">{title}</h3>
                                <p className="text-sm text-muted-foreground text-left">
                                  {enabledCount} of {totalCount} permissions enabled
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 mr-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 gap-1"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        toggleCategoryPermissions(category, true)
                                      }}
                                    >
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                      <span className="sr-only md:not-sr-only md:inline-block">Enable All</span>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Enable all permissions in this category</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 gap-1"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        toggleCategoryPermissions(category, false)
                                      }}
                                    >
                                      <XCircle className="h-4 w-4 text-red-500" />
                                      <span className="sr-only md:not-sr-only md:inline-block">Disable All</span>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Disable all permissions in this category</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="px-4 py-3 border-t bg-white dark:bg-gray-950">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {permissions.map((permission) => {
                              if (searchTerm && !matchesSearch(permission)) return null

                              return (
                                <FormField
                                  key={permission}
                                  control={form.control}
                                  name={`permissions.${permission}`}
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                      <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                      </FormControl>
                                      <div className="space-y-1 leading-none flex-1">
                                        <FormLabel className="font-medium">{getReadableName(permission)}</FormLabel>
                                        <FormDescription>
                                          {permissionDescriptions[permission as keyof typeof permissionDescriptions] ||
                                            `Control access to ${getReadableName(permission).toLowerCase()} functionality`}
                                        </FormDescription>
                                      </div>
                                    </FormItem>
                                  )}
                                />
                              )
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 p-6 bg-gray-50 dark:bg-gray-900 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4" />
                <span>Changes to permissions will be logged in the audit trail</span>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/${schoolId}/admin/${userId}/system-config/manage-role`)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {isSubmitting ? submitting : submit}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}

export default CreateRoleForm

