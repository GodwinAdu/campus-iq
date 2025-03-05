"use server"

import { currentUser } from "../helpers/current-user";
import { generateTransactionId } from "../helpers/generate-transactionid";
import History from "../models/history.models";
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

        const history = new History({
            schoolId,
            actionType: 'CANTEEN_PAYMENT_CREATED', // Use a relevant action type
            details: {
                itemId: canteenPayment._id,
                deletedAt: new Date(),
            },
            message: `${user.fullName} created new canteen payment with (ID: ${canteenPayment._id}) on ${new Date().toLocaleString()}.`,
            performedBy: user._id,
            entityId: canteenPayment._id,
            entityType: 'CANTEEN_PAYMENT', // The type of the entity, e.g., 'PRODUCT', 'SUPPLIER', etc.
        });

        await Promise.all([canteenPayment.save(), history.save()]);

    } catch (error) {
        console.error("Failed to create canteen payment", error);
        throw error;
    }
}