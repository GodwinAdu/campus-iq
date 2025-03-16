"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Calendar, User, Thermometer, Activity, Pill } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

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
        admissionStatus: "REFERRED",
        referredTo: "City General Hospital - Emergency Department",
        followUpRequired: true,
        remarks: "Urgent medical attention required. Parent contacted to transport student to hospital.",
    },
    {
        id: "ADM004",
        studentId: {
            _id: "STU004",
            name: "Liam Johnson",
            grade: "12th",
        },
        admissionDate: new Date(2025, 2, 12, 14, 0),
        admissionReason: "Allergic reaction to food",
        attendingStaffId: {
            _id: "STAFF002",
            name: "Dr. Michael Chen",
            role: "School Physician",
        },
        guardianNotified: true,
        vitalSigns: {
            temperature: 98.8,
            bloodPressure: "125/85",
            pulseRate: 95,
            respiratoryRate: 22,
        },
        symptoms: ["Hives", "Facial swelling", "Itching"],
        diagnosis: "Mild allergic reaction",
        treatmentGiven: "Administered antihistamine",
        medicationsPrescribed: [
            {
                name: "Diphenhydramine",
                dosage: "25mg",
                frequency: "Every 6 hours as needed",
            },
        ],
        admissionStatus: "DISCHARGED",
        dischargeDate: new Date(2025, 2, 12, 16, 30),
        followUpRequired: false,
        remarks: "Student should avoid the allergen (peanuts) in the future",
    },
    {
        id: "ADM005",
        studentId: {
            _id: "STAFF003",
            name: "Emily Davis",
            role: "Math Teacher",
        },
        admissionDate: new Date(2025, 2, 11, 10, 45),
        admissionReason: "Migraine headache",
        attendingStaffId: {
            _id: "STAFF001",
            name: "Dr. Sarah Johnson",
            role: "School Nurse",
        },
        guardianNotified: false,
        vitalSigns: {
            temperature: 98.6,
            bloodPressure: "130/85",
            pulseRate: 78,
            respiratoryRate: 16,
        },
        symptoms: ["Severe headache", "Sensitivity to light", "Nausea"],
        diagnosis: "Migraine",
        treatmentGiven: "Administered migraine medication and provided quiet, dark room for rest",
        medicationsPrescribed: [
            {
                name: "Sumatriptan",
                dosage: "50mg",
                frequency: "As needed for migraine, not to exceed 2 doses in 24 hours",
            },
        ],
        admissionStatus: "DISCHARGED",
        dischargeDate: new Date(2025, 2, 11, 13, 30),
        followUpRequired: false,
        remarks: "Staff member advised to follow up with primary care physician if migraines persist",
    },
]

interface AdmissionsListProps {
    filter: "all" | "ADMITTED" | "DISCHARGED" | "REFERRED"
}

