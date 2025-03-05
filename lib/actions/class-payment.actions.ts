"use server"

import { currentUser } from "../helpers/current-user";
import { generateTransactionId } from "../helpers/generate-transactionid";
import ClassPayment from "../models/class-payment.models";
import History from "../models/history.models";
import { connectToDB } from "../mongoose";

export async function createClassPayment(values: { amount: number, paymentMethod: string }, studentId: string) {
    try {
        const { amount, paymentMethod } = values;
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;
        await connectToDB();
        const classPayment = new ClassPayment({
            payerId: studentId,
            transactionId: generateTransactionId(),// Generate a unique transaction ID
            amount,
            paymentMethod,
            schoolId,
            status: "Completed",
            createdBy: user._id,
            action_type: "created"
        });

      const history = new History({
        schoolId,
            actionType: 'CLASS_PAYMENT_CREATED', // Use a relevant action type
            details: {
                itemId: classPayment._id,
                deletedAt: new Date(),
            },
            message: `${user.fullName} created new class payment for student (ID: ${studentId}) on ${new Date().toLocaleString()}.`,
            performedBy: user._id, // User who performed the action,
            entityId: classPayment._id,  // The ID of the deleted unit
            entityType: 'CLASS_PAYMENT',  // The type of the entity
      })
        await Promise.all([
            classPayment.save(),
            history.save()
        ]);


    } catch (error) {
        console.error("Failed to create canteen payment", error);
        throw error;
    }
}