"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

interface SymptomDetailsProps {
    symptoms: string[]
    details: {
        duration: string
        severity: string
        factors: string[]
        description: string
    }
    onChange: (field: string, value: any) => void
}

export function SymptomDetails({ symptoms, details, onChange }: SymptomDetailsProps) {
    const durations = [
        { value: "hours", label: "Hours" },
        { value: "days", label: "Days" },
        { value: "weeks", label: "Weeks" },
        { value: "months", label: "Months" },
    ]

    const severities = [
        { value: "mild", label: "Mild - Noticeable but not interfering with daily activities" },
        { value: "moderate", label: "Moderate - Somewhat interfering with daily activities" },
        { value: "severe", label: "Severe - Significantly interfering with daily activities" },
    ]

    const factors = [
        { value: "afterEating", label: "After eating" },
        { value: "afterExercise", label: "After exercise" },
        { value: "whenResting", label: "When resting" },
        { value: "atNight", label: "At night" },
        { value: "inTheMorning", label: "In the morning" },
        { value: "afterMedication", label: "After taking medication" },
        { value: "stressful", label: "During stressful situations" },
    ]

    const handleFactorToggle = (factor: string) => {
        onChange(
            "factors",
            details.factors.includes(factor) ? details.factors.filter((f) => f !== factor) : [...details.factors, factor],
        )
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle>Selected Symptoms</CardTitle>
                    <CardDescription>You've selected the following symptoms:</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                        {symptoms.map((symptom) => (
                            <li key={symptom}>{symptom}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle>Symptom Duration</CardTitle>
                    <CardDescription>How long have you been experiencing these symptoms?</CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup
                        value={details.duration}
                        onValueChange={(value) => onChange("duration", value)}
                        className="flex flex-wrap gap-4"
                    >
                        {durations.map((duration) => (
                            <div key={duration.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={duration.value} id={`duration-${duration.value}`} />
                                <Label htmlFor={`duration-${duration.value}`}>{duration.label}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle>Symptom Severity</CardTitle>
                    <CardDescription>How severe are your symptoms?</CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup
                        value={details.severity}
                        onValueChange={(value) => onChange("severity", value)}
                        className="space-y-3"
                    >
                        {severities.map((severity) => (
                            <div key={severity.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={severity.value} id={`severity-${severity.value}`} />
                                <Label htmlFor={`severity-${severity.value}`}>{severity.label}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle>Aggravating or Relieving Factors</CardTitle>
                    <CardDescription>When do your symptoms get better or worse?</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {factors.map((factor) => (
                            <div key={factor.value} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`factor-${factor.value}`}
                                    checked={details.factors.includes(factor.value)}
                                    onCheckedChange={() => handleFactorToggle(factor.value)}
                                />
                                <Label htmlFor={`factor-${factor.value}`}>{factor.label}</Label>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle>Additional Details</CardTitle>
                    <CardDescription>Please provide any other relevant information about your symptoms</CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Describe any other details that might be helpful..."
                        value={details.description}
                        onChange={(e) => onChange("description", e.target.value)}
                        className="min-h-[100px]"
                    />
                </CardContent>
            </Card>
        </div>
    )
}

