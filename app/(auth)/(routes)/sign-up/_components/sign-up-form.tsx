"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Check, Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Form schemas for each step
const personalInfoSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
})

const accountInfoSchema = z
    .object({
        email: z.string().email({ message: "Please enter a valid email address" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
            .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
            .regex(/[0-9]/, { message: "Password must contain at least one number" })
            .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

const preferencesSchema = z.object({
    role: z.string().min(1, { message: "Please select your role" }),
    acceptTerms: z.literal(true, {
        errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
    receiveUpdates: z.boolean().optional(),
})

// Combined schema types
type PersonalInfoValues = z.infer<typeof personalInfoSchema>
type AccountInfoValues = z.infer<typeof accountInfoSchema>
type PreferencesValues = z.infer<typeof preferencesSchema>

export default function SignUpForm() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<PersonalInfoValues & AccountInfoValues & PreferencesValues>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        acceptTerms: true,
        receiveUpdates: false,
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Form for step 1
    const personalInfoForm = useForm<PersonalInfoValues>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            firstName: formData.firstName,
            lastName: formData.lastName,
        },
    })

    // Form for step 2
    const accountInfoForm = useForm<AccountInfoValues>({
        resolver: zodResolver(accountInfoSchema),
        defaultValues: {
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
        },
    })

    // Form for step 3
    const preferencesForm = useForm<PreferencesValues>({
        resolver: zodResolver(preferencesSchema),
        defaultValues: {
            role: formData.role,
            acceptTerms: formData.acceptTerms,
            receiveUpdates: formData.receiveUpdates,
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

    const passwordStrength = calculatePasswordStrength(accountInfoForm.watch("password") || "")

    // Handle step 1 submission
    const onPersonalInfoSubmit = (data: PersonalInfoValues) => {
        setFormData({ ...formData, ...data })
        setStep(2)
    }

    // Handle step 2 submission
    const onAccountInfoSubmit = (data: AccountInfoValues) => {
        setFormData({ ...formData, ...data })
        setStep(3)
    }

    // Handle step 3 submission
    const onPreferencesSubmit = async (data: PreferencesValues) => {
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
            setStep(4)
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
        }
    }

    return (
        <Card className="w-full shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
                <CardDescription>
                    {step < 4
                        ? `Step ${step} of 3 - ${step === 1 ? "Personal Information" : step === 2 ? "Account Setup" : "Preferences"
                        }`
                        : "Registration Complete"}
                </CardDescription>
                {step < 4 && <Progress value={(step / 3) * 100} className="h-2 mt-2" />}
            </CardHeader>

            <CardContent>
                {step === 1 && (
                    <Form {...personalInfoForm}>
                        <form onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)} className="space-y-4">
                            <FormField
                                control={personalInfoForm.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={personalInfoForm.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end">
                                <Button type="submit">Continue</Button>
                            </div>
                        </form>
                    </Form>
                )}

                {step === 2 && (
                    <Form {...accountInfoForm}>
                        <form onSubmit={accountInfoForm.handleSubmit(onAccountInfoSubmit)} className="space-y-4">
                            <FormField
                                control={accountInfoForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="john.doe@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={accountInfoForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
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
                                control={accountInfoForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-between">
                                <Button type="button" variant="outline" onClick={handleBack}>
                                    Back
                                </Button>
                                <Button type="submit">Continue</Button>
                            </div>
                        </form>
                    </Form>
                )}

                {step === 3 && (
                    <Form {...preferencesForm}>
                        <form onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)} className="space-y-4">
                            <FormField
                                control={preferencesForm.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Your Role</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="developer">Developer</SelectItem>
                                                <SelectItem value="designer">Designer</SelectItem>
                                                <SelectItem value="product_manager">Product Manager</SelectItem>
                                                <SelectItem value="student">Student</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={preferencesForm.control}
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
                                                </a>{" "}
                                                and{" "}
                                                <a href="#" className="text-primary underline">
                                                    Privacy Policy
                                                </a>
                                            </FormLabel>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={preferencesForm.control}
                                name="receiveUpdates"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>I would like to receive updates about products and services via email</FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-between">
                                <Button type="button" variant="outline" onClick={handleBack}>
                                    Back
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

                {step === 4 && (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                        <div className="mb-4 rounded-full bg-green-100 p-3">
                            <Check className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="mb-2 text-2xl font-bold">Registration Successful!</h3>
                        <p className="mb-6 text-muted-foreground">
                            Thank you for creating an account. We&#39;ve sent a confirmation email to your inbox.
                        </p>
                        <Button onClick={() => router.push("/dashboard")}>Continue to Dashboard</Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

