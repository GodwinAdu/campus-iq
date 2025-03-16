"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import Link from "next/link"
import {
    Calendar,
    Clock,
    User,
    Thermometer,
    Activity,
    Pill,
    FileText,
    AlertCircle,
    CheckCircle2,
    ArrowUpRight,
} from "lucide-react"

// Mock admission data based on the Mongoose schema
const mockAdmissions = [
    {
        id: "ADM001",
        studentId: {
            _id: "STU001",
            name: "Emma Thompson",
            grade: "10th",
        },
        admissionDate: new Date(2025, 2, 15, 10, 0),
        admissionReason: "High fever and headache",
        attendingStaffId: {
            _id: "STAFF001",
            name: "Dr. Sarah Johnson",
            role: "School Nurse",
        },
        guardianNotified: true,
        vitalSigns: {
            temperature: 101.2,
            bloodPressure: "110/70",
            pulseRate: 88,
            respiratoryRate: 18,
        },
        symptoms: ["Fever", "Headache", "Fatigue"],
        diagnosis: "Viral infection",
        treatmentGiven: "Administered acetaminophen for fever reduction",
        medicationsPrescribed: [
            {
                name: "Acetaminophen",
                dosage: "500mg",
                frequency: "Every 6 hours as needed",
            },
        ],
        admissionStatus: "ADMITTED",
        followUpRequired: true,
        remarks: "Student should rest and drink plenty of fluids",
        createdAt: new Date(2025, 2, 15, 10, 0),
        updatedAt: new Date(2025, 2, 15, 10, 30),
    },
    {
        id: "ADM002",
        studentId: {
            _id: "STU002",
            name: "Noah Martinez",
            grade: "9th",
        },
        admissionDate: new Date(2025, 2, 14, 13, 30),
        admissionReason: "Sprained ankle during PE",
        attendingStaffId: {
            _id: "STAFF002",
            name: "Dr. Michael Chen",
            role: "School Physician",
        },
        guardianNotified: true,
        vitalSigns: {
            temperature: 98.6,
            bloodPressure: "115/75",
            pulseRate: 72,
            respiratoryRate: 16,
        },
        symptoms: ["Pain in right ankle", "Swelling", "Limited mobility"],
        diagnosis: "Grade 1 ankle sprain",
        treatmentGiven: "RICE protocol (Rest, Ice, Compression, Elevation)",
        medicationsPrescribed: [
            {
                name: "Ibuprofen",
                dosage: "400mg",
                frequency: "Every 8 hours with food",
            },
        ],
        admissionStatus: "DISCHARGED",
        dischargeDate: new Date(2025, 2, 14, 15, 0),
        followUpRequired: true,
        remarks: "Student should avoid physical activity for at least 1 week",
        createdAt: new Date(2025, 2, 14, 13, 30),
        updatedAt: new Date(2025, 2, 14, 15, 0),
    },
    {
        id: "ADM003",
        studentId: {
            _id: "STU003",
            name: "Ava Patel",
            grade: "11th",
        },
        admissionDate: new Date(2025, 2, 13, 9, 15),
        admissionReason: "Severe abdominal pain",
        attendingStaffId: {
            _id: "STAFF001",
            name: "Dr. Sarah Johnson",
            role: "School Nurse",
        },
        guardianNotified: true,
        vitalSigns: {
            temperature: 99.1,
            bloodPressure: "120/80",
            pulseRate: 90,
            respiratoryRate: 20,
        },
        symptoms: ["Abdominal pain", "Nausea", "Loss of appetite"],
        diagnosis: "Suspected appendicitis",
        treatmentGiven: "Initial assessment and pain management",
        medicationsPrescribed: [],
        admissionStatus: "REFERRED",
        referredTo: "City General Hospital - Emergency Department",
        followUpRequired: true,
        remarks: "Urgent medical attention required. Parent contacted to transport student to hospital.",
        createdAt: new Date(2025, 2, 13, 9, 15),
        updatedAt: new Date(2025, 2, 13, 9, 45),
    },
]

