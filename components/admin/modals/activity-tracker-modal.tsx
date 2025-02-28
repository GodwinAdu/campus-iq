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
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Button } from "@/components/ui/button";


export const ActivityTracker = () => {
    const { type, isOpen, closeModal } = useModal()
    const isModalOpen = isOpen && type === "activity";

    const [activity, setActivity] = useState({
        name: "",
        duration: 30,
        enjoyment: 5,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send this data to your backend
        console.log("Activity logged:", activity)
        // Reset form
        setActivity({ name: "", duration: 30, enjoyment: 5 })
    }



    return (
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-[525px]">
                <ScrollArea className="h-[450px] pr-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Activity Tracker</CardTitle>
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
                                <Button type="submit">Log Activity</Button>
                            </form>
                        </CardContent>
                    </Card>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

