"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const mealTypes = ["breakfast", "lunch", "dinner"]

const MealTimetable = ({ timetables }) => {
    const [weeklyMeals, setWeeklyMeals] = useState([])
    const [startDate, setStartDate] = useState(new Date()) // Start from the current date
    const [selectedMeal, setSelectedMeal] = useState(null)
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState("")

    // function getMealsForWeek(startDate: Date) {
    //     if (school.isFixedSchedule) {
    //         // For fixed schedules, match by weekday and meal type only
    //         return timetables.filter((meal) => {
    //             const mealDate = new Date(meal.date);
    //             return mealDate.getDay() === startDate.getDay();
    //         });
    //     } else {
    //         // For dynamic schedules, match meals within the week range
    //         const endDate = new Date(startDate);
    //         endDate.setDate(endDate.getDate() + 7);
    //         return timetables.filter((meal) => meal.date >= startDate && meal.date < endDate);
    //     }
    // }


    function getMealsForWeek(startDate) {
        const startOfWeek = new Date(startDate)
        startOfWeek.setHours(0, 0, 0, 0)

        const endDate = new Date(startDate)
        endDate.setDate(endDate.getDate() + 7)

        return timetables.filter(meal => {
            const mealDate = new Date(meal.date)
            return mealDate >= startOfWeek && mealDate < endDate
        })
    }

    useEffect(() => {
        setWeeklyMeals(getMealsForWeek(startDate))
    }, [startDate, timetables])

    const getMealForDayAndType = (dayIndex, type) => {
        const dayOffset = (startDate.getDay() + 6) % 7; // Ensure Monday starts at index 0
        const date = new Date(startDate);
        date.setDate(date.getDate() - dayOffset + dayIndex); // Adjust date based on real weekday alignment

        return weeklyMeals.find(meal => {
            return new Date(meal.date).toDateString() === date.toDateString() &&
                meal.mealScheduleId?.mealType === type;
        });
    };


    // const getMealForDayAndType = (day: number, type: string): Meal | undefined => {
    //     const date = new Date(startDate);
    //     date.setDate(date.getDate() + day);

    //     return weeklyMeals.find((meal) => {
    //         if (school.isFixedSchedule) {
    //             return meal.mealScheduleId.mealType === type;
    //         }
    //         return meal.date.toDateString() === date.toDateString() && meal.mealScheduleId.mealType === type;
    //     });
    // };


    const handlePreviousWeek = () => {
        setStartDate(prev => {
            const newDate = new Date(prev)
            newDate.setDate(newDate.getDate() - 7)
            return newDate
        })
    }

    const handleNextWeek = () => {
        setStartDate(prev => {
            const newDate = new Date(prev)
            newDate.setDate(newDate.getDate() + 7)
            return newDate
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Button variant="outline" onClick={handlePreviousWeek}>
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Previous Week
                    </Button>
                    <Button variant="outline" onClick={handleNextWeek}>
                        Next Week
                        <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="p-2 border">Day</th>
                                {mealTypes.map(type => (
                                    <th key={type} className="p-2 border capitalize">{type}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {daysOfWeek.map((day, index) => (
                                <motion.tr key={day} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                                    <td className="p-2 border font-bold">{day}</td>
                                    {mealTypes.map(type => {
                                        const meal = getMealForDayAndType(index, type)
                                        return (
                                            <td key={`${day}-${type}`} className="p-2 border">
                                                {meal ? (
                                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                                                        <p className="font-semibold">{meal.mealScheduleId.name}</p>
                                                        <p className="text-sm text-muted-foreground">{meal.mealScheduleId.description}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            Plan: {meal.mealScheduleId.mealPlanId?.name || "No plan"}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            Price: <span className="font-extrabold">GHS {meal.mealScheduleId.mealPlanId?.price || "No plan"}</span>
                                                        </p>
                                                        {meal.mealScheduleId.allergens?.length > 0 && (
                                                            <p className="text-xs text-red-500 dark:text-red-400">
                                                                Allergens: {meal.mealScheduleId.allergens.join(", ")}
                                                            </p>
                                                        )}
                                                        {meal.nutritionInfo?.length > 0 && (
                                                            <div className="text-sm text-gray-600 mt-2 space-y-1">
                                                                <h4 className="text-xs font-semibold text-gray-700">Nutritional Information:</h4>
                                                                <ul className="flex flex-wrap gap-2 text-xs">
                                                                    {meal.nutritionInfo.map((info) => (
                                                                        <li
                                                                            key={info._id}
                                                                            className="bg-gray-100 px-2 py-1 rounded-md shadow-sm"
                                                                        >
                                                                            <span className="font-medium">{info.name}:</span> {info.quantity}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}

                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button variant="outline" size="sm" className="mt-2" onClick={() => setSelectedMeal(meal)}>
                                                                    Feedback
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>Provide Feedback</DialogTitle>
                                                                </DialogHeader>
                                                                <div className="grid gap-4 py-4">
                                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                                        <Label htmlFor="rating" className="text-right">Rating</Label>
                                                                        <Input id="rating" type="number" className="col-span-3" min={1} max={5} value={rating} onChange={e => setRating(parseInt(e.target.value))} />
                                                                    </div>
                                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                                        <Label htmlFor="comment" className="text-right">Comment</Label>
                                                                        <Textarea id="comment" className="col-span-3" value={comment} onChange={e => setComment(e.target.value)} />
                                                                    </div>
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </motion.div>
                                                ) : (
                                                    <p className="text-sm text-muted-foreground">No meal scheduled</p>
                                                )}
                                            </td>
                                        )
                                    })}
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    )
}

export default MealTimetable
