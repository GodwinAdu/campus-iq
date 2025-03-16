"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SymptomDetails } from "./symptom-details"
import { Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { BodyMapSelector } from "./body-map-selector"
import { SymptomSelector } from "./symptom-selector"
import { AnalysisResult } from "./analysis-result"

type Step = "select" | "details" | "analysis"

export function SymptomCheckerForm() {
    const [step, setStep] = useState<Step>("select")
    const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null)
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
    const [symptomDetails, setSymptomDetails] = useState({
        duration: "",
        severity: "",
        factors: [] as string[],
        description: "",
    })
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysisResult, setAnalysisResult] = useState<any | null>(null)

    const handleBodyPartSelect = (part: string) => {
        setSelectedBodyPart(part)
    }

    const handleSymptomToggle = (symptom: string) => {
        setSelectedSymptoms((prev) => (prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]))
    }

    const handleDetailsChange = (field: string, value: any) => {
        setSymptomDetails((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleNextStep = () => {
        if (step === "select" && selectedSymptoms.length === 0) {
            toast({
                title: "Please select at least one symptom",
                variant: "destructive",
            })
            return
        }

        if (step === "select") {
            setStep("details")
        } else if (step === "details") {
            setStep("analysis")
            analyzeSymptoms()
        }
    }

    const handlePrevStep = () => {
        if (step === "details") {
            setStep("select")
        } else if (step === "analysis") {
            setStep("details")
        }
    }

    const analyzeSymptoms = async () => {
        setIsAnalyzing(true)

        // Simulate AI analysis with a delay
        await new Promise((resolve) => setTimeout(resolve, 2500))

        // Generate a mock analysis result
        const result = {
            possibleConditions: [
                {
                    name: "Common Cold",
                    probability: "High",
                    description: "A viral infection of the upper respiratory tract.",
                    recommendations: [
                        "Rest and stay hydrated",
                        "Over-the-counter cold medications may help relieve symptoms",
                        "Monitor for fever or worsening symptoms",
                    ],
                },
                {
                    name: "Seasonal Allergies",
                    probability: "Medium",
                    description: "An allergic response to seasonal environmental factors.",
                    recommendations: [
                        "Avoid known allergens when possible",
                        "Consider over-the-counter antihistamines",
                        "Consult with a healthcare provider if symptoms persist",
                    ],
                },
            ],
            urgency: "Low",
            followUpRecommendation: "Schedule a routine appointment with the school nurse for further evaluation.",
            disclaimer:
                "This is an AI-generated preliminary assessment and not a medical diagnosis. Always consult with a healthcare professional for proper medical advice.",
        }

        setAnalysisResult(result)
        setIsAnalyzing(false)

        // Save to history
        const historyItem = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            symptoms: selectedSymptoms,
            bodyPart: selectedBodyPart,
            result: result,
        }

        // In a real app, you would save this to a database or local storage
        console.log("Saving to history:", historyItem)
    }

    const resetForm = () => {
        setStep("select")
        setSelectedBodyPart(null)
        setSelectedSymptoms([])
        setSymptomDetails({
            duration: "",
            severity: "",
            factors: [],
            description: "",
        })
        setAnalysisResult(null)
    }

    return (
        <Card>
            <CardContent className="p-6">
                <Tabs value={step} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="select" onClick={() => step !== "analysis" && setStep("select")} disabled={isAnalyzing}>
                            1. Select Symptoms
                        </TabsTrigger>
                        <TabsTrigger
                            value="details"
                            onClick={() => step === "details" && setStep("details")}
                            disabled={step === "select" || isAnalyzing}
                        >
                            2. Symptom Details
                        </TabsTrigger>
                        <TabsTrigger value="analysis" disabled={step !== "analysis" || isAnalyzing}>
                            3. Analysis
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="select" className="mt-0">
                        <div className="grid md:grid-cols-2 gap-6">
                            <BodyMapSelector selectedPart={selectedBodyPart} onSelectPart={handleBodyPartSelect} />
                            <SymptomSelector
                                bodyPart={selectedBodyPart}
                                selectedSymptoms={selectedSymptoms}
                                onToggleSymptom={handleSymptomToggle}
                            />
                        </div>
                        <div className="flex justify-end mt-6">
                            <Button onClick={handleNextStep} disabled={selectedSymptoms.length === 0}>
                                Next: Add Details
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="details" className="mt-0">
                        <SymptomDetails symptoms={selectedSymptoms} details={symptomDetails} onChange={handleDetailsChange} />
                        <div className="flex justify-between mt-6">
                            <Button variant="outline" onClick={handlePrevStep}>
                                Back
                            </Button>
                            <Button onClick={handleNextStep}>Analyze Symptoms</Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="analysis" className="mt-0">
                        {isAnalyzing ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                                <p className="text-lg font-medium">Analyzing your symptoms...</p>
                                <p className="text-sm text-muted-foreground">
                                    Our AI is processing your information to provide insights
                                </p>
                            </div>
                        ) : (
                            <>
                                <AnalysisResult result={analysisResult} symptoms={selectedSymptoms} />
                                <div className="flex justify-between mt-6">
                                    <Button variant="outline" onClick={handlePrevStep} disabled={isAnalyzing}>
                                        Back
                                    </Button>
                                    <Button onClick={resetForm} disabled={isAnalyzing}>
                                        Start New Check
                                    </Button>
                                </div>
                            </>
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}

