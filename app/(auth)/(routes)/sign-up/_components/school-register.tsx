"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Building2,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Eye,
    EyeOff,
    Loader2,
    MapPin,
    School,
    Upload,
    User,
    X,
    BookOpen,
    Users,
    Calendar,
    BarChart3,
    MessageSquare,
    FileText,
    Settings,
    CreditCard,
    Youtube,
    Lock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { motion } from 'framer-motion';
import { registerUser } from "@/lib/actions/register.actions"
import { toast } from "@/hooks/use-toast"

// Form schemas for each step
const schoolInfoSchema = z.object({
    schoolName: z.string().min(3, { message: "School name must be at least 3 characters" }),
    type: z.string().min(1, { message: "Please select school type" }),
    addresses: z.object({
        schoolAddress: z.string().min(2, { message: "Address must be at least 2 characters" }),
        schoolCity: z.string().min(2, { message: "Address must be at least 2 characters" }),
        schoolState: z.string().min(2, { message: "Address must be at least 2 characters" }),
        schoolZipcode: z.string().min(2, { message: "Address must be at least 2 characters" }),
        schoolCountry: z.string().min(2, { message: "Address must be at least 5 characters" }),
    }),
    schoolPhone: z.string().min(5, { message: "Phone number is required" }),
    website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
    foundedYear: z.string().regex(/^\d{4}$/, { message: "Please enter a valid year (YYYY)" }),
    description: z.string().max(500, { message: "Description must be less than 500 characters" }).optional(),
})

