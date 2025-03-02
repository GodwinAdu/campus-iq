"use server"

import { currentUser } from "../helpers/current-user";
import Activity from "../models/activity.models";
import { connectToDB } from "../mongoose";

interface ActivityProps {
    studentId: string;
    name: string;
    duration: number;
    enjoyment: number;
}

export async function saveActivity(values: ActivityProps) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");
        const schoolId = user.schoolId;
        const { studentId, name, duration, enjoyment } = values;

        // Define today's date range (00:00 - 23:59)
        const today = new Date();
        const startOfDay = today;
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        await connectToDB();

        // Check if a Activity entry exists for today
        const existingActivity = await Activity.findOne({
            schoolId,
            studentId,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (existingActivity) {
            console.log("Existing Activity found:", existingActivity);
            // Update existing Activity entry
            const updatedActivity = await Activity.findByIdAndUpdate(
                existingActivity._id,
                {
                    $set: {
                        name,
                        duration,
                        enjoyment,
                        modifiedBy: user._id,
                        mod_flag: true,
                        date: new Date(),
                        action_type: "updated"
                    }
                },
                { new: true }
            );
            console.log("Activity updated:", updatedActivity);
            return JSON.parse(JSON.stringify(updatedActivity));
        }

        // Create a new Activity entry
        const newActivity = await Activity.create({
            studentId,
            name,
            duration,
            enjoyment,
            date: new Date(),
            schoolId,
            createdBy: user._id,
            action_type: "created"
        });

        console.log("New Activity entry created:", newActivity);
        return JSON.parse(JSON.stringify(newActivity));
    } catch (error) {
        console.error("Error saving Activity);:", error);
        return { success: false, message: "An error occurred while saving Activity);" };
    }
};


export async function getActivityHistory(studentId: string) {
    console.log("📢 getMoodHistory called with studentId:", studentId); // Log input
    if (!studentId) {
        console.error("❌ Error: studentId is undefined");
        return { success: false, message: "studentId is required" };
    }

    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");
        const schoolId = user.schoolId;

        await connectToDB();

        const ActivityHistory = await Activity.find({
            schoolId,
            studentId
        }).sort({ date: -1 });

        if (ActivityHistory.length === 0) {
            console.log("⚠️ No Activity history found for studentId:", studentId);
            return [];
        }

        console.log("✅ Activity history fetched successfully:", ActivityHistory);
        return JSON.parse(JSON.stringify(ActivityHistory));

    } catch (error) {
        console.error("❌ Error fetching Activity history:", error);
        return { success: false, message: "An error occurred while fetching Activity history" };
    }
}
