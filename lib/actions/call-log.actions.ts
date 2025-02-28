"use server"

import { revalidatePath } from "next/cache";
import { currentUser } from "../helpers/current-user";
import Call from "../models/call.models";

interface CallProps {
    callType: string;
    callPurpose: string;
    callerName: string;
    phone: string;
    email: string;
    date: Date;
    message: string;
    startTime: string;
    endTime: string;
    followDate?: Date | undefined;
}

export async function createCallLog(values: CallProps, path: string) {
    try {
        const {
            callType,
            callPurpose,
            callerName,
            phone,
            email,
            date,
            message,
            startTime,
            endTime,
            followDate,
        } = values
        const user = await currentUser();
        if (!user) throw new Error("user not logged in");
        const schoolId = user.schoolId;

        const newCall = new Call({
            callType,
            callPurpose,
            callerName,
            phone,
            email,
            date,
            message,
            startTime,
            endTime,
            followDate: followDate || null,
            createdBy: user._id,
            schoolId,
            action_type: "created",
        });

        await newCall.save();
        revalidatePath(path);

    } catch (error) {
        console.log("Failed to create call log", error);
        throw error;
    }
}


export async function fetchAllCalls() {
    try {
        const user = await currentUser();
        if (!user) throw new Error("user not logged in");
        const schoolId = user.schoolId;

        const calls = await Call.find({ schoolId });

        if (calls.length === 0) {
            console.log("No calls found");
            return [];
        }

        return JSON.parse(JSON.stringify(calls));

    } catch (error) {
        console.log("Failed to fetch calls", error);
        throw error;
    }
}


export async function fetchCallById(id: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("user not logged in");

        const call = await Call.findById(id);

        if (!call) {
            console.log("Call not found");
            return null;
        }

        return JSON.parse(JSON.stringify(call));

    } catch (error) {
        console.log("Failed to fetch call", error);
        throw error;
    }

}



export async function updateCallLog(values:Partial<CallProps>, id: string, path: string) {
    try {
        const user = await currentUser();

        if (!user) throw new Error("user not logged in");

        const newValues = {
            ...values,
            mod_flag: true,
            modifyBy: user._id,
            action_type: "updated",
        };

        const updatedCall = await Call.findByIdAndUpdate(
            id,
            { $set: newValues },
            { new: true, runValidators: true }
        );

        if (!updatedCall) {
            console.log("Call not found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path);
    } catch (error) {
        console.log("Failed to update call log", error);
        throw error;
    }
}