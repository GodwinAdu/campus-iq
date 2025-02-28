"use client"

import { useModal } from "@/hooks/use-modal"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export const BehaviorTracker = () => {
    const { type, isOpen, closeModal } = useModal()
    const isModalOpen = isOpen && type === "behavior";

    const [incident, setIncident] = useState({
        type: "",
        description: "",
        severity: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send this data to your backend
        console.log("Incident logged:", incident)
        // Reset form
        setIncident({ type: "", description: "", severity: "" })
    }




    return (
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-[525px]">
                <ScrollArea className="h-[450px] pr-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Behavior Incident Log</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="incident-type">Incident Type</Label>
                                    <Select value={incident.type} onValueChange={(value) => setIncident({ ...incident, type: value })}>
                                        <SelectTrigger id="incident-type">
                                            <SelectValue placeholder="Select incident type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="disruptive">Disruptive Behavior</SelectItem>
                                            <SelectItem value="bullying">Bullying</SelectItem>
                                            <SelectItem value="absence">Unauthorized Absence</SelectItem>
                                            <SelectItem value="academic">Academic Dishonesty</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="incident-description">Description</Label>
                                    <Input
                                        id="incident-description"
                                        value={incident.description}
                                        onChange={(e) => setIncident({ ...incident, description: e.target.value })}
                                        placeholder="Describe the incident"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="incident-severity">Severity</Label>
                                    <Select value={incident.severity} onValueChange={(value) => setIncident({ ...incident, severity: value })}>
                                        <SelectTrigger id="incident-severity">
                                            <SelectValue placeholder="Select severity" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button type="submit">Log Incident</Button>
                            </form>
                        </CardContent>
                    </Card>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

