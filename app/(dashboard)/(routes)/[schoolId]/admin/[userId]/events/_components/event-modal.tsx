"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import type { Event } from "@/types/event"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface EventModalProps {
    isOpen: boolean
    event: Event | null
    onClose: () => void
    onSave: (event: Event) => void
    onDelete: (id: string) => void
}

export function EventModal({ isOpen, event, onClose, onSave, onDelete }: EventModalProps) {
    const [formData, setFormData] = useState<Event>({
        id: "",
        title: "",
        description: "",
        start: new Date().getTime(),
        end: new Date().getTime(),
        color: "blue",
    })

    useEffect(() => {
        if (event) {
            setFormData(event)
        }
    }, [event])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev: Event) => ({ ...prev, [name]: value }))
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, field: "start" | "end") => {
        const dateValue = e.target.value
        const [datePart, timePart] = dateValue.split("T")

        const newDate = new Date(formData[field])
        const [hours, minutes] = timePart.split(":")

        newDate.setHours(Number.parseInt(hours), Number.parseInt(minutes))

        setFormData((prev: Event) => ({
            ...prev,
            [field]: newDate.getTime(),
        }))
    }

    const handleColorChange = (color: string) => {
        setFormData((prev: Event) => ({ ...prev, color }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData)
    }

    const handleDelete = () => {
        if (formData.id) {
            onDelete(formData.id)
            onClose()
        }
    }

    const formatDateTimeForInput = (timestamp: number) => {
        const date = new Date(timestamp)
        return format(date, "yyyy-MM-dd'T'HH:mm")
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
                <form onSubmit={handleSubmit} className="space-y-0">
                    <DialogHeader className="px-6 pt-6 pb-2">
                        <DialogTitle>{formData.id ? "Edit Event" : "Add Event"}</DialogTitle>
                        <DialogDescription>
                            {formData.id ? "Make changes to your event here." : "Fill in the details for your new event."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="px-6 py-4 space-y-4 max-h-[calc(80vh-180px)] overflow-y-auto">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="col-span-3"
                                placeholder="Event title"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Event description (optional)"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="start">Start</Label>
                                <Input
                                    id="start"
                                    type="datetime-local"
                                    value={formatDateTimeForInput(formData.start)}
                                    onChange={(e) => handleDateChange(e, "start")}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="end">End</Label>
                                <Input
                                    id="end"
                                    type="datetime-local"
                                    value={formatDateTimeForInput(formData.end)}
                                    onChange={(e) => handleDateChange(e, "end")}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="color">Color</Label>
                            <div className="flex gap-2">
                                {["blue", "green", "red", "yellow", "purple"].map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        className={cn(
                                            "w-8 h-8 rounded-full border-2",
                                            color === "blue" && "bg-blue-500 hover:bg-blue-600",
                                            color === "green" && "bg-green-500 hover:bg-green-600",
                                            color === "red" && "bg-red-500 hover:bg-red-600",
                                            color === "yellow" && "bg-yellow-500 hover:bg-yellow-600",
                                            color === "purple" && "bg-purple-500 hover:bg-purple-600",
                                            formData.color === color ? "ring-2 ring-offset-2 ring-primary" : "opacity-70",
                                        )}
                                        onClick={() => handleColorChange(color)}
                                        aria-label={`${color} color`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="flex items-center justify-between px-6 py-4 border-t">
                        {formData.id && (
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={handleDelete}
                                className="flex items-center gap-1"
                            >
                                <Trash2 className="h-4 w-4" />
                                <span>Delete</span>
                            </Button>
                        )}
                        <div className="flex space-x-2 ml-auto">
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit">Save</Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

