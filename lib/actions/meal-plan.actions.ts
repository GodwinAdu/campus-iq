"use server"

import { currentUser } from "../helpers/current-user";
import History from "../models/history.models";
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

        const history = new History({
            schoolId,
            actionType: 'MEAL_PLAN_CREATED', // Use a relevant action type
            details: {
                itemId: newPlan._id,
                deletedAt: new Date(),
            },
            message: `${user.fullName} created new meal plan with (ID: ${newPlan._id}) on ${new Date().toLocaleString()}.`,
            performedBy: user._id,
            entityId: newPlan._id,
            entityType: 'MEAL_PLAN', // The type of the entity, e.g., 'PRODUCT', 'SUPPLIER', etc.
        });

        await Promise.all([newPlan.save(), history.save()]);

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