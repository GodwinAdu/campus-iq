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
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"

// Form schemas for each step
const schoolInfoSchema = z.object({
    schoolName: z.string().min(3, { message: "School name must be at least 3 characters" }),
    schoolType: z.string().min(1, { message: "Please select school type" }),
    address: z.string().min(5, { message: "Address must be at least 5 characters" }),
    city: z.string().min(2, { message: "City is required" }),
    state: z.string().min(2, { message: "State/Province is required" }),
    zipCode: z.string().min(1, { message: "Zip/Postal code is required" }),
    country: z.string().min(2, { message: "Country is required" }),
    phone: z.string().min(5, { message: "Phone number is required" }),
    website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
    foundedYear: z.string().regex(/^\d{4}$/, { message: "Please enter a valid year (YYYY)" }),
    description: z.string().max(500, { message: "Description must be less than 500 characters" }).optional(),
})

const adminInfoSchema = z
    .object({
        firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
        lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
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
    studentManagement: z.boolean().default(true),
    staffManagement: z.boolean().default(true),
    attendanceTracking: z.boolean().default(false),
    gradeManagement: z.boolean().default(false),
    communicationTools: z.boolean().default(false),
    reportGeneration: z.boolean().default(false),
    financialManagement: z.boolean().default(false),
    systemConfiguration: z.boolean().default(false),
})

const planSchema = z.object({
    plan: z.enum(["basic", "standard", "premium"], {
        required_error: "Please select a subscription plan",
    }),
    billingCycle: z.enum(["monthly", "annual"], {
        required_error: "Please select a billing cycle",
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
    studentManagement: "Manage student profiles, enrollments, and academic records",
    staffManagement: "Manage staff profiles, assignments, and performance",
    attendanceTracking: "Track student and staff attendance with reports",
    gradeManagement: "Record, calculate, and report student grades and performance",
    communicationTools: "Internal messaging, announcements, and parent communication",
    reportGeneration: "Generate custom reports for academics, attendance, and more",
    financialManagement: "Manage fees, payments, expenses, and financial reports",
    systemConfiguration: "Customize system settings, roles, and permissions",
}

// Plan details for the form
const planDetails = {
    basic: {
        name: "Basic",
        price: { monthly: "$49", annual: "$470" },
        features: [
            "Up to 500 students",
            "Student & Staff Management",
            "Basic Attendance Tracking",
            "Email Support",
            "1 Admin User",
        ],
        recommended: false,
    },
    standard: {
        name: "Standard",
        price: { monthly: "$99", annual: "$950" },
        features: [
            "Up to 1,500 students",
            "All Basic features",
            "Grade Management",
            "Communication Tools",
            "Report Generation",
            "Priority Support",
            "5 Admin Users",
        ],
        recommended: true,
    },
    premium: {
        name: "Premium",
        price: { monthly: "$199", annual: "$1,990" },
        features: [
            "Unlimited students",
            "All Standard features",
            "Financial Management",
            "Advanced System Configuration",
            "API Access",
            "24/7 Premium Support",
            "Unlimited Admin Users",
        ],
        recommended: false,
    },
}

export default function SchoolRegistrationForm() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<SchoolInfoValues & AdminInfoValues & ModulesValues & PlanValues>({
        // School Info
        schoolName: "",
        schoolType: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: "",
        website: "",
        foundedYear: "",
        description: "",

        // Admin Info
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        position: "",
        phoneNumber: "",

        // Modules
        studentManagement: true,
        staffManagement: true,
        attendanceTracking: false,
        gradeManagement: false,
        communicationTools: false,
        reportGeneration: false,
        financialManagement: false,
        systemConfiguration: false,

        // Plan
        plan: "standard" as const,
        billingCycle: "annual" as const,
        acceptTerms: true,
    })

    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [logoPreview, setLogoPreview] = useState<string | null>(null)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const avatarInputRef = useRef<HTMLInputElement>(null)

    // Form for step 1 - School Information
    const schoolInfoForm = useForm<SchoolInfoValues>({
        resolver: zodResolver(schoolInfoSchema),
        defaultValues: {
            schoolName: formData.schoolName,
            schoolType: formData.schoolType,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
            phone: formData.phone,
            website: formData.website,
            foundedYear: formData.foundedYear,
            description: formData.description,
        },
    })

    // Form for step 2 - Admin Information
    const adminInfoForm = useForm<AdminInfoValues>({
        resolver: zodResolver(adminInfoSchema),
        defaultValues: {
            firstName: formData.firstName,
            lastName: formData.lastName,
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
            studentManagement: formData.studentManagement,
            staffManagement: formData.staffManagement,
            attendanceTracking: formData.attendanceTracking,
            gradeManagement: formData.gradeManagement,
            communicationTools: formData.communicationTools,
            reportGeneration: formData.reportGeneration,
            financialManagement: formData.financialManagement,
            systemConfiguration: formData.systemConfiguration,
        },
    })

    // Form for step 4 - Plan Selection
    const planForm = useForm<PlanValues>({
        resolver: zodResolver(planSchema),
        defaultValues: {
            plan: formData.plan,
            billingCycle: formData.billingCycle,
            acceptTerms: formData.acceptTerms,
        },
    })

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

    // Handle logo upload
    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setLogoPreview(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    // Handle avatar upload
    const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setAvatarPreview(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

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
            await new Promise((resolve) => setTimeout(resolve, 2000))
            console.log("Form submitted:", completeFormData)
            

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
                <h1 className="text-3xl font-bold  text-muted">School Management System</h1>
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
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        {step === 1 && "School Information"}
                        {step === 2 && "Administrator Account"}
                        {step === 3 && "Module Selection"}
                        {step === 4 && "Subscription Plan"}
                        {step === 5 && "Registration Complete"}
                    </CardTitle>
                    <CardDescription>
                        {step === 1 && "Provide details about your educational institution"}
                        {step === 2 && "Create an administrator account to manage the system"}
                        {step === 3 && "Select the modules you want to use in your system"}
                        {step === 4 && "Choose a subscription plan that fits your needs"}
                        {step === 5 && "Your school management system is ready to use"}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {/* Step 1: School Information */}
                    {step === 1 && (
                        <Form {...schoolInfoForm}>
                            <form onSubmit={schoolInfoForm.handleSubmit(onSchoolInfoSubmit)} className="space-y-6">
                                <div className="flex flex-col items-center justify-center mb-6">
                                    <div
                                        className="w-32 h-32 rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors mb-2"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        {logoPreview ? (
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={logoPreview || "/placeholder.svg"}
                                                    alt="School logo preview"
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setLogoPreview(null)
                                                        if (fileInputRef.current) fileInputRef.current.value = ""
                                                    }}
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                                <p className="text-xs text-muted-foreground text-center">Upload school logo</p>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleLogoUpload}
                                    />
                                    <p className="text-xs text-muted-foreground">Recommended: 400x400px, PNG or JPG</p>
                                </div>

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
                                        name="schoolType"
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
                                        name="phone"
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
                                        name="address"
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
                                            name="city"
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
                                            name="state"
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
                                            name="zipCode"
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
                                        name="country"
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
                                                        <SelectItem value="us">United States</SelectItem>
                                                        <SelectItem value="ca">Canada</SelectItem>
                                                        <SelectItem value="uk">United Kingdom</SelectItem>
                                                        <SelectItem value="au">Australia</SelectItem>
                                                        <SelectItem value="in">India</SelectItem>
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
                                <div className="flex flex-col items-center justify-center mb-6">
                                    <div
                                        className="w-24 h-24 rounded-full border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors mb-2 overflow-hidden"
                                        onClick={() => avatarInputRef.current?.click()}
                                    >
                                        {avatarPreview ? (
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={avatarPreview || "/placeholder.svg"}
                                                    alt="Admin avatar preview"
                                                    fill
                                                    className="object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-full p-1"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setAvatarPreview(null)
                                                        if (avatarInputRef.current) avatarInputRef.current.value = ""
                                                    }}
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <Upload className="h-6 w-6 text-muted-foreground mb-1" />
                                                <p className="text-xs text-muted-foreground text-center">Upload photo</p>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        ref={avatarInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleAvatarUpload}
                                    />
                                    <p className="text-xs text-muted-foreground">Administrator profile photo</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={adminInfoForm.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name*</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={adminInfoForm.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name*</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Smith" {...field} />
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
                                        name="studentManagement"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <Users className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">Student Management</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">{moduleDescriptions.studentManagement}</FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={modulesForm.control}
                                        name="staffManagement"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <Users className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">Staff Management</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">{moduleDescriptions.staffManagement}</FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={modulesForm.control}
                                        name="attendanceTracking"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <Calendar className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">Attendance Tracking</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">{moduleDescriptions.attendanceTracking}</FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={modulesForm.control}
                                        name="gradeManagement"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <BarChart3 className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">Grade Management</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">{moduleDescriptions.gradeManagement}</FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={modulesForm.control}
                                        name="communicationTools"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <MessageSquare className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">Communication Tools</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">{moduleDescriptions.communicationTools}</FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={modulesForm.control}
                                        name="reportGeneration"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <FileText className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">Report Generation</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">{moduleDescriptions.reportGeneration}</FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={modulesForm.control}
                                        name="financialManagement"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <CreditCard className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">Financial Management</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">
                                                        {moduleDescriptions.financialManagement}
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={modulesForm.control}
                                        name="systemConfiguration"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/5 transition-colors">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <div className="flex items-center">
                                                        <Settings className="h-4 w-4 text-primary mr-2" />
                                                        <FormLabel className="font-medium">System Configuration</FormLabel>
                                                    </div>
                                                    <FormDescription className="text-xs">
                                                        {moduleDescriptions.systemConfiguration}
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
                            <form onSubmit={planForm.handleSubmit(onPlanSubmit)} className="space-y-6">
                                <FormField
                                    control={planForm.control}
                                    name="billingCycle"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>Billing Cycle</FormLabel>
                                            <div className="flex items-center justify-center space-x-4 rounded-lg border p-1">
                                                <Button
                                                    type="button"
                                                    variant={field.value === "monthly" ? "default" : "outline"}
                                                    className={`w-full ${field.value === "monthly" ? "" : "bg-transparent"}`}
                                                    onClick={() => field.onChange("monthly")}
                                                >
                                                    Monthly
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant={field.value === "annual" ? "default" : "outline"}
                                                    className={`w-full ${field.value === "annual" ? "" : "bg-transparent"}`}
                                                    onClick={() => field.onChange("annual")}
                                                >
                                                    Annual (Save 20%)
                                                </Button>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={planForm.control}
                                    name="plan"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>Subscription Plan</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                                >
                                                    {Object.entries(planDetails).map(([planId, plan]) => (
                                                        <div key={planId} className="relative">
                                                            <RadioGroupItem value={planId} id={planId} className="absolute top-4 left-4 z-10" />
                                                            <label
                                                                htmlFor={planId}
                                                                className={`flex flex-col h-full rounded-lg border-2 p-4 cursor-pointer hover:border-primary transition-colors ${field.value === planId ? "border-primary" : ""
                                                                    } ${plan.recommended ? "ring-2 ring-primary ring-offset-2" : ""}`}
                                                            >
                                                                {plan.recommended && <Badge className="self-start mb-2">Recommended</Badge>}
                                                                <div className="font-bold text-xl mb-1">{plan.name}</div>
                                                                <div className="text-3xl font-bold mb-4">
                                                                    {plan.price[planForm.watch("billingCycle") || "monthly"]}
                                                                    <span className="text-sm font-normal text-muted-foreground">
                                                                        /{planForm.watch("billingCycle") === "monthly" ? "mo" : "yr"}
                                                                    </span>
                                                                </div>
                                                                <ul className="space-y-2 mb-4 flex-grow">
                                                                    {plan.features.map((feature, index) => (
                                                                        <li key={index} className="flex items-start">
                                                                            <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                                                                            <span className="text-sm">{feature}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </label>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

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
                                                    <a href="#" className="text-primary underline">
                                                        Terms of Service
                                                    </a>
                                                    ,{" "}
                                                    <a href="#" className="text-primary underline">
                                                        Privacy Policy
                                                    </a>
                                                    , and{" "}
                                                    <a href="#" className="text-primary underline">
                                                        Subscription Agreement
                                                    </a>
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
                                    <Button type="submit" disabled={isSubmitting}>
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
                                        <span className="font-medium">{planDetails[formData.plan].name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Billing:</span>
                                        <span className="font-medium capitalize">{formData.billingCycle}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 w-full">
                                <p className="text-sm text-muted-foreground">
                                    We&apos;ve sent a confirmation email with your login details and next steps.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button onClick={() => router.push("/dashboard")} className="flex-1 sm:flex-initial">
                                        Go to Dashboard
                                    </Button>
                                    <Button variant="outline" onClick={() => router.push("/help")} className="flex-1 sm:flex-initial">
                                        View Documentation
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

