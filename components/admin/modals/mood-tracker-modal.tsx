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
import { Button } from "@/components/ui/button"
import { Calendar, Frown, Meh, Smile, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

const moodEmojis = [
    { value: 1, icon: <Frown className="w-8 h-8" />, label: "Very Sad", color: "text-red-500" },
    { value: 2, icon: <Frown className="w-8 h-8" />, label: "Sad", color: "text-orange-500" },
    { value: 3, icon: <Meh className="w-8 h-8" />, label: "Neutral", color: "text-yellow-500" },
    { value: 4, icon: <Smile className="w-8 h-8" />, label: "Happy", color: "text-lime-500" },
    { value: 5, icon: <Smile className="w-8 h-8" />, label: "Very Happy", color: "text-green-500" },
]

const moodFactors = ["Sleep", "Diet", "Exercise", "Social Interactions", "Work/Study", "Hobbies", "Weather"]

type MoodEntry = {
    date: string
    mood: number
    energy: number
    factors: string[]
}

export const MoodTracker = () => {
    const { type, isOpen, closeModal } = useModal()
    const [mood, setMood] = useState<number>(3)
    const [energy, setEnergy] = useState<number>(50)
    const [factors, setFactors] = useState<string[]>([])
    const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([])
    const [showTrends, setShowTrends] = useState(false)

    useEffect(() => {
        // In a real app, you'd fetch this data from an API
        const mockHistory: MoodEntry[] = [
            { date: "2023-05-01", mood: 4, energy: 70, factors: ["Sleep", "Exercise"] },
            { date: "2023-05-02", mood: 3, energy: 50, factors: ["Work/Study"] },
            { date: "2023-05-03", mood: 5, energy: 80, factors: ["Social Interactions", "Hobbies"] },
            { date: "2023-05-04", mood: 2, energy: 30, factors: ["Weather", "Work/Study"] },
            { date: "2023-05-05", mood: 4, energy: 60, factors: ["Exercise", "Diet"] },
        ]
        setMoodHistory(mockHistory)
    }, [])

    const handleMoodSelect = (value: number) => {
        setMood(value)
    }

    const handleFactorToggle = (factor: string) => {
        setFactors((prev) => (prev.includes(factor) ? prev.filter((f) => f !== factor) : [...prev, factor]))
    }

    const handleSubmit = () => {
        const newEntry: MoodEntry = {
            date: new Date().toISOString().split("T")[0],
            mood,
            energy,
            factors,
        }
        setMoodHistory((prev) => [...prev, newEntry])
        // Here you would typically send this data to your backend
        console.log("Mood entry submitted:", newEntry)
        // Reset form
        setMood(3)
        setEnergy(50)
        setFactors([])
    }

    const getAverageMood = () => {
        const sum = moodHistory.reduce((acc, entry) => acc + entry.mood, 0)
        return (sum / moodHistory.length).toFixed(1)
    }

    const getMoodSuggestion = () => {
        if (mood <= 2) {
            return "Consider talking to a friend or counselor. Remember, it's okay to seek help."
        } else if (mood === 3) {
            return "Try engaging in an activity you enjoy to boost your mood."
        } else {
            return "Great mood! Share your positivity with others around you."
        }
    }

    const isModalOpen = isOpen && type === "mood"

    return (
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-[525px]">
                <ScrollArea className="h-[450px] pr-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>Daily Mood Tracker</span>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <Calendar className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Mood History</DialogTitle>
                                            <DialogDescription>Your mood entries for the past days</DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            {moodHistory.map((entry, index) => (
                                                <div key={index} className="flex items-center justify-between">
                                                    <span>{entry.date}</span>
                                                    <div className="flex items-center space-x-2">
                                                        {moodEmojis[entry.mood - 1].icon}
                                                        <span>{entry.energy}% energy</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <Label>How are you feeling today?</Label>
                                    <RadioGroup
                                        className="flex justify-between mt-2"
                                        value={mood.toString()}
                                        onValueChange={(value) => handleMoodSelect(Number.parseInt(value))}
                                    >
                                        {moodEmojis.map((moodEmoji) => (
                                            <div key={moodEmoji.value} className="flex flex-col items-center">
                                                <RadioGroupItem
                                                    value={moodEmoji.value.toString()}
                                                    id={`mood-${moodEmoji.value}`}
                                                    className="sr-only"
                                                />
                                                <Label
                                                    htmlFor={`mood-${moodEmoji.value}`}
                                                    className={`cursor-pointer ${moodEmoji.color} ${mood === moodEmoji.value ? "scale-125" : ""}`}
                                                >
                                                    {moodEmoji.icon}
                                                </Label>
                                                <span className="text-xs mt-1">{moodEmoji.label}</span>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <div>
                                    <Label>Energy Level</Label>
                                    <Slider
                                        min={0}
                                        max={100}
                                        step={1}
                                        value={[energy]}
                                        onValueChange={(value) => setEnergy(value[0])}
                                        className="mt-2"
                                    />
                                    <div className="text-center mt-1">{energy}%</div>
                                </div>

                                <div>
                                    <Label>Factors affecting your mood</Label>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {moodFactors.map((factor) => (
                                            <Button
                                                key={factor}
                                                variant={factors.includes(factor) ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => handleFactorToggle(factor)}
                                            >
                                                {factor}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                <Button onClick={handleSubmit} className="w-full">
                                    Log Mood
                                </Button>

                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h3 className="font-semibold mb-2">Insights</h3>
                                    <p>{getMoodSuggestion()}</p>
                                    <p className="mt-2">Your average mood: {getAverageMood()} / 5</p>
                                </div>

                                <Button variant="outline" className="w-full" onClick={() => setShowTrends(!showTrends)}>
                                    <TrendingUp className="w-4 h-4 mr-2" />
                                    {showTrends ? "Hide Trends" : "Show Trends"}
                                </Button>

                                {showTrends && (
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                        <h3 className="font-semibold mb-2">Mood Trends</h3>
                                        {/* Here you would typically render a chart or graph */}
                                        <p>Trend visualization would go here</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

