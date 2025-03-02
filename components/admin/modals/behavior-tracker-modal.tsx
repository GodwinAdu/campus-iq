"use client"

import { useModal } from "@/hooks/use-modal"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { getBehaviorHistory, saveBehavior } from "@/lib/actions/behavior.actions";
import moment from "moment";


export const BehaviorTracker = () => {
    const router = useRouter()
    const { type, isOpen, closeModal, modalData } = useModal()
    const [behaviorHistory, setBehaviorHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const isModalOpen = isOpen && type === "behavior";

    const studentId = modalData?._id as string;

    const [incident, setIncident] = useState({
        behaviorType: "",
        description: "",
        severity: "",
    });

    useEffect(() => {
        if (type !== "behavior") return;
        fetchBehaviorHistory()
    }, [modalData])

    const fetchBehaviorHistory = async () => {
        try {

            if (!studentId) {
                return;
            }
            const response = await getBehaviorHistory(studentId)
            console.log(response, "success")
            setBehaviorHistory(response)
        } catch (error) {
            console.error("Error fetching Behavior history:", error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const newIncident = { ...incident, studentId }
            await saveBehavior(newIncident)
            // Reset form
            setIncident({ behaviorType: "", description: "", severity: "" })
            router.refresh()
            fetchBehaviorHistory()
            toast({
                title: "Incident logged",
                description: "Your incident has been logged successfully.",
            })

        } catch (error) {
            console.error("Error logging incident:", error)
            toast({
                title: "Something went wrong",
                description: "Failed to log your incident. Please try again.",
                variant: "destructive",
            })

        } finally {
            setIsLoading(false)
        }
    }




    return (
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-[525px]">
                <ScrollArea className="h-[450px] pr-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                <span>Behavior Incident Log</span>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <Calendar className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Behavior History</DialogTitle>
                                            <DialogDescription>{modalData?.fullName} behavior entries for the past days</DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            {behaviorHistory.length > 0 ? (
                                                <Table>
                                                    <TableCaption>A list of your recent behavior.</TableCaption>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead className="w-[100px]">Behavior Type</TableHead>
                                                            <TableHead>description</TableHead>
                                                            <TableHead>severity</TableHead>
                                                            <TableHead className="text-right">Date</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {behaviorHistory.map((behavior) => (
                                                            <TableRow key={behavior?._id}>
                                                                <TableCell className="font-medium">{behavior?.behaviorType}</TableCell>
                                                                <TableCell>{behavior?.description}</TableCell>
                                                                <TableCell>{behavior?.severity}</TableCell>
                                                                <TableCell className="text-right">{moment(behavior?.date).fromNow()}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            ) : (
                                                <p className="text-center text-muted-foreground">No Behavior entries yet</p>
                                            )}
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="incident-type">Incident Type</Label>
                                    <Select value={incident.behaviorType} onValueChange={(value) => setIncident({ ...incident, behaviorType: value })}>
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
                                <Button disabled={isLoading} type="submit">
                                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {isLoading ? "Loading..." : "Log Incident"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