const adminInfoSchema = z
    .object({
        fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
        email: z.string().email({ message: "Please enter a valid email address" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
            .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
            .regex(/[0-9]/, { message: "Password must contain at least one number" })
            .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
        confirmPassword: z.string(),
        position: z.string().min(2, { message: "Position is required" }),
        phoneNumber: z.string().min(5, { message: "Phone number is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

const modulesSchema = z.object({
    modules: z.object({
        dashboard: z.boolean().default(true),
        systemConfig: z.boolean().default(true),
        classManagement: z.boolean().default(true),
        studentManagement: z.boolean().default(true),
        employeeManagement: z.boolean().default(true),
        examsManagement: z.boolean().default(false),
        inventory: z.boolean().default(false),
        hostelManagement: z.boolean().default(false),
        library: z.boolean().default(false),
        depositAndExpense: z.boolean().default(false),
        message: z.boolean().default(false),
        report: z.boolean().default(false),
        canteenManagement: z.boolean().default(false),
        transportManagement: z.boolean().default(false),
        feesManagement: z.boolean().default(false),
        hrManagement: z.boolean().default(false),
        healthManagement: z.boolean().default(false),
        history: z.boolean().default(true),
        trash: z.boolean().default(true),
    })

})

const planSchema = z.object({
    plan: z.enum(["basic", "pro", "custom"], {
        required_error: "Please select a subscription plan",
    }),
    acceptTerms: z.literal(true, {
        errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
})

// Combined schema types
type SchoolInfoValues = z.infer<typeof schoolInfoSchema>
type AdminInfoValues = z.infer<typeof adminInfoSchema>
type ModulesValues = z.infer<typeof modulesSchema>
type PlanValues = z.infer<typeof planSchema>

// Module descriptions for the form
const moduleDescriptions = {
    dashboard: "Dashboard",
    systemConfig: "System Configuration",
    classManagement: "Class Management",
    studentManagement: "Student Management",
    employeeManagement: "Employee Management",
    examsManagement: "Exams Management",
    inventory: "Inventory Management",
    hostelManagement: "Hostel Management",
    library: "Library Management",
    depositAndExpense: "Deposit and Expense Management",
    message: "Messaging System",
    report: "Reporting and Analytics",
    canteenManagement: "Canteen Management",
    transportManagement: "Transport Management",
    feesManagement: "Fees Management",
    hrManagement: "HR Management",
    healthManagement: "Health Management",
    history: "History Tracking",
    trash: "Trash Management"
}

export default function SchoolRegistrationForm() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<SchoolInfoValues & AdminInfoValues & ModulesValues & PlanValues>({
        // School Info
        schoolName: "",
        type: "",
        addresses: {
            schoolAddress: "",
            schoolCity: "",
            schoolState: "",
            schoolZipcode: "",
            schoolCountry: "",
        },
        schoolPhone: "",
        website: "",
        foundedYear: "",
        description: "",

        // Admin Info
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        position: "",
        phoneNumber: "",

        // Modules
        modules: {
            dashboard: true,
            systemConfig: true,
            classManagement: true,
            studentManagement: true,
            employeeManagement: true,
            examsManagement: false,
            inventory: false,
            hostelManagement: false,
            library: false,
            depositAndExpense: false,
            message: false,
            report: false,
            canteenManagement: false,
            transportManagement: false,
            feesManagement: false,
            hrManagement: false,
            healthManagement: false,
            history: true,
            trash: true,
        },


        // Plan
        plan: "basic" as const,
        acceptTerms: false,
    })

    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Form for step 1 - School Information
    const schoolInfoForm = useForm<SchoolInfoValues>({
        resolver: zodResolver(schoolInfoSchema),
        defaultValues: {
            schoolName: formData.schoolName,
            type: formData.type,
            addresses: formData.addresses,
            schoolPhone: formData.schoolPhone,
            website: formData.website,
            foundedYear: formData.foundedYear,
            description: formData.description,
        },
    })

    // Form for step 2 - Admin Information
    const adminInfoForm = useForm<AdminInfoValues>({
        resolver: zodResolver(adminInfoSchema),
        defaultValues: {
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            position: formData.position,
            phoneNumber: formData.phoneNumber,
        },
    })

    // Form for step 3 - Module Selection
    const modulesForm = useForm<ModulesValues>({
        resolver: zodResolver(modulesSchema),
        defaultValues: {
            modules: {
                dashboard: formData.modules.dashboard,
                systemConfig: formData.modules.systemConfig,
                classManagement: formData.modules.classManagement,
                studentManagement: formData.modules.studentManagement,
                employeeManagement: formData.modules.employeeManagement,
                examsManagement: formData.modules.examsManagement,
                inventory: formData.modules.inventory,
                hostelManagement: formData.modules.hostelManagement,
                library: formData.modules.library,
                depositAndExpense: formData.modules.depositAndExpense,
                message: formData.modules.message,
                report: formData.modules.report,
                canteenManagement: formData.modules.canteenManagement,
                transportManagement: formData.modules.transportManagement,
                feesManagement: formData.modules.feesManagement,
                hrManagement: formData.modules.hrManagement,
                healthManagement: formData.modules.healthManagement,
                history: formData.modules.history,
                trash: formData.modules.trash,

            }
        },
    })

    // Form for step 4 - Plan Selection
    const planForm = useForm<PlanValues>({
        resolver: zodResolver(planSchema),
        defaultValues: {
            plan: formData.plan,
            acceptTerms: formData.acceptTerms,
        },
    });

    // const acceptTerms = planForm.watch("acceptTerms")

    // Calculate password strength
    const calculatePasswordStrength = (password: string) => {
        if (!password) return 0

        let strength = 0
        if (password.length >= 8) strength += 20
        if (password.match(/[A-Z]/)) strength += 20
        if (password.match(/[a-z]/)) strength += 20
        if (password.match(/[0-9]/)) strength += 20
        if (password.match(/[^A-Za-z0-9]/)) strength += 20

        return strength
    }

    const passwordStrength = calculatePasswordStrength(adminInfoForm.watch("password") || "")

    // Handle step 1 submission - School Information
    const onSchoolInfoSubmit = (data: SchoolInfoValues) => {
        setFormData({ ...formData, ...data })
        setStep(2)
        window.scrollTo(0, 0)
    }

    // Handle step 2 submission - Admin Information
    const onAdminInfoSubmit = (data: AdminInfoValues) => {
        setFormData({ ...formData, ...data })
        setStep(3)
        window.scrollTo(0, 0)
    }

    // Handle step 3 submission - Module Selection
    const onModulesSubmit = (data: ModulesValues) => {
        setFormData({ ...formData, ...data })
        setStep(4)
        window.scrollTo(0, 0)
    }

    // Handle step 4 submission - Plan Selection
    const onPlanSubmit = async (data: PlanValues) => {
        setIsSubmitting(true)

        // Combine all form data
        const completeFormData = {
            ...formData,
            ...data,
        }

        // Simulate API call
        try {
            console.log("Form submitted:", completeFormData)
            await registerUser(completeFormData);
            toast({
                title: "Registration Successful",
                description: "Your school has been registered successfully.",
            })
            // Navigate to success page or show success state
            setStep(5)
            window.scrollTo(0, 0)
        } catch (error) {
            console.error("Error submitting form:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    // Handle going back to previous step
    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1)
            window.scrollTo(0, 0)
        }
    }

    // Calculate the number of selected modules
    const selectedModulesCount = Object.values(modulesForm.watch()).filter(Boolean).length

    return (
        <div className="space-y-4">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
                    <School className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold  text-foreground">CampusIQ Sign up</h1>
                <p className="text-muted-foreground max-w-md">
                    Complete the registration process to set up your school management system
                </p>
            </div>

            {/* Progress bar */}
            {step < 5 && (
                <div className="relative ">
                    <Progress value={(step / 4) * 100} className="h-2" />
                    <div className="absolute top-4 w-full flex justify-between">
                        <div className={`flex flex-col items-center ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                            >
                                <Building2 className="h-4 w-4" />
                            </div>
                            <span className="text-xs mt-1">School</span>
                        </div>
                        <div className={`flex flex-col items-center ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                            >
                                <User className="h-4 w-4" />
                            </div>
                            <span className="text-xs mt-1">Admin</span>
                        </div>
                        <div className={`flex flex-col items-center ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                            >
                                <BookOpen className="h-4 w-4" />
                            </div>
                            <span className="text-xs mt-1">Modules</span>
                        </div>
                        <div className={`flex flex-col items-center ${step >= 4 ? "text-primary" : "text-muted-foreground"}`}>
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 4 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                            >
                                <CreditCard className="h-4 w-4" />
                            </div>
                            <span className="text-xs mt-1">Plan</span>
                        </div>
                    </div>
                </div>
            )}

            <Card className="w-full shadow-lg mt-12">

                <CardContent className="pt-12">
                    {/* Step 1: School Information */}
                    {step === 1 && (
                        <Form {...schoolInfoForm}>
                            <form onSubmit={schoolInfoForm.handleSubmit(onSchoolInfoSubmit)} className="space-y-6">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={schoolInfoForm.control}
                                        name="schoolName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>School Name*</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Westview High School" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={schoolInfoForm.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>School Type*</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select school type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="public">Public</SelectItem>
                                                        <SelectItem value="private">Private</SelectItem>
                                                        {/* <SelectItem value="elementary">Elementary School</SelectItem>
                                                        <SelectItem value="middle">Middle School</SelectItem>
                                                        <SelectItem value="high">High School</SelectItem>
                                                        <SelectItem value="k12">K-12 School</SelectItem>
                                                        <SelectItem value="college">College/University</SelectItem>
                                                        <SelectItem value="vocational">Vocational/Technical</SelectItem>
                                                        <SelectItem value="special">Special Education</SelectItem> */}
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={schoolInfoForm.control}
                                        name="foundedYear"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Year Founded*</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="2005" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={schoolInfoForm.control}
                                        name="schoolPhone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number*</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+1 (555) 123-4567" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={schoolInfoForm.control}
                                        name="website"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Website</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://www.yourschool.edu" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <h3 className="text-lg font-medium">Address Information</h3>
                                    </div>

                                    <FormField
                                        control={schoolInfoForm.control}
                                        name="addresses.schoolAddress"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Street Address*</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="123 Education Lane" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <FormField
                                            control={schoolInfoForm.control}
                                            name="addresses.schoolCity"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>City*</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Springfield" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={schoolInfoForm.control}
                                            name="addresses.schoolState"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>State/Province*</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="IL" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={schoolInfoForm.control}
                                            name="addresses.schoolZipcode"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Zip/Postal Code*</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="62704" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={schoolInfoForm.control}
                                        name="addresses.schoolCountry"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Country*</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select country" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="au">Australia</SelectItem>
                                                        <SelectItem value="ca">Canada</SelectItem>
                                                        <SelectItem value="fr">France</SelectItem>
                                                        <SelectItem value="de">Germany</SelectItem>
                                                        <SelectItem value="gh">Ghana</SelectItem>
                                                        <SelectItem value="in">India</SelectItem>
                                                        <SelectItem value="uk">United Kingdom</SelectItem>
                                                        <SelectItem value="us">United States</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={schoolInfoForm.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>School Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Brief description of your school..."
                                                    className="resize-none min-h-[100px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>{field.value?.length || 0}/500 characters</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-end">
                                    <Button type="submit" className="w-full md:w-auto">
                                        Continue <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    )}

                    {/* Step 2: Administrator Account */}
                    {step === 2 && (
                        <Form {...adminInfoForm}>
                            <form onSubmit={adminInfoForm.handleSubmit(onAdminInfoSubmit)} className="space-y-6">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={adminInfoForm.control}
                                        name="fullName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name*</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={adminInfoForm.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email*</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="john.smith@school.edu" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={adminInfoForm.control}
                                        name="position"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Position*</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Principal" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={adminInfoForm.control}
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number*</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+1 (555) 987-6543" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <h3 className="text-lg font-medium">Account Credentials</h3>
                                    </div>

                                    <FormField
                                        control={adminInfoForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password*</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        >
                                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                                        </Button>
                                                    </div>
                                                </FormControl>
                                                {field.value && (
                                                    <>
                                                        <div className="mt-2">
                                                            <Progress
                                                                value={passwordStrength}
                                                                className="h-2"
                                                                style={{
                                                                    background:
                                                                        passwordStrength < 40 ? "#ef4444" : passwordStrength < 80 ? "#f59e0b" : "#22c55e",
                                                                }}
                                                            />
                                                        </div>
                                                        <FormDescription className="text-xs mt-1">
                                                            Password strength:{" "}
                                                            {passwordStrength < 40 ? "Weak" : passwordStrength < 80 ? "Medium" : "Strong"}
                                                        </FormDescription>
                                                    </>
                                                )}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={adminInfoForm.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password*</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="••••••••" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex justify-between">
                                    <Button type="button" variant="outline" onClick={handleBack}>
                                        <ChevronLeft className="mr-2 h-4 w-4" /> Back
                                    </Button>
                                    <Button type="submit">
                                        Continue <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    )}

                    {/* Step 3: Module Selection */}
                    {step === 3 && (
                        <Form {...modulesForm}>
                            <form onSubmit={modulesForm.handleSubmit(onModulesSubmit)} className="space-y-6">
                                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <BookOpen className="h-5 w-5 text-primary mr-2" />
                                            <h3 className="font-medium">Selected Modules: {selectedModulesCount}/8</h3>
                                        </div>
                                        <Badge variant="outline" className="bg-background">
                                            {selectedModulesCount > 0 ? `${selectedModulesCount} selected` : "None selected"}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Select the modules you want to include in your school management system. You can add or remove
                                        modules later.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={modulesForm.control}
                                        name="modules.dashboard"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox disabled checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <Users className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">Dashboard</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">{moduleDescriptions.dashboard}</FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={modulesForm.control}
                                        name="modules.systemConfig"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox disabled checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <Users className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">System Configuration</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">{moduleDescriptions.systemConfig}</FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={modulesForm.control}
                                        name="modules.classManagement"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox disabled checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <Calendar className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">Academics Management</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">{moduleDescriptions.classManagement}</FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={modulesForm.control}
                                        name="modules.studentManagement"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox disabled checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <BarChart3 className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">Student Management</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">{moduleDescriptions.studentManagement}</FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={modulesForm.control}
                                        name="modules.employeeManagement"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox disabled checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <MessageSquare className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">Employee Management</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">{moduleDescriptions.employeeManagement}</FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={modulesForm.control}
                                        name="modules.examsManagement"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <FileText className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">Exams Management</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">{moduleDescriptions.examsManagement}</FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={modulesForm.control}
                                        name="modules.inventory"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <CreditCard className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">Inventory Management</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">
                                                        {moduleDescriptions.inventory}
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={modulesForm.control}
                                        name="modules.hostelManagement"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <Settings className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">Hostel management</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">
                                                        {moduleDescriptions.hostelManagement}
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={modulesForm.control}
                                        name="modules.library"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <Settings className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">Library management</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">
                                                        {moduleDescriptions.library}
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={modulesForm.control}
                                        name="modules.depositAndExpense"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <Settings className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">Manage Deposit and Expenses</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">
                                                        {moduleDescriptions.depositAndExpense}
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={modulesForm.control}
                                        name="modules.canteenManagement"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <Settings className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">Canteen management</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">
                                                        {moduleDescriptions.canteenManagement}
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={modulesForm.control}
                                        name="modules.feesManagement"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <Settings className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">Fees management</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">
                                                        {moduleDescriptions.feesManagement}
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={modulesForm.control}
                                        name="modules.transportManagement"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <Settings className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">Transport management</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">
                                                        {moduleDescriptions.transportManagement}
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={modulesForm.control}
                                        name="modules.hrManagement"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <Settings className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">HR management</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">
                                                        {moduleDescriptions.hrManagement}
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={modulesForm.control}
                                        name="modules.healthManagement"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <Settings className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">Health management</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">
                                                        {moduleDescriptions.healthManagement}
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={modulesForm.control}
                                        name="modules.message"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <Settings className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">Messaging System</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">
                                                        {moduleDescriptions.message}
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={modulesForm.control}
                                        name="modules.report"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <Settings className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">View Reports</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">
                                                        {moduleDescriptions.report}
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={modulesForm.control}
                                        name="modules.history"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox disabled checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <Settings className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">View History</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">
                                                        {moduleDescriptions.history}
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={modulesForm.control}
                                        name="modules.trash"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox disabled checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <Settings className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">Access Trash</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">
                                                        {moduleDescriptions.trash}
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex justify-between">
                                    <Button type="button" variant="outline" onClick={handleBack}>
                                        <ChevronLeft className="mr-2 h-4 w-4" /> Back
                                    </Button>
                                    <Button type="submit">
                                        Continue <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    )}

                    {/* Step 4: Plan Selection */}
                    {step === 4 && (
                        <Form {...planForm}>
                            <form onSubmit={planForm.handleSubmit(onPlanSubmit)} className="space-y-6 mt-10">
                                <FormField
                                    control={planForm.control}
                                    name="plan"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Subscription Plan</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-2"
                                                >
                                                    {[
                                                        {
                                                            value: "basic",
                                                            label: "Basic Plan",
                                                            price: "Gh₵5 per student/month",

                                                        },
                                                        {
                                                            value: "pro",
                                                            label: "Pro Plan",
                                                            price: "Gh₵10 per student/month",

                                                        }
                                                    ].map((plan) => (
                                                        <FormItem key={plan.value} className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value={plan.value} />
                                                            </FormControl>
                                                            <motion.div
                                                                className="flex-1 p-4 border rounded-md"
                                                                whileHover={{ scale: 1.02 }}
                                                                transition={{ type: "spring", stiffness: 300 }}
                                                            >
                                                                <FormLabel className="font-semibold text-lg">{plan.label} {""} {plan.value === "pro" && <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-md">
                                                                    Recommended
                                                                </span>}</FormLabel>
                                                                <p className="text-sm text-gray-600 mb-2">{plan.price}</p>
                                                            </motion.div>
                                                        </FormItem>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <p className="text-lg text-foreground font-medium mt-4">
                                    Check the{" "}
                                    <Link
                                        href="/pricing"
                                        className="text-primary/90 hover:text-primary font-semibold underline decoration-dashed underline-offset-4 transition-all duration-300"
                                    >
                                        pricing page
                                    </Link>
                                </p>

                                <FormField
                                    control={planForm.control}
                                    name="acceptTerms"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    I accept the{" "}
                                                    <Link href="/term" className="text-primary underline">
                                                        Terms of Service
                                                    </Link>
                                                    ,{" "}
                                                    <Link href="/privacy" className="text-primary underline">
                                                        Privacy Policy
                                                    </Link>
                                                    , and{" "}
                                                    <Link href="/subscription_agreement" className="text-primary underline">
                                                        Subscription Agreement
                                                    </Link>
                                                </FormLabel>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-between">
                                    <Button type="button" variant="outline" onClick={handleBack}>
                                        <ChevronLeft className="mr-2 h-4 w-4" /> Back
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting || !planForm.watch("acceptTerms")}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing
                                            </>
                                        ) : (
                                            "Complete Registration"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    )}

                    {/* Step 5: Success */}
                    {step === 5 && (
                        <div className="flex flex-col items-center justify-center py-6 text-center space-y-6">
                            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                                <CheckCircle2 className="h-10 w-10 text-primary" />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">Registration Complete!</h3>
                                <p className="text-muted-foreground max-w-md mx-auto">
                                    Your school management system has been successfully set up and is ready to use.
                                </p>
                            </div>

                            <div className="bg-muted/50 rounded-lg p-6 w-full max-w-md mx-auto">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <School className="h-5 w-5 text-primary mr-2" />
                                        <span className="font-medium">Account Details</span>
                                    </div>
                                </div>

                                <div className="space-y-3 text-left">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">School:</span>
                                        <span className="font-medium">{formData.schoolName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Admin Email:</span>
                                        <span className="font-medium">{formData.email}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Plan:</span>
                                        <span className="font-medium">{formData.plan}</span>
                                    </div>

                                </div>
                            </div>

                            <div className="space-y-4 w-full">
                                <p className="text-sm text-muted-foreground">
                                    We&apos;ve sent a confirmation email with your login details and next steps.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button onClick={() => router.push("/sign-in")} className="flex-1 sm:flex-initial">
                                        <Lock className="w-4 h-4" />
                                        Go to Sign In
                                    </Button>
                                    <Button variant="outline" onClick={() => router.push("/help")} className="flex-1 sm:flex-initial">
                                        <Youtube className="w-4 h-4" />
                                        Watch Tutorials
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

