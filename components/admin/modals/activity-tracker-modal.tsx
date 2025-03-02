"use client"

import { useModal } from "@/hooks/use-modal"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Loader2 } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import moment from "moment";
import { getActivityHistory, saveActivity } from "@/lib/actions/activity.actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


export const ActivityTracker = () => {
    const { type, isOpen, closeModal, modalData } = useModal()
    const [activities, setActivities] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const router = useRouter();
    const isModalOpen = isOpen && type === "activity";

    const studentId = modalData?._id as string;

    const [activity, setActivity] = useState({
        name: "",
        duration: 30,
        enjoyment: 5,
    });

    useEffect(() => {
        if (type !== "activity") return;
        fetchActivityHistory()
    }, [modalData])

    const fetchActivityHistory = async () => {
        try {

            if (!studentId) {
                return;
            }
            const response = await getActivityHistory(studentId)
            console.log(response, "success")
            setActivities(response)
        } catch (error) {
            console.error("Error fetching Activity history:", error)
        }
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const newActivity = {
                studentId,
                ...activity,
            }
            await saveActivity(newActivity)
            router.refresh()
            setActivity({ name: "", duration: 30, enjoyment: 5 });
            fetchActivityHistory()
            toast({
                title: "Activity logged",
                description: "Your activity has been logged successfully.",
            })

        } catch (error) {
            console.error("Error logging activity:", error)
            toast({
                title: "Error logging activity",
                description: "Failed to log your activity. Please try again.",
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
                            <CardTitle className="flex items-center justify-between">
                                <span>Activity Tracker</span>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <Calendar className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Activity History</DialogTitle>
                                            <DialogDescription>{modalData?.fullName} activities entries for the past days</DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            {activities.length > 0 ? (
                                                <Table>
                                                    <TableCaption>A list of your recent behavior.</TableCaption>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead className="w-[100px]">Activity Name</TableHead>
                                                            <TableHead>Duration</TableHead>
                                                            <TableHead>Enjoyment</TableHead>
                                                            <TableHead className="text-right">Date</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {activities.map((data) => (
                                                            <TableRow key={data?._id}>
                                                                <TableCell className="font-medium">{data?.name}</TableCell>
                                                                <TableCell>{data?.duration}</TableCell>
                                                                <TableCell>{data?.enjoyment}</TableCell>
                                                                <TableCell className="text-right">{moment(data?.date).fromNow()}</TableCell>
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
                                    <Label htmlFor="activity-name">Activity Name</Label>
                                    <Input
                                        id="activity-name"
                                        value={activity.name}
                                        onChange={(e) => setActivity({ ...activity, name: e.target.value })}
                                        placeholder="e.g., Reading, Sports, Music"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="activity-duration">Duration (minutes)</Label>
                                    <Slider
                                        id="activity-duration"
                                        min={5}
                                        max={120}
                                        step={5}
                                        value={[activity.duration]}
                                        onValueChange={(value) => setActivity({ ...activity, duration: value[0] })}
                                    />
                                    <div className="text-center">{activity.duration} minutes</div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="activity-enjoyment">Enjoyment Level</Label>
                                    <Slider
                                        id="activity-enjoyment"
                                        min={1}
                                        max={10}
                                        step={1}
                                        value={[activity.enjoyment]}
                                        onValueChange={(value) => setActivity({ ...activity, enjoyment: value[0] })}
                                    />
                                    <div className="text-center">{activity.enjoyment} / 10</div>
                                </div>
                                <Button disabled={isLoading} type="submit">
                                    {isLoading  && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {isLoading ? "Loading..." : "Activity Log"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

