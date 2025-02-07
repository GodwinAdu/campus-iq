"use server";

import mongoose from "mongoose";
import { currentUser } from "../helpers/current-user";
import Attendance from "../models/attendance.models";
import { connectToDB } from "../mongoose";

/**
 * Save or update attendance records.
 * @param attendance - The attendance records mapped by userId.
 * @param schoolId - The ID of the school.
 * @param classId - The ID of the class.
 * @param year - The academic year.
 * @param month - The month (1-12).
 * @param userType - The type of user (Student/Employee).
 * @param createdBy - The ID of the user making the update.
 * @returns A success or error message.
 */
export async function saveAttendance({
    attendance,
    classId,
    year,
    month,
    type,
}: {
    attendance: Record<string, Record<number, boolean>>;
    classId: string;
    year: number;
    month: number;
    type: "Student" | "Employee";
}) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");
        const schoolId = user.schoolId
        await connectToDB();

        const bulkOperations = Object.entries(attendance).map(([userId, records]) => ({
            updateOne: {
                filter: { userId, schoolId, classId, year, month },
                update: {
                    $set: { records, userType: type, createdBy: user._id, modifiedBy: user._id, mod_flag: true },
                },
                upsert: true, // Creates new if it doesn't exist
            },
        }));

        if (bulkOperations.length > 0) {
            await Attendance.bulkWrite(bulkOperations);
        }

        return { success: true, message: "Attendance saved successfully!" };
    } catch (error) {
        console.error("Error saving attendance:", error);
        return { success: false, message: "Failed to save attendance" };
    }
}




export async function getAttendance(classId: string, year: number, month: number) {
    try {
        if (!classId ||!year ||!month) throw new Error("Invalid parameters");
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");
        const schoolId = user.schoolId;

        await connectToDB();

        const classObjectId = new mongoose.Types.ObjectId(classId); // Convert string to ObjectId

        const data = await Attendance.find({schoolId, classId: classObjectId, year, month });
        if (!data) return []
        return JSON.parse(JSON.stringify(data));
    } catch (error) {
        console.error("Error fetching attendance:", error);
        throw error;
    }
}