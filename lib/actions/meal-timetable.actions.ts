"use server"

import { currentUser } from "../helpers/current-user";
import MealPlan from "../models/meal-plan.models";
import MealSchedule from "../models/meal-schedule.models";
import MealTimetable from "../models/meal-timetable.models";
import { connectToDB } from "../mongoose";

interface Props {
    date: Date;
    mealScheduleId: string;
    nutritionInfo: { name: string, quantity: string }[];
}

export async function createMealTimetable(values: Props) {
    try {
        const { date, mealScheduleId, nutritionInfo } = values;
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        const timetable = new MealTimetable({
            schoolId,
            date,
            mealScheduleId,
            nutritionInfo,
            createdBy: user._id,
            action_type: "create"
        });

        await timetable.save();

    } catch (error) {
        console.log("error creating meal timetable", error);
        throw error;
    }
}



export async function fetchAllMealTimetable() {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        const timetables = await MealTimetable.find({ schoolId })
            .populate({
                path: "mealScheduleId",
                model: MealSchedule,
                populate: {
                    path: "mealPlanId",
                    model: MealPlan
                }
            })
            .exec();

        return JSON.parse(JSON.stringify(timetables));

    } catch (error) {
        console.log("error fetching meal timetables", error);
        throw error;
    }
}