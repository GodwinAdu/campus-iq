"use server"

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import FeesFine from "../models/fees-fine.models";
import Class from "../models/class.models";
import { currentUser } from "../helpers/current-user";
import History from "../models/history.models";

interface CreateFineProps {
    stage: string;
    fineType: string;
    fineAmount: number;
    feesType: string;
    frequency: string;

}
export async function createFineFees(values: CreateFineProps, path: string) {
    try {
        await connectToDB();
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;


        const fine = new FeesFine({
            schoolId,
            classId: values.stage,
            fineType: values.fineType,
            fineAmount: values.fineAmount,
            feesType: values.feesType,
            frequency: values.frequency,
            createdBy: user._id,
            action_type: "create"
        });

        const history = new History({
            schoolId,
            actionType: 'FEES_FINE_CREATED', // Use a relevant action type
            details: {
                itemId: fine._id,
                deletedAt: new Date(),
            },
            message: `${user.fullName} created new fine fees for class (ID: ${values.stage}) on ${new Date().toLocaleString()}.`,
            performedBy: user._id,
            entityId: fine._id,
            entityType: 'FEES_FINE'  // The type of the entity
        });

        await Promise.all([
            fine.save(),
            history.save(),
        ]);

        revalidatePath(path)

    } catch (error) {
        console.log("Unable to create fine fees: " + error);
        throw error;
    }
}

export async function fetchAllFeesFine() {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;
        await connectToDB();

        const feesFine = await FeesFine.find({schoolId})

            .populate([
                { path: "classId", model: Class, select: "name" },
                { path: "createdBy", model: "Employee", select: "_id fullName" },
            ])
            .exec();

        if (!feesFine || feesFine.length === 0) {

            console.log("FeesFine don't exist");

            return []; // or throw an error if you want to handle it differently
        }

        return JSON.parse(JSON.stringify(feesFine));

    } catch (error: any) {
        console.error("Error fetching FeesFine:", error);
        throw error; // throw the error to handle it at a higher Day if needed
    }
}

export async function deleteFine(id: string) {
    await connectToDB();
    try {
        const fine = await FeesFine.findByIdAndDelete(id)
        if (!fine) {
            console.log("Fine don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete successfully")

        return JSON.parse(JSON.stringify(fine));

    } catch (error) {
        console.error("Error deleting Fine:", error);
        throw error; // throw the error to handle it at a higher Fine if needed
    }

}

