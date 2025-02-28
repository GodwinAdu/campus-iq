"use client"

import { useState, useEffect } from "react"
import { BookOpen, GraduationCap, LineChart, Loader2, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export const DashboardLoader = () => {
    const [progress, setProgress] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)

    const loadingSteps = [
        { id: 0, text: "Fetching user data...", icon: Users, completed: false },
        { id: 1, text: "Loading academic records...", icon: BookOpen, completed: false },
        { id: 2, text: "Preparing analytics...", icon: LineChart, completed: false },
        { id: 3, text: "Finalizing dashboard...", icon: GraduationCap, completed: false },
    ]

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 50) {
                    clearInterval(interval)
                    return 50
                }

                // Calculate which step we're on based on progress
                const newStep = Math.floor((prev + 25) / 25) - 1
                if (newStep !== currentStep && newStep >= 0 && newStep < loadingSteps.length) {
                    setCurrentStep(newStep)
                }

                return prev + 1
            })
        }, 50)

        return () => clearInterval(interval)
    }, [currentStep, loadingSteps.length])

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
            <div className="w-full max-w-md">
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <GraduationCap className="h-16 w-16 text-primary animate-pulse" />
                        <div className="absolute -right-1 -top-1">
                            <span className="relative flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
                            </span>
                        </div>
                    </div>
                </div>

                <Card className="border-2 border-primary/10 shadow-lg backdrop-blur-sm bg-card/95">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-center text-xl font-bold">School Management System</CardTitle>
                        <CardDescription className="text-center">Preparing your dashboard experience</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Loading...</span>
                                <span>{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2 w-full bg-secondary" />
                        </div>

                        <div className="space-y-3">
                            {loadingSteps.map((step, index) => {
                                const isActive = currentStep === index
                                const isCompleted = index < currentStep

                                return (
                                    <div
                                        key={step.id}
                                        className={`flex items-center gap-3 rounded-lg p-2 transition-all duration-300 ${isActive
                                                ? "bg-primary/10 text-primary"
                                                : isCompleted
                                                    ? "text-muted-foreground"
                                                    : "text-muted-foreground/50"
                                            }`}
                                    >
                                        <div
                                            className={`rounded-full p-1.5 ${isActive ? "bg-primary/20" : isCompleted ? "bg-primary/5" : "bg-muted"
                                                }`}
                                        >
                                            {isActive ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : isCompleted ? (
                                                <step.icon className="h-4 w-4" />
                                            ) : (
                                                <step.icon className="h-4 w-4 opacity-50" />
                                            )}
                                        </div>
                                        <span className={`text-sm ${isActive ? "font-medium" : ""}`}>{step.text}</span>
                                        {isCompleted && (
                                            <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="12"
                                                    height="12"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        <div className="pt-2">
                            <p className="text-center text-xs text-muted-foreground animate-pulse">
                                {progress < 100 ? "Please wait while we set things up..." : "Ready to launch!"}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-4 flex justify-center">
                    <div className="flex space-x-1">
                        {[0, 1, 2].map((dot) => (
                            <div
                                key={dot}
                                className="h-1.5 w-1.5 rounded-full bg-primary opacity-80 animate-bounce"
                                style={{
                                    animationDelay: `${dot * 0.2}s`,
                                    animationDuration: "1s",
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


