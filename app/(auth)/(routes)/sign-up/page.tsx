"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { ProgressIndicator } from "./_components/progress-indicator"
import { SchoolInfoForm } from "./_components/school-info-form"
import { AdminInfoForm } from "./_components/admin-info-form"
import { SubscriptionPlanForm } from "./_components/subscription-plan-form"
import { Confetti } from "./_components/confetti"
import { registerUser } from "@/lib/actions/register.actions"
import { useRouter } from "next/navigation"

type RegisterProps = {
  confirmPassword: string;
  email: string;
  fullName: string;
  password: string;
  plan: string;
  schoolAddress: string;
  schoolName: string;
  type: string;
}
const steps = ["School Information", "Admin Information", "Subscription Plan"]

export default function CreateSchoolPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const router = useRouter()

  const handleNext = (data: Record<string, unknown>) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }


  const handleSubmit = async (data: Partial<RegisterProps>) => {
    try {
      const finalData = {
        ...formData,
        ...data,
      }
      setIsSubmitting(true)
      await registerUser(finalData);
      router.push("/sign-in")
      toast({
        title: "Success!",
        description: "School created successfully. Please check your email for confirmation.",
        // variant: "success",
      });
      setShowConfetti(true)
    } catch (error) {
      console.log(error)
      toast({
        title: "Something went wrong!",
        description: "Failed to create school. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
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