interface AdmissionDetailProps {
    id: string
}

export function AdmissionDetail({ id }: AdmissionDetailProps) {
    const [showUpdateStatusDialog, setShowUpdateStatusDialog] = useState(false)

    // Find the admission by ID
    const admission = mockAdmissions.find((a) => a.id === id) || mockAdmissions[0]

    // Function to get status badge color
    const getStatusColor = (status: string) => {
        switch (status) {
            case "ADMITTED":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case "DISCHARGED":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "REFERRED":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
        }
    }

    // Function to get status icon
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "ADMITTED":
                return <AlertCircle className="h-5 w-5" />
            case "DISCHARGED":
                return <CheckCircle2 className="h-5 w-5" />
            case "REFERRED":
                return <ArrowUpRight className="h-5 w-5" />
            default:
                return null
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex items-center space-x-2">
                    <Badge className={`px-3 py-1 text-sm ${getStatusColor(admission.admissionStatus)}`}>
                        <span className="flex items-center">
                            {getStatusIcon(admission.admissionStatus)}
                            <span className="ml-1">{admission.admissionStatus}</span>
                        </span>
                    </Badge>
                    {admission.followUpRequired && (
                        <Badge variant="outline" className="px-3 py-1 text-sm">
                            Follow-up Required
                        </Badge>
                    )}
                </div>

                <div className="flex space-x-2">
                    {admission.admissionStatus === "ADMITTED" && (
                        <Button onClick={() => setShowUpdateStatusDialog(true)}>Update Status</Button>
                    )}
                    <Link href={`/health-management/clinic-admissions/${id}/edit`}>
                        <Button variant="outline">Edit Record</Button>
                    </Link>
                </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="clinical">Clinical Details</TabsTrigger>
                    <TabsTrigger value="history">History & Notes</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Patient Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <User className="mr-2 h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <div className="font-medium">{admission.studentId.name}</div>
                                            <div className="text-sm text-muted-foreground">{admission.studentId.grade || "Staff Member"}</div>
                                            <div className="text-sm text-muted-foreground">ID: {admission.studentId._id}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Calendar className="mr-2 h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <div className="font-medium">Admission Date & Time</div>
                                            <div className="text-sm">{format(admission.admissionDate, "MMMM d, yyyy 'at' h:mm a")}</div>
                                        </div>
                                    </div>

                                    {admission.dischargeDate && (
                                        <div className="flex items-start">
                                            <Clock className="mr-2 h-5 w-5 text-muted-foreground mt-0.5" />
                                            <div>
                                                <div className="font-medium">Discharge Date & Time</div>
                                                <div className="text-sm">{format(admission.dischargeDate, "MMMM d, yyyy 'at' h:mm a")}</div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start">
                                        <User className="mr-2 h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <div className="font-medium">Attending Staff</div>
                                            <div className="text-sm">
                                                {admission.attendingStaffId.name} ({admission.attendingStaffId.role})
                                            </div>
                                        </div>
                                    </div>

                                    {admission.referredTo && (
                                        <div className="flex items-start">
                                            <ArrowUpRight className="mr-2 h-5 w-5 text-muted-foreground mt-0.5" />
                                            <div>
                                                <div className="font-medium">Referred To</div>
                                                <div className="text-sm">{admission.referredTo}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Vital Signs</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center">
                                        <Thermometer className="mr-2 h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <div className="text-sm text-muted-foreground">Temperature</div>
                                            <div className="font-medium">{admission.vitalSigns.temperature}°F</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <Activity className="mr-2 h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <div className="text-sm text-muted-foreground">Blood Pressure</div>
                                            <div className="font-medium">{admission.vitalSigns.bloodPressure} mmHg</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <Activity className="mr-2 h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <div className="text-sm text-muted-foreground">Pulse Rate</div>
                                            <div className="font-medium">{admission.vitalSigns.pulseRate} bpm</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <Activity className="mr-2 h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <div className="text-sm text-muted-foreground">Respiratory Rate</div>
                                            <div className="font-medium">{admission.vitalSigns.respiratoryRate} /min</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="clinical" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Reason & Symptoms</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm text-muted-foreground">Reason for Admission</div>
                                        <div className="font-medium">{admission.admissionReason}</div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Symptoms</div>
                                        <div className="flex flex-wrap gap-1">
                                            {admission.symptoms.map((symptom, index) => (
                                                <Badge key={index} variant="outline">
                                                    {symptom}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-muted-foreground">Guardian Notified</div>
                                        <div className="font-medium">{admission.guardianNotified ? "Yes" : "No"}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Diagnosis & Treatment</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm text-muted-foreground">Diagnosis</div>
                                        <div className="font-medium">{admission.diagnosis}</div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-muted-foreground">Treatment Given</div>
                                        <div className="font-medium">{admission.treatmentGiven}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {admission.medicationsPrescribed && admission.medicationsPrescribed.length > 0 && (
                            <Card className="md:col-span-2">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Medications Prescribed</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {admission.medicationsPrescribed.map((med, index) => (
                                            <div key={index} className="flex items-start border rounded-md p-3">
                                                <Pill className="mr-2 h-5 w-5 text-muted-foreground mt-0.5" />
                                                <div>
                                                    <div className="font-medium">{med.name}</div>
                                                    <div className="text-sm text-muted-foreground">Dosage: {med.dosage}</div>
                                                    <div className="text-sm text-muted-foreground">Frequency: {med.frequency}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="history" className="mt-6">
                    <div className="grid grid-cols-1 gap-6">
                        {admission.remarks && (
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Remarks</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{admission.remarks}</p>
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Record History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="mr-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                                            <FileText className="h-3 w-3" />
                                        </div>
                                        <div>
                                            <div className="font-medium">Record Created</div>
                                            <div className="text-sm text-muted-foreground">
                                                {format(admission.createdAt, "MMMM d, yyyy 'at' h:mm a")}
                                            </div>
                                            <div className="text-sm text-muted-foreground">By {admission.attendingStaffId.name}</div>
                                        </div>
                                    </div>

                                    {admission.updatedAt && admission.updatedAt > admission.createdAt && (
                                        <div className="flex items-start">
                                            <div className="mr-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                                                <FileText className="h-3 w-3" />
                                            </div>
                                            <div>
                                                <div className="font-medium">Record Updated</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {format(admission.updatedAt, "MMMM d, yyyy 'at' h:mm a")}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {admission.admissionStatus === "DISCHARGED" && admission.dischargeDate && (
                                        <div className="flex items-start">
                                            <div className="mr-2 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                                                <CheckCircle2 className="h-3 w-3" />
                                            </div>
                                            <div>
                                                <div className="font-medium">Patient Discharged</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {format(admission.dischargeDate, "MMMM d, yyyy 'at' h:mm a")}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {admission.admissionStatus === "REFERRED" && (
                                        <div className="flex items-start">
                                            <div className="mr-2 h-6 w-6 rounded-full bg-yellow-500 flex items-center justify-center text-white">
                                                <ArrowUpRight className="h-3 w-3" />
                                            </div>
                                            <div>
                                                <div className="font-medium">Patient Referred</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {format(admission.updatedAt, "MMMM d, yyyy 'at' h:mm a")}
                                                </div>
                                                <div className="text-sm">To: {admission.referredTo}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>

            <Dialog open={showUpdateStatusDialog} onOpenChange={setShowUpdateStatusDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Admission Status</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-1 gap-4">
                            <Button className="w-full justify-start text-left" onClick={() => setShowUpdateStatusDialog(false)}>
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Discharge Patient
                            </Button>
                            <Button className="w-full justify-start text-left" onClick={() => setShowUpdateStatusDialog(false)}>
                                <ArrowUpRight className="mr-2 h-4 w-4" />
                                Refer to External Care
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

