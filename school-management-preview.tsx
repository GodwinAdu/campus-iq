"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import zxcvbn from "zxcvbn"
import ReactConfetti from "react-confetti"

// Shadcn UI components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

// Icons
import { Trash2, Plus, Loader2 } from "lucide-react"

// Schemas
const schoolInfoSchema = z.object({
  name: z.string().min(2, "School name must be at least 2 characters"),
  type: z.enum(["public", "private", "charter"]),
  address: z.string().min(5, "Address must be at least 5 characters"),
  departments: z
    .array(
      z.object({
        name: z.string().min(2, "Department name must be at least 2 characters"),
      }),
    )
    .min(1, "At least one department is required"),
})

const adminInfoSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

const subscriptionPlanSchema = z.object({
  plan: z.enum(["basic", "pro", "enterprise"]),
})

const steps = ["School Information", "Admin Information", "Subscription Plan"]

// Components
function ProgressIndicator({ steps, currentStep }: { steps: string[]; currentStep: number }) {
  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            {index < currentStep ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              index + 1
            )}
          </div>
          <span className={`mt-2 text-sm ${index <= currentStep ? "text-blue-600 font-medium" : "text-gray-500"}`}>
            {step}
          </span>
        </div>
      ))}
    </div>
  )
}

function PasswordStrengthMeter({ password }: { password: string }) {
  const [strength, setStrength] = useState(0)

  useEffect(() => {
    setStrength(zxcvbn(password).score)
  }, [password])

  const getColor = () => {
    switch (strength) {
      case 0:
        return "bg-red-500"
      case 1:
        return "bg-orange-500"
      case 2:
        return "bg-yellow-500"
      case 3:
        return "bg-blue-500"
      case 4:
        return "bg-green-500"
      default:
        return "bg-gray-200"
    }
  }

  return (
    <div className="mt-2">
      <Progress value={(strength / 4) * 100} className={`h-2 ${getColor()}`} />
      <p className="text-sm mt-1 text-gray-600">
        {strength === 0 && "Very weak"}
        {strength === 1 && "Weak"}
        {strength === 2 && "Fair"}
        {strength === 3 && "Good"}
        {strength === 4 && "Strong"}
      </p>
    </div>
  )
}

function Confetti() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <ReactConfetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={200} />
}

// Form Components
function SchoolInfoForm({ onNext }: { onNext: (data: z.infer<typeof schoolInfoSchema>) => void }) {
  const form = useForm<z.infer<typeof schoolInfoSchema>>({
    resolver: zodResolver(schoolInfoSchema),
    defaultValues: {
      name: "",
      type: "public",
      address: "",
      departments: [{ name: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "departments",
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter school name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select school type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="charter">Charter</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter school address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormLabel>Departments</FormLabel>
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`departments.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2 mt-2">
                      <Input placeholder="Enter department name" {...field} />
                      <Button type="button" variant="outline" size="icon" onClick={() => remove(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append({ name: "" })}>
            <Plus className="h-4 w-4 mr-2" />
            Add Department
          </Button>
        </div>
        <Button type="submit" className="w-full">
          Next
        </Button>
      </form>
    </Form>
  )
}

function AdminInfoForm({
  onNext,
  onBack,
}: { onNext: (data: z.infer<typeof adminInfoSchema>) => void; onBack: () => void }) {
  const form = useForm<z.infer<typeof adminInfoSchema>>({
    resolver: zodResolver(adminInfoSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter admin name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter admin email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter password" {...field} />
              </FormControl>
              <PasswordStrengthMeter password={field.value} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  )
}

function SubscriptionPlanForm({
  onSubmit,
  onBack,
  isSubmitting,
}: { onSubmit: (data: z.infer<typeof subscriptionPlanSchema>) => void; onBack: () => void; isSubmitting: boolean }) {
  const form = useForm<z.infer<typeof subscriptionPlanSchema>>({
    resolver: zodResolver(subscriptionPlanSchema),
    defaultValues: {
      plan: "basic",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
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
                      price: "$9.99/month",
                      features: ["Up to 100 students", "Basic reporting", "Email support"],
                    },
                    {
                      value: "pro",
                      label: "Pro Plan",
                      price: "$19.99/month",
                      features: ["Up to 500 students", "Advanced reporting", "Priority email support", "API access"],
                    },
                    {
                      value: "enterprise",
                      label: "Enterprise Plan",
                      price: "$49.99/month",
                      features: [
                        "Unlimited students",
                        "Custom reporting",
                        "24/7 phone support",
                        "Dedicated account manager",
                        "On-premise deployment option",
                      ],
                    },
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
                        <FormLabel className="font-semibold text-lg">{plan.label}</FormLabel>
                        <p className="text-sm text-gray-600 mb-2">{plan.price}</p>
                        <ul className="text-sm list-disc list-inside">
                          {plan.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </motion.div>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating School
              </>
            ) : (
              "Create School"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

// Main Component
export default function CreateSchoolPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    schoolInfo: {},
    adminInfo: {},
    subscriptionPlan: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { toast } = useToast()

  const handleNext = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    const finalData = { ...formData, ...data }
    console.log("Submitting data:", finalData)

    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setShowConfetti(true)
    toast({
      title: "School Created Successfully!",
      description: "Your school and admin account have been set up.",
    })
    // Here you would typically send the data to your API
    // await api.createSchool(finalData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-4">
      {showConfetti && <Confetti />}
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-blue-700">Create Your School</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Set up your school and admin account in just a few steps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProgressIndicator steps={steps} currentStep={currentStep} />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && <SchoolInfoForm onNext={handleNext} />}
              {currentStep === 1 && <AdminInfoForm onNext={handleNext} onBack={handleBack} />}
              {currentStep === 2 && (
                <SubscriptionPlanForm onSubmit={handleSubmit} onBack={handleBack} isSubmitting={isSubmitting} />
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}

