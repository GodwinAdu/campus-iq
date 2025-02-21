"use server"

import { currentUser } from "../helpers/current-user";
import { generateTransactionId } from "../helpers/generate-transactionid";
import MealPayment from "../models/meal-payment.models";
import { connectToDB } from "../mongoose";

export async function createCanteenPayment(values:{amount:number,paymentMethod:string},studentId:string){
    try {
        const {amount,paymentMethod} = values;
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;
        await connectToDB();
        const canteenPayment = new MealPayment({
            payerId: studentId,
            transactionId:generateTransactionId() ,// Generate a unique transaction ID
            amount,
            paymentMethod,
            schoolId,
            status:"Completed",
            createdBy: user._id,
            action_type: "created"
        });

        await canteenPayment.save();
    } catch (error) {
        console.error("Failed to create canteen payment", error);
        throw error;
    }
}