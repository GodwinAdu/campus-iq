"use server"

import { currentUser } from "../helpers/current-user";
import MealPlan from "../models/meal-plan.models";
import { connectToDB } from "../mongoose";

interface Props {
    name: string;
    description: string;
    price: number;
}

export async function createMealPlan(values: Props) {
    try {
        const { name, description, price } = values
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        const newPlan = new MealPlan({
            name,
            description,
            price,
            schoolId,
            createdBy: user._id,
            action_type: "created",
        });

        await newPlan.save();

    } catch (error) {
        console.error("Error creating meal plan", error);
        throw error;
    }
}


export async function fetchAllPlans() {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        const plans = await MealPlan.find({ schoolId });

        if (plans.length === 0) {
            console.log("No meal plans found");
            return [];
        };

        return JSON.parse(JSON.stringify(plans));

    } catch (error) {
        console.error("Error fetching meal plans", error);
        throw error;
    }
}