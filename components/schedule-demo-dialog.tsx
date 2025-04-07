"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { format, setHours, setMinutes, isAfter, startOfDay } from "date-fns"
import { CheckCircle2, Clock, Globe, Loader2, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ScheduleDemoDialogProps {
    trigger?: React.ReactNode
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
}

// Demo types with descriptions
const demoTypes = [
    {
        id: "overview",
        title: "Product Overview",
        description: "A comprehensive tour of CampusIQ's core features and capabilities",
        duration: 30,
        icon: <Globe className="h-5 w-5" />,
    },
    {
        id: "admin",
        title: "Administrator Demo",
        description: "Focused on school administration, user management, and reporting",
        duration: 45,
        icon: <Users className="h-5 w-5" />,
    },
    {
        id: "custom",
        title: "Custom Demo",
        description: "Tailored to your specific requirements and use cases",
        duration: 60,
        icon: <CheckCircle2 className="h-5 w-5" />,
    },
]

// Available time slots
const generateTimeSlots = (date: Date) => {
    const slots = []
    const startHour = 9 // 9 AM
    const endHour = 17 // 5 PM

    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const slotTime = setMinutes(setHours(date, hour), minute)

            // Don't add slots in the past
            if (isAfter(slotTime, new Date())) {
                slots.push(slotTime)
            }
        }
    }

    return slots
}

// Time zones
const timeZones = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
    { value: "Europe/Paris", label: "Central European Time (CET)" },
    { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
    { value: "Australia/Sydney", label: "Australian Eastern Time (AET)" },
]

export function ScheduleDemoDialog() {
    const [step, setStep] = useState(1)
    const [demoType, setDemoType] = useState<string | null>(null)
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [timeSlot, setTimeSlot] = useState<Date | null>(null)
    const [timeZone, setTimeZone] = useState("America/New_York")
    const [availableTimeSlots, setAvailableTimeSlots] = useState<Date[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [confirmationCode, setConfirmationCode] = useState("")
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        institution: "",
        role: "",
        attendees: "1",
        notes: "",
        sendReminder: true,
    })

    // Update available time slots when date changes
    useEffect(() => {
        if (date) {
            setAvailableTimeSlots(generateTimeSlots(date))
            setTimeSlot(null) // Reset time slot when date changes
        }
    }, [date])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSubmitted(true)
            setConfirmationCode(
                `DEMO-${Math.floor(Math.random() * 10000)
                    .toString()
                    .padStart(4, "0")}`,
            )
        }, 1500)
    }

    const resetForm = () => {
        setStep(1)
        setDemoType(null)
        setDate(undefined)
        setTimeSlot(null)
        setTimeZone("America/New_York")
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            institution: "",
            role: "",
            attendees: "1",
            notes: "",
            sendReminder: true,
        })
        setIsSubmitted(false)
    }

    const nextStep = () => {
        setStep((prev) => prev + 1)
    }

    const prevStep = () => {
        setStep((prev) => prev - 1)
    }

    const selectedDemoType = demoTypes.find((type) => type.id === demoType)

    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center">
                    Schedule Demo
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                {!isSubmitted ? (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-2xl">Schedule a Demo</DialogTitle>
                            <DialogDescription>See how CampusIQ can transform your educational institution.</DialogDescription>
                        </DialogHeader>

                        <div className="mt-4">
                            {/* Progress indicator */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <div
                                        className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                                            step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500",
                                        )}
                                    >
                                        1
                                    </div>
                                    <div className={cn("h-1 w-12", step >= 2 ? "bg-blue-600" : "bg-gray-200")} />
                                    <div
                                        className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                                            step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500",
                                        )}
                                    >
                                        2
                                    </div>
                                    <div className={cn("h-1 w-12", step >= 3 ? "bg-blue-600" : "bg-gray-200")} />
                                    <div
                                        className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                                            step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500",
                                        )}
                                    >
                                        3
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500">Step {step} of 3</div>
                            </div>

                            {/* Step 1: Select Demo Type */}
                            {step === 1 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Select Demo Type</h3>
                                    <div className="grid gap-4">
                                        {demoTypes.map((type) => (
                                            <Card
                                                key={type.id}
                                                className={cn(
                                                    "cursor-pointer transition-all hover:border-blue-300",
                                                    demoType === type.id && "border-blue-500 ring-2 ring-blue-200",
                                                )}
                                                onClick={() => setDemoType(type.id)}
                                            >
                                                <CardContent className="p-4 flex items-start">
                                                    <div
                                                        className={cn(
                                                            "mr-4 p-2 rounded-full",
                                                            demoType === type.id ? "bg-blue-100" : "bg-gray-100",
                                                        )}
                                                    >
                                                        {type.icon}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-medium">{type.title}</h4>
                                                        <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                                                        <div className="flex items-center mt-2">
                                                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                                                            <span className="text-sm text-gray-500">{type.duration} minutes</span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>

                                    <DialogFooter>
                                        <Button onClick={nextStep} disabled={!demoType} className="w-full sm:w-auto">
                                            Continue
                                        </Button>
                                    </DialogFooter>
                                </div>
                            )}

                            {/* Step 2: Select Date and Time */}
                            {step === 2 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Select Date and Time</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <Label className="mb-2 block">Date</Label>
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                disabled={
                                                    (date) =>
                                                        date < startOfDay(new Date()) || // Can't select days in the past
                                                        date.getDay() === 0 || // Can't select Sunday
                                                        date.getDay() === 6 // Can't select Saturday
                                                }
                                                className="border rounded-md p-3"
                                            />
                                        </div>

                                        <div>
                                            <div className="mb-4">
                                                <Label className="mb-2 block">Time Zone</Label>
                                                <Select value={timeZone} onValueChange={setTimeZone}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select time zone" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {timeZones.map((tz) => (
                                                            <SelectItem key={tz.value} value={tz.value}>
                                                                {tz.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div>
                                                <Label className="mb-2 block">Available Time Slots</Label>
                                                {date ? (
                                                    <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-2">
                                                        {availableTimeSlots.length > 0 ? (
                                                            availableTimeSlots.map((slot, index) => (
                                                                <Button
                                                                    key={index}
                                                                    type="button"
                                                                    variant={timeSlot?.getTime() === slot.getTime() ? "default" : "outline"}
                                                                    className="justify-start"
                                                                    onClick={() => setTimeSlot(slot)}
                                                                >
                                                                    <Clock className="mr-2 h-4 w-4" />
                                                                    {format(slot, "h:mm a")}
                                                                </Button>
                                                            ))
                                                        ) : (
                                                            <p className="text-sm text-gray-500 col-span-2">No available time slots for this date.</p>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-gray-500">Please select a date first.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <DialogFooter className="flex justify-between">
                                        <Button type="button" variant="outline" onClick={prevStep}>
                                            Back
                                        </Button>
                                        <Button onClick={nextStep} disabled={!date || !timeSlot}>
                                            Continue
                                        </Button>
                                    </DialogFooter>
                                </div>
                            )}

                            {/* Step 3: Contact Information */}
                            {step === 3 && (
                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Your Information</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">First Name</Label>
                                                <Input
                                                    id="firstName"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Last Name</Label>
                                                <Input
                                                    id="lastName"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="institution">Institution Name</Label>
                                            <Input
                                                id="institution"
                                                name="institution"
                                                value={formData.institution}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="role">Your Role</Label>
                                            <Select
                                                value={formData.role}
                                                onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
                                                required
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="administrator">Administrator</SelectItem>
                                                    <SelectItem value="principal">Principal</SelectItem>
                                                    <SelectItem value="teacher">Teacher</SelectItem>
                                                    <SelectItem value="it">IT Staff</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="attendees">Number of Attendees</Label>
                                            <Select
                                                value={formData.attendees}
                                                onValueChange={(value) => setFormData((prev) => ({ ...prev, attendees: value }))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select number of attendees" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">Just me</SelectItem>
                                                    <SelectItem value="2-5">2-5 people</SelectItem>
                                                    <SelectItem value="6-10">6-10 people</SelectItem>
                                                    <SelectItem value="10+">More than 10 people</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="notes">Additional Notes (Optional)</Label>
                                            <Input
                                                id="notes"
                                                name="notes"
                                                value={formData.notes}
                                                onChange={handleInputChange}
                                                placeholder="Any specific topics you'd like us to cover?"
                                            />
                                        </div>

                                        <div className="flex items-center space-x-2 pt-2">
                                            <Switch
                                                id="sendReminder"
                                                checked={formData.sendReminder}
                                                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, sendReminder: checked }))}
                                            />
                                            <Label htmlFor="sendReminder" className="text-sm">
                                                Send me a calendar invitation and email reminder
                                            </Label>
                                        </div>

                                        <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                                            <div className="flex items-start">
                                                <div className="mr-4">
                                                    <CheckCircle2 className="h-5 w-5 text-blue-500" />
                                                </div>
                                                <div>
                                                    <AlertTitle className="mb-1">Demo Summary</AlertTitle>
                                                    <AlertDescription>
                                                        <div className="space-y-1 text-sm">
                                                            <p>
                                                                <strong>Type:</strong> {selectedDemoType?.title}
                                                            </p>
                                                            <p>
                                                                <strong>Date:</strong> {date ? format(date, "EEEE, MMMM d, yyyy") : ""}
                                                            </p>
                                                            <p>
                                                                <strong>Time:</strong> {timeSlot ? format(timeSlot, "h:mm a") : ""} (
                                                                {timeZones.find((tz) => tz.value === timeZone)?.label})
                                                            </p>
                                                            <p>
                                                                <strong>Duration:</strong> {selectedDemoType?.duration} minutes
                                                            </p>
                                                        </div>
                                                    </AlertDescription>
                                                </div>
                                            </div>
                                        </Alert>
                                    </div>

                                    <DialogFooter className="flex justify-between mt-6">
                                        <Button type="button" variant="outline" onClick={prevStep}>
                                            Back
                                        </Button>
                                        <Button type="submit" disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Scheduling...
                                                </>
                                            ) : (
                                                <>Schedule Demo</>
                                            )}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="py-6 text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold">Demo Scheduled!</h2>
                            <p className="text-gray-500 mt-1">
                                Your confirmation code is <span className="font-medium text-black">{confirmationCode}</span>
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 text-left mt-6">
                            <h3 className="font-medium mb-2">Demo Details</h3>
                            <div className="space-y-2 text-sm">
                                <p>
                                    <strong>Type:</strong> {selectedDemoType?.title}
                                </p>
                                <p>
                                    <strong>Date:</strong> {date ? format(date, "EEEE, MMMM d, yyyy") : ""}
                                </p>
                                <p>
                                    <strong>Time:</strong> {timeSlot ? format(timeSlot, "h:mm a") : ""} (
                                    {timeZones.find((tz) => tz.value === timeZone)?.label})
                                </p>
                                <p>
                                    <strong>Duration:</strong> {selectedDemoType?.duration} minutes
                                </p>
                            </div>
                        </div>

                        <Alert className="mt-6 bg-blue-50 text-blue-800 border-blue-200">
                            <CheckCircle2 className="h-4 w-4" />
                            <AlertTitle>What happens next?</AlertTitle>
                            <AlertDescription>
                                <p className="mt-1">
                                    We've sent a confirmation to {formData.email}. A calendar invitation has also been sent. One of our
                                    product specialists will contact you before the demo to confirm details.
                                </p>
                            </AlertDescription>
                        </Alert>

                        <div className="pt-4 space-y-2">
                            <Button onClick={resetForm} className="w-full">
                                Schedule Another Demo
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

