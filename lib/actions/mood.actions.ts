"use server"

import Mood from "../models/mood.models";
import { currentUser } from "../helpers/current-user";
import { connectToDB } from "../mongoose";


interface SaveMoodInput {
    studentId: string;
    mood: number;
    energy: number;
    factors: string[];
}

export async function saveMood(values: SaveMoodInput) {
    console.log("saveMood function called with values:", values); // Add this line

    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");
        const schoolId = user.schoolId;
        const { mood, energy, factors, studentId } = values;

        // Define today's date range (00:00 - 23:59)
        const today = new Date();
        const startOfDay = today;
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        await connectToDB();

        // Check if a mood entry exists for today
        const existingMood = await Mood.findOne({
            schoolId,
            studentId,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (existingMood) {
            console.log("Existing mood found:", existingMood);
            // Update existing mood entry
            const updatedMood = await Mood.findByIdAndUpdate(
                existingMood._id,
                {
                    $set: {
                        mood,
                        energy,
                        factors,
                        modifiedBy: user._id,
                        mod_flag: true,
                        date: new Date(),
                        action_type: "updated"
                    }
                },
                { new: true }
            );
            console.log("Mood updated:", updatedMood);
            return JSON.parse(JSON.stringify(updatedMood));
        }

        // Create a new mood entry
        const newMood = await Mood.create({
            studentId,
            mood,
            energy,
            factors,
            date: new Date(),
            schoolId,
            createdBy: user._id,
            action_type: "created"
        });

        console.log("New mood entry created:", newMood);
        return JSON.parse(JSON.stringify(newMood));
    } catch (error) {
        console.error("Error saving mood:", error);
        return { success: false, message: "An error occurred while saving mood" };
    }
}

export async function getMoodHistory(studentId: string) {
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

        const moodHistory = await Mood.find({
            schoolId,
            studentId
        }).sort({ date: -1 });

        if (moodHistory.length === 0) {
            console.log("⚠️ No mood history found for studentId:", studentId);
            return [];
        }

        console.log("✅ Mood history fetched successfully:", moodHistory);
        return JSON.parse(JSON.stringify(moodHistory));

    } catch (error) {
        console.error("❌ Error fetching mood history:", error);
        return { success: false, message: "An error occurred while fetching mood history" };
    }
}
