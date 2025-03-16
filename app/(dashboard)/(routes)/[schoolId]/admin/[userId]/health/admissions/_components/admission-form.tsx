"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Loader2, Plus, X } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"

interface AdmissionFormProps {
    initialData?: any
    onSuccess?: () => void
}

// Mock data for students
const mockStudents = [
    { id: "STU001", name: "Emma Thompson", type: "Student", grade: "10th" },
    { id: "STU002", name: "Noah Martinez", type: "Student", grade: "9th" },
    { id: "STU003", name: "Ava Patel", type: "Student", grade: "11th" },
    { id: "STU004", name: "Liam Johnson", type: "Student", grade: "12th" },
    { id: "STU005", name: "Sophia Lee", type: "Student", grade: "10th" },
    { id: "STAFF001", name: "Dr. Sarah Johnson", type: "Staff", role: "School Nurse" },
    { id: "STAFF002", name: "Michael Chen", type: "Staff", role: "Math Teacher" },
    { id: "STAFF003", name: "Emily Davis", type: "Staff", role: "English Teacher" },
]

// Mock data for staff
const mockStaff = [
    { id: "STAFF001", name: "Dr. Sarah Johnson", role: "School Nurse" },
    { id: "STAFF002", name: "Dr. Michael Chen", role: "School Physician" },
    { id: "STAFF003", name: "Dr. Robert Williams", role: "School Dentist" },
    { id: "STAFF004", name: "Dr. Emily Davis", role: "School Ophthalmologist" },
]

// Common symptoms for quick selection
const commonSymptoms = [
    "Fever",
    "Headache",
    "Cough",
    "Sore Throat",
    "Runny Nose",
    "Fatigue",
    "Nausea",
    "Vomiting",
    "Diarrhea",
    "Abdominal Pain",
    "Chest Pain",
    "Shortness of Breath",
    "Dizziness",
    "Rash",
    "Joint Pain",
    "Muscle Pain",
    "Eye Redness",
    "Ear Pain",
    "Swelling",
    "Bleeding",
    "Anxiety",
    "Depression",
]

export function AdmissionForm({ initialData, onSuccess }: AdmissionFormProps) {
    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        // Patient Information
        patientType: "student", // student or staff
        patientId: "",
        patientName: "",
        patientInfo: "", // grade for students, role for staff
        searchQuery: "",

        // Admission Details
        admissionDate: new Date(),
        admissionReason: "",
        attendingStaffId: "",
        guardianNotified: false,

        // Vital Signs
        vitalSigns: {
            temperature: "",
            bloodPressure: "",
            pulseRate: "",
            respiratoryRate: "",
        },

        // Clinical Assessment
        symptoms: [] as string[],
        customSymptom: "",
        diagnosis: "",
        treatmentGiven: "",

        // Medications
        medicationsPrescribed: [{ name: "", dosage: "", frequency: "" }],

        // Status
        admissionStatus: "ADMITTED",
        dischargeDate: undefined as Date | undefined,
        referredTo: "",
        followUpRequired: false,

        // Additional Information
        remarks: "",
        attachments: [] as string[],
    })

    const handleInputChange = (field: string, value: any) => {
        setFormData((prev) => {
            if (field.includes(".")) {
                const [parent, child] = field.split(".")
                return {
                    ...prev,
                    [parent]: {
                        ...prev[parent as keyof typeof prev],
                        [child]: value,
                    },
                }
            }
            return {
                ...prev,
                [field]: value,
            }
        })

        // Auto-fill patient information when a patient is selected
        if (field === "patientId") {
            const selectedPatient = mockStudents.find((s) => s.id === value)
            if (selectedPatient) {
                setFormData((prev) => ({
                    ...prev,
                    patientId: selectedPatient.id,
                    patientName: selectedPatient.name,
                    patientInfo: selectedPatient.type === "Student" ? selectedPatient.grade : selectedPatient.role,
                    patientType: selectedPatient.type.toLowerCase(),
                }))
            }
        }
    }

    const handleMedicationChange = (index: number, field: string, value: string) => {
        setFormData((prev) => {
            const updatedMedications = [...prev.medicationsPrescribed]
            updatedMedications[index] = {
                ...updatedMedications[index],
                [field]: value,
            }
            return {
                ...prev,
                medicationsPrescribed: updatedMedications,
            }
        })
    }

    const addMedication = () => {
        setFormData((prev) => ({
            ...prev,
            medicationsPrescribed: [...prev.medicationsPrescribed, { name: "", dosage: "", frequency: "" }],
        }))
    }

    const removeMedication = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            medicationsPrescribed: prev.medicationsPrescribed.filter((_, i) => i !== index),
        }))
    }

    const toggleSymptom = (symptom: string) => {
        setFormData((prev) => ({
            ...prev,
            symptoms: prev.symptoms.includes(symptom)
                ? prev.symptoms.filter((s) => s !== symptom)
                : [...prev.symptoms, symptom],
        }))
    }

    const addCustomSymptom = () => {
        if (formData.customSymptom.trim() && !formData.symptoms.includes(formData.customSymptom.trim())) {
            setFormData((prev) => ({
                ...prev,
                symptoms: [...prev.symptoms, prev.customSymptom.trim()],
                customSymptom: "",
            }))
        }
    }

    const nextStep = () => {
        if (validateCurrentStep()) {
            setCurrentStep((prev) => prev + 1)
        }
    }

    const prevStep = () => {
        setCurrentStep((prev) => prev - 1)
    }

    const validateCurrentStep = () => {
        switch (currentStep) {
            case 1:
                if (!formData.patientId || !formData.admissionDate || !formData.admissionReason || !formData.attendingStaffId) {
                    toast({
                        title: "Missing Information",
                        description: "Please fill in all required fields",
                        variant: "destructive",
                    })
                    return false
                }
                return true
            case 2:
                if (formData.symptoms.length === 0 || !formData.diagnosis || !formData.treatmentGiven) {
                    toast({
                        title: "Missing Information",
                        description: "Please provide symptoms, diagnosis, and treatment information",
                        variant: "destructive",
                    })
                    return false
                }
                return true
            case 3:
                if (formData.medicationsPrescribed.length > 0) {
                    const invalidMedication = formData.medicationsPrescribed.some(
                        (med) => !med.name || !med.dosage || !med.frequency,
                    )
                    if (invalidMedication) {
                        toast({
                            title: "Incomplete Medication Information",
                            description: "Please complete all medication fields or remove incomplete entries",
                            variant: "destructive",
                        })
                        return false
                    }
                }
                return true
            default:
                return true
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateCurrentStep()) {
            return
        }

        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        console.log("Admission data:", formData)

        toast({
            title: "Admission Record Created",
            description: "The clinic admission has been successfully recorded",
        })

        setIsSubmitting(false)

        if (onSuccess) {
            onSuccess()
        }
    }

    const filteredPatients = formData.searchQuery
        ? mockStudents.filter(
            (patient) =>
                patient.name.toLowerCase().includes(formData.searchQuery.toLowerCase()) ||
                patient.id.toLowerCase().includes(formData.searchQuery.toLowerCase()),
        )
        : mockStudents

    return (
        <div className="space-y-6">
            <Tabs value={`step-${currentStep}`} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="step-1" disabled>
                        1. Patient & Admission
                    </TabsTrigger>
                    <TabsTrigger value="step-2" disabled>
                        2. Clinical Assessment
                    </TabsTrigger>
                    <TabsTrigger value="step-3" disabled>
                        3. Medications
                    </TabsTrigger>
                    <TabsTrigger value="step-4" disabled>
                        4. Status & Additional Info
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-semibold mb-4">Patient Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="searchQuery">Search Patient</Label>
                                        <Input
                                            id="searchQuery"
                                            placeholder="Search by name or ID"
                                            value={formData.searchQuery}
                                            onChange={(e) => handleInputChange("searchQuery", e.target.value)}
                                        />
                                    </div>

                                    <div className="border rounded-md">
                                        <div className="grid grid-cols-4 font-medium p-2 border-b bg-muted/50">
                                            <div>ID</div>
                                            <div>Name</div>
                                            <div>Type</div>
                                            <div>Grade/Role</div>
                                        </div>
                                        <ScrollArea className="h-[200px]">
                                            {filteredPatients.map((patient) => (
                                                <div
                                                    key={patient.id}
                                                    className={cn(
                                                        "grid grid-cols-4 p-2 cursor-pointer hover:bg-muted",
                                                        formData.patientId === patient.id && "bg-primary/10",
                                                    )}
                                                    onClick={() => handleInputChange("patientId", patient.id)}
                                                >
                                                    <div>{patient.id}</div>
                                                    <div>{patient.name}</div>
                                                    <div>{patient.type}</div>
                                                    <div>{patient.grade || patient.role}</div>
                                                </div>
                                            ))}
                                        </ScrollArea>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <Label htmlFor="patientId">Patient ID</Label>
                                            <Input
                                                id="patientId"
                                                value={formData.patientId}
                                                onChange={(e) => handleInputChange("patientId", e.target.value)}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="patientName">Patient Name</Label>
                                            <Input
                                                id="patientName"
                                                value={formData.patientName}
                                                onChange={(e) => handleInputChange("patientName", e.target.value)}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="patientInfo">Grade/Role</Label>
                                            <Input
                                                id="patientInfo"
                                                value={formData.patientInfo}
                                                onChange={(e) => handleInputChange("patientInfo", e.target.value)}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-semibold mb-4">Admission Details</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label>Admission Date & Time</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal",
                                                            !formData.admissionDate && "text-muted-foreground",
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {formData.admissionDate ? (
                                                            format(formData.admissionDate, "PPP p")
                                                        ) : (
                                                            <span>Select date and time</span>
                                                        )}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={formData.admissionDate}
                                                        onSelect={(date) => date && handleInputChange("admissionDate", date)}
                                                        initialFocus
                                                    />
                                                    <div className="p-3 border-t">
                                                        <Label htmlFor="admissionTime">Time</Label>
                                                        <Input
                                                            id="admissionTime"
                                                            type="time"
                                                            className="mt-1"
                                                            onChange={(e) => {
                                                                const [hours, minutes] = e.target.value.split(":").map(Number)
                                                                const newDate = new Date(formData.admissionDate)
                                                                newDate.setHours(hours, minutes)
                                                                handleInputChange("admissionDate", newDate)
                                                            }}
                                                        />
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </div>

                                        <div>
                                            <Label htmlFor="attendingStaffId">Attending Staff</Label>
                                            <Select
                                                value={formData.attendingStaffId}
                                                onValueChange={(value) => handleInputChange("attendingStaffId", value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select attending staff" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {mockStaff.map((staff) => (
                                                        <SelectItem key={staff.id} value={staff.id}>
                                                            {staff.name} ({staff.role})
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="admissionReason">Reason for Admission</Label>
                                        <Textarea
                                            id="admissionReason"
                                            placeholder="Describe the reason for admission"
                                            value={formData.admissionReason}
                                            onChange={(e) => handleInputChange("admissionReason", e.target.value)}
                                            className="min-h-[80px]"
                                        />
                                    </div>

                                    {formData.patientType === "student" && (
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="guardianNotified"
                                                checked={formData.guardianNotified}
                                                onCheckedChange={(checked) => handleInputChange("guardianNotified", checked)}
                                            />
                                            <Label htmlFor="guardianNotified">Guardian has been notified</Label>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-semibold mb-4">Vital Signs</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="temperature">Temperature (°F)</Label>
                                        <Input
                                            id="temperature"
                                            type="number"
                                            step="0.1"
                                            placeholder="98.6"
                                            value={formData.vitalSigns.temperature}
                                            onChange={(e) => handleInputChange("vitalSigns.temperature", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
                                        <Input
                                            id="bloodPressure"
                                            placeholder="120/80"
                                            value={formData.vitalSigns.bloodPressure}
                                            onChange={(e) => handleInputChange("vitalSigns.bloodPressure", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="pulseRate">Pulse Rate (bpm)</Label>
                                        <Input
                                            id="pulseRate"
                                            type="number"
                                            placeholder="72"
                                            value={formData.vitalSigns.pulseRate}
                                            onChange={(e) => handleInputChange("vitalSigns.pulseRate", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="respiratoryRate">Respiratory Rate (breaths/min)</Label>
                                        <Input
                                            id="respiratoryRate"
                                            type="number"
                                            placeholder="16"
                                            value={formData.vitalSigns.respiratoryRate}
                                            onChange={(e) => handleInputChange("vitalSigns.respiratoryRate", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-semibold mb-4">Symptoms</h3>
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {formData.symptoms.map((symptom, index) => (
                                            <div key={index} className="flex items-center bg-primary/10 rounded-full px-3 py-1">
                                                <span className="text-sm">{symptom}</span>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-5 w-5 ml-1 p-0"
                                                    onClick={() => toggleSymptom(symptom)}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Add custom symptom"
                                            value={formData.customSymptom}
                                            onChange={(e) => handleInputChange("customSymptom", e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault()
                                                    addCustomSymptom()
                                                }
                                            }}
                                        />
                                        <Button type="button" onClick={addCustomSymptom}>
                                            Add
                                        </Button>
                                    </div>

                                    <div>
                                        <Label className="mb-2 block">Common Symptoms</Label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                            {commonSymptoms.map((symptom) => (
                                                <div key={symptom} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`symptom-${symptom}`}
                                                        checked={formData.symptoms.includes(symptom)}
                                                        onCheckedChange={() => toggleSymptom(symptom)}
                                                    />
                                                    <Label htmlFor={`symptom-${symptom}`} className="cursor-pointer">
                                                        {symptom}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-semibold mb-4">Diagnosis & Treatment</h3>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="diagnosis">Diagnosis</Label>
                                        <Input
                                            id="diagnosis"
                                            placeholder="Enter diagnosis"
                                            value={formData.diagnosis}
                                            onChange={(e) => handleInputChange("diagnosis", e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="treatmentGiven">Treatment Given</Label>
                                        <Textarea
                                            id="treatmentGiven"
                                            placeholder="Describe the treatment provided"
                                            value={formData.treatmentGiven}
                                            onChange={(e) => handleInputChange("treatmentGiven", e.target.value)}
                                            className="min-h-[100px]"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {currentStep === 3 && (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Medications Prescribed</h3>
                                <Button type="button" variant="outline" size="sm" onClick={addMedication}>
                                    <Plus className="h-4 w-4 mr-1" /> Add Medication
                                </Button>
                            </div>

                            {formData.medicationsPrescribed.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    No medications prescribed. Click "Add Medication" to add one.
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {formData.medicationsPrescribed.map((medication, index) => (
                                        <div key={index} className="border rounded-md p-4 relative">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute top-2 right-2"
                                                onClick={() => removeMedication(index)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <Label htmlFor={`medication-name-${index}`}>Medication Name</Label>
                                                    <Input
                                                        id={`medication-name-${index}`}
                                                        placeholder="e.g., Acetaminophen"
                                                        value={medication.name}
                                                        onChange={(e) => handleMedicationChange(index, "name", e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`medication-dosage-${index}`}>Dosage</Label>
                                                    <Input
                                                        id={`medication-dosage-${index}`}
                                                        placeholder="e.g., 500mg"
                                                        value={medication.dosage}
                                                        onChange={(e) => handleMedicationChange(index, "dosage", e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`medication-frequency-${index}`}>Frequency</Label>
                                                    <Input
                                                        id={`medication-frequency-${index}`}
                                                        placeholder="e.g., Every 6 hours as needed"
                                                        value={medication.frequency}
                                                        onChange={(e) => handleMedicationChange(index, "frequency", e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {currentStep === 4 && (
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-semibold mb-4">Admission Status</h3>
                                <div className="space-y-4">
                                    <div>
                                        <Label>Status</Label>
                                        <RadioGroup
                                            value={formData.admissionStatus}
                                            onValueChange={(value) => handleInputChange("admissionStatus", value)}
                                            className="flex flex-col space-y-2 mt-2"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="ADMITTED" id="status-admitted" />
                                                <Label htmlFor="status-admitted">Admitted to Clinic</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="DISCHARGED" id="status-discharged" />
                                                <Label htmlFor="status-discharged">Discharged</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="REFERRED" id="status-referred" />
                                                <Label htmlFor="status-referred">Referred to External Care</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    {formData.admissionStatus === "DISCHARGED" && (
                                        <div>
                                            <Label>Discharge Date & Time</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal",
                                                            !formData.dischargeDate && "text-muted-foreground",
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {formData.dischargeDate ? (
                                                            format(formData.dischargeDate, "PPP p")
                                                        ) : (
                                                            <span>Select date and time</span>
                                                        )}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={formData.dischargeDate}
                                                        onSelect={(date) => date && handleInputChange("dischargeDate", date)}
                                                        initialFocus
                                                    />
                                                    <div className="p-3 border-t">
                                                        <Label htmlFor="dischargeTime">Time</Label>
                                                        <Input
                                                            id="dischargeTime"
                                                            type="time"
                                                            className="mt-1"
                                                            onChange={(e) => {
                                                                const [hours, minutes] = e.target.value.split(":").map(Number)
                                                                const newDate = new Date(formData.dischargeDate || new Date())
                                                                newDate.setHours(hours, minutes)
                                                                handleInputChange("dischargeDate", newDate)
                                                            }}
                                                        />
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    )}

                                    {formData.admissionStatus === "REFERRED" && (
                                        <div>
                                            <Label htmlFor="referredTo">Referred To</Label>
                                            <Input
                                                id="referredTo"
                                                placeholder="e.g., City General Hospital - Emergency Department"
                                                value={formData.referredTo}
                                                onChange={(e) => handleInputChange("referredTo", e.target.value)}
                                            />
                                        </div>
                                    )}

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="followUpRequired"
                                            checked={formData.followUpRequired}
                                            onCheckedChange={(checked) => handleInputChange("followUpRequired", checked)}
                                        />
                                        <Label htmlFor="followUpRequired">Follow-up required</Label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="remarks">Remarks</Label>
                                        <Textarea
                                            id="remarks"
                                            placeholder="Any additional notes or observations"
                                            value={formData.remarks}
                                            onChange={(e) => handleInputChange("remarks", e.target.value)}
                                            className="min-h-[100px]"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="attachments">Attachments</Label>
                                        <Input
                                            id="attachments"
                                            type="file"
                                            multiple
                                            className="mt-1"
                                            onChange={(e) => {
                                                const files = Array.from(e.target.files || [])
                                                const fileNames = files.map((file) => file.name)
                                                handleInputChange("attachments", fileNames)
                                            }}
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">Upload relevant documents, reports, or images</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                <div className="flex justify-between mt-6">
                    {currentStep > 1 && (
                        <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
                            Previous
                        </Button>
                    )}
                    {currentStep < 4 ? (
                        <Button type="button" onClick={nextStep} disabled={isSubmitting}>
                            Next
                        </Button>
                    ) : (
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save Admission Record"
                            )}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}