export function AdmissionsList({ filter }: AdmissionsListProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedAdmission, setSelectedAdmission] = useState<any | null>(null)

    // Filter admissions based on search query and status filter
    const filteredAdmissions = mockAdmissions.filter((admission) => {
        const matchesSearch =
            admission.studentId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            admission.admissionReason.toLowerCase().includes(searchQuery.toLowerCase()) ||
            admission.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
            admission.symptoms.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesFilter = filter === "all" || admission.admissionStatus === filter

        return matchesSearch && matchesFilter
    })

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

    // Function to handle admission click
    const handleAdmissionClick = (admission: any) => {
        setSelectedAdmission(admission)
    }

    return (
        <>
            <div className="relative flex mb-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by name, symptoms, diagnosis..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Patient</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead>Diagnosis</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAdmissions.length > 0 ? (
                            filteredAdmissions.map((admission) => (
                                <TableRow
                                    key={admission.id}
                                    className="cursor-pointer hover:bg-muted/50"
                                    onClick={() => handleAdmissionClick(admission)}
                                >
                                    <TableCell>
                                        {format(admission.admissionDate, "MMM d, yyyy")}
                                        <div className="text-sm text-muted-foreground">{format(admission.admissionDate, "h:mm a")}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{admission.studentId.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {admission.studentId.grade || admission.studentId.role}
                                        </div>
                                    </TableCell>
                                    <TableCell>{admission.admissionReason}</TableCell>
                                    <TableCell>{admission.diagnosis}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(admission.admissionStatus)}>{admission.admissionStatus}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/health-management/clinic-admissions/${admission.id}`}>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                }}
                                            >
                                                View Details
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                                    No admissions found matching your criteria
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {selectedAdmission && (
                <Dialog open={!!selectedAdmission} onOpenChange={() => setSelectedAdmission(null)}>
                    <DialogContent className="max-w-3xl">
                        <DialogHeader>
                            <DialogTitle>Admission Details</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Patient Information</h3>
                                    <div className="flex items-center">
                                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">{selectedAdmission.studentId.name}</span>
                                    </div>
                                    <div className="text-sm text-muted-foreground ml-6">
                                        {selectedAdmission.studentId.grade || selectedAdmission.studentId.role}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Admission Details</h3>
                                    <div className="flex items-center">
                                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span>{format(selectedAdmission.admissionDate, "MMMM d, yyyy 'at' h:mm a")}</span>
                                    </div>
                                    <div className="ml-6 mt-1">
                                        <span className="text-sm font-medium">Reason: </span>
                                        <span className="text-sm">{selectedAdmission.admissionReason}</span>
                                    </div>
                                    <div className="ml-6 mt-1">
                                        <span className="text-sm font-medium">Attending Staff: </span>
                                        <span className="text-sm">{selectedAdmission.attendingStaffId.name}</span>
                                    </div>
                                    <div className="ml-6 mt-1">
                                        <span className="text-sm font-medium">Guardian Notified: </span>
                                        <span className="text-sm">{selectedAdmission.guardianNotified ? "Yes" : "No"}</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Vital Signs</h3>
                                    <div className="grid grid-cols-2 gap-2 ml-6">
                                        <div className="flex items-center">
                                            <Thermometer className="mr-1 h-3 w-3 text-muted-foreground" />
                                            <span className="text-sm">{selectedAdmission.vitalSigns.temperature}°F</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Activity className="mr-1 h-3 w-3 text-muted-foreground" />
                                            <span className="text-sm">{selectedAdmission.vitalSigns.bloodPressure}</span>
                                        </div>
                                        <div className="text-sm">
                                            <span className="font-medium">Pulse: </span>
                                            {selectedAdmission.vitalSigns.pulseRate} bpm
                                        </div>
                                        <div className="text-sm">
                                            <span className="font-medium">Resp: </span>
                                            {selectedAdmission.vitalSigns.respiratoryRate} /min
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Symptoms</h3>
                                    <div className="flex flex-wrap gap-1 ml-6">
                                        {selectedAdmission.symptoms.map((symptom: string, index: number) => (
                                            <Badge key={index} variant="outline">
                                                {symptom}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Diagnosis & Treatment</h3>
                                    <div className="ml-6">
                                        <div className="text-sm">
                                            <span className="font-medium">Diagnosis: </span>
                                            {selectedAdmission.diagnosis}
                                        </div>
                                        <div className="text-sm mt-1">
                                            <span className="font-medium">Treatment: </span>
                                            {selectedAdmission.treatmentGiven}
                                        </div>
                                    </div>
                                </div>

                                {selectedAdmission.medicationsPrescribed && selectedAdmission.medicationsPrescribed.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Medications Prescribed</h3>
                                        <div className="ml-6 space-y-2">
                                            {selectedAdmission.medicationsPrescribed.map((med: any, index: number) => (
                                                <div key={index} className="flex items-start">
                                                    <Pill className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                                                    <div>
                                                        <div className="text-sm font-medium">{med.name}</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {med.dosage} - {med.frequency}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Status Information</h3>
                                    <div className="ml-6">
                                        <div className="flex items-center">
                                            <Badge className={getStatusColor(selectedAdmission.admissionStatus)}>
                                                {selectedAdmission.admissionStatus}
                                            </Badge>
                                        </div>

                                        {selectedAdmission.dischargeDate && (
                                            <div className="text-sm mt-1">
                                                <span className="font-medium">Discharged: </span>
                                                {format(selectedAdmission.dischargeDate, "MMMM d, yyyy 'at' h:mm a")}
                                            </div>
                                        )}

                                        {selectedAdmission.referredTo && (
                                            <div className="text-sm mt-1">
                                                <span className="font-medium">Referred To: </span>
                                                {selectedAdmission.referredTo}
                                            </div>
                                        )}

                                        <div className="text-sm mt-1">
                                            <span className="font-medium">Follow-up Required: </span>
                                            {selectedAdmission.followUpRequired ? "Yes" : "No"}
                                        </div>
                                    </div>
                                </div>

                                {selectedAdmission.remarks && (
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Remarks</h3>
                                        <div className="ml-6 text-sm">{selectedAdmission.remarks}</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                            <Link href={`/health-management/clinic-admissions/${selectedAdmission.id}/edit`}>
                                <Button variant="outline">Edit Admission</Button>
                            </Link>
                            {selectedAdmission.admissionStatus === "ADMITTED" && <Button>Update Status</Button>}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}

