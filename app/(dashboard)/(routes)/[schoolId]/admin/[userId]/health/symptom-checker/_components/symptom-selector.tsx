"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"

interface SymptomSelectorProps {
    bodyPart: string | null
    selectedSymptoms: string[]
    onToggleSymptom: (symptom: string) => void
}

// Symptom data organized by body part
const symptomsByBodyPart: Record<string, string[]> = {
    head: [
        "Headache",
        "Dizziness",
        "Blurred vision",
        "Ear pain",
        "Sore throat",
        "Runny nose",
        "Congestion",
        "Facial pain",
        "Jaw pain",
        "Eye redness",
        "Hearing loss",
        "Ringing in ears",
    ],
    chest: [
        "Chest pain",
        "Shortness of breath",
        "Rapid heartbeat",
        "Cough",
        "Wheezing",
        "Difficulty breathing",
        "Chest tightness",
    ],
    abdomen: [
        "Abdominal pain",
        "Nausea",
        "Vomiting",
        "Diarrhea",
        "Constipation",
        "Bloating",
        "Loss of appetite",
        "Heartburn",
    ],
    leftArm: ["Arm pain", "Weakness", "Numbness", "Tingling", "Swelling", "Limited movement", "Joint pain"],
    rightArm: ["Arm pain", "Weakness", "Numbness", "Tingling", "Swelling", "Limited movement", "Joint pain"],
    leftLeg: [
        "Leg pain",
        "Weakness",
        "Numbness",
        "Tingling",
        "Swelling",
        "Limited movement",
        "Joint pain",
        "Difficulty walking",
    ],
    rightLeg: [
        "Leg pain",
        "Weakness",
        "Numbness",
        "Tingling",
        "Swelling",
        "Limited movement",
        "Joint pain",
        "Difficulty walking",
    ],
    general: [
        "Fever",
        "Fatigue",
        "Chills",
        "Sweating",
        "Weakness",
        "Dizziness",
        "Rash",
        "Weight loss",
        "Weight gain",
        "Sleep problems",
    ],
}

export function SymptomSelector({ bodyPart, selectedSymptoms, onToggleSymptom }: SymptomSelectorProps) {
    const [searchQuery, setSearchQuery] = useState("")

    // Determine which symptoms to show based on body part and search query
    const getFilteredSymptoms = () => {
        let symptoms: string[] = []

        if (bodyPart) {
            symptoms = symptomsByBodyPart[bodyPart] || []
        } else {
            // If no body part selected, show general symptoms
            symptoms = symptomsByBodyPart.general || []
        }

        // Filter by search query if present
        if (searchQuery) {
            return symptoms.filter((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
        }

        return symptoms
    }

    const filteredSymptoms = getFilteredSymptoms()

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle>Symptoms</CardTitle>
                <CardDescription>
                    {bodyPart
                        ? `Select symptoms related to your ${bodyPart
                            .replace(/([A-Z])/g, " $1")
                            .trim()
                            .toLowerCase()}`
                        : "Select your general symptoms or choose a body part"}
                </CardDescription>
                <div className="relative mt-2">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search symptoms..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[220px] pr-4">
                    <div className="space-y-2">
                        {filteredSymptoms.map((symptom) => (
                            <div key={symptom} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`symptom-${symptom}`}
                                    checked={selectedSymptoms.includes(symptom)}
                                    onCheckedChange={() => onToggleSymptom(symptom)}
                                />
                                <Label htmlFor={`symptom-${symptom}`} className="cursor-pointer">
                                    {symptom}
                                </Label>
                            </div>
                        ))}
                        {filteredSymptoms.length === 0 && (
                            <p className="text-muted-foreground text-center py-4">
                                {searchQuery ? "No symptoms match your search" : "No symptoms available for this selection"}
                            </p>
                        )}
                    </div>
                </ScrollArea>
                <div className="mt-4 text-sm text-muted-foreground">Selected: {selectedSymptoms.length} symptom(s)</div>
            </CardContent>
        </Card>
    )
}

