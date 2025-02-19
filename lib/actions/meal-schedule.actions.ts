"use server"

import { currentUser } from "../helpers/current-user";
import Employee from "../models/employee.models";
import MealPlan from "../models/meal-plan.models";
import MealSchedule from "../models/meal-schedule.models";
import { connectToDB } from "../mongoose";

interface Props {
    name: string;
    description: string;
    allergens: string[];
    mealType: string;
    mealPlanId: string;
}
export async function createMealSchedule(values: Props) {
    try {
        const { name, description, allergens, mealType, mealPlanId } = values;
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        const newSchedule = new MealSchedule({
            name,
            description,
            allergens,
            mealType,
            mealPlanId,
            schoolId,
            createdBy: user._id,
            action_type: 'created',
        });
        await newSchedule.save();


    } catch (error) {
        console.log('error creating meal schedule', error);
        throw error;
    }
};


export async function fetchAllSchedule() {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        const schedules = await MealSchedule.find({ schoolId })
            .populate([
                { path: 'mealPlanId', model: MealPlan, select: 'name price' },
                { path: 'createdBy', model: Employee, select: 'fullName' },
            ]);

        if (schedules.length === 0) {
            console.log('No meal schedules found');
            return [];
        };

        return JSON.parse(JSON.stringify(schedules));

    } catch (error) {
        console.log('error fetching meal schedules', error);
        throw error;
    }
}