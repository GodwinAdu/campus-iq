"use server"

import { currentUser } from "../helpers/current-user";
import { connectToDB } from "../mongoose";
import Behavior from "../models/behavior.models";
import History from "../models/history.models";


interface SaveMoodInput {
    studentId: string;
    behaviorType: string;
    description: string;
    severity: string;
}

export async function saveBehavior(values: SaveMoodInput) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");
        const schoolId = user.schoolId;
        const { studentId, behaviorType, description, severity } = values;

        // Define today's date range (00:00 - 23:59)
        const today = new Date();
        const startOfDay = today;
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        await connectToDB();

        // Check if a Behavior entry exists for today
        const existingBehavior = await Behavior.findOne({
            schoolId,
            studentId,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (existingBehavior) {
            console.log("Existing Behavior found:", existingBehavior);
            // Update existing Behavior entry
            const updatedBehavior = await Behavior.findByIdAndUpdate(
                existingBehavior._id,
                {
                    $set: {
                        behaviorType,
                        description,
                        severity,
                        modifiedBy: user._id,
                        mod_flag: true,
                        date: new Date(),
                        action_type: "updated"
                    }
                },
                { new: true }
            );
            const history = new History({
                schoolId,
                actionType: 'BEHAVIOR_UPDATED', // Use a relevant action type
                details: {
                    itemId: updatedBehavior._id,
                    deletedAt: new Date(),
                },
                message: `${user.fullName} updated Behavior for  a student with (ID: ${updatedBehavior._id}) on ${new Date().toLocaleString()}.`,
                performedBy: user._id, // User who performed the action,
                entityId: updatedBehavior._id,  // The ID of the deleted unit
                entityType: 'BEHAVIOR',  // The type of the entity
            });

            await history.save();
            console.log("Behavior updated:", updatedBehavior);
            return JSON.parse(JSON.stringify(updatedBehavior));
        }

        // Create a new Behavior entry
        const newBehavior = await Behavior.create({
            studentId,
            behaviorType,
            description,
            severity,
            date: new Date(),
            schoolId,
            createdBy: user._id,
            action_type: "created"
        });
        const history = new History({
            schoolId,
            actionType: 'BEHAVIOR_CREATED', // Use a relevant action type
            details: {
                itemId: newBehavior._id,
                deletedAt: new Date(),
            },
            message: `${user.fullName} created new Behavior for  a student with (ID: ${newBehavior._id}) on ${new Date().toLocaleString()}.`,
            performedBy: user._id, // User who performed the action,
            entityId: newBehavior._id,  // The ID of the deleted unit
            entityType: 'BEHAVIOR',  // The type of the entity
        });

        await history.save();

        console.log("New behavior entry created:", newBehavior);
        return JSON.parse(JSON.stringify(newBehavior));
    } catch (error) {
        console.error("Error saving Behavior);:", error);
        return { success: false, message: "An error occurred while saving Behavior);" };
    }
}

export async function getBehaviorHistory(studentId: string) {
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

        const behaviorHistory = await Behavior.find({
            schoolId,
            studentId
        }).sort({ date: -1 });

        if (behaviorHistory.length === 0) {
            console.log("⚠️ No behavior history found for studentId:", studentId);
            return [];
        }

        console.log("✅ behavior history fetched successfully:", behaviorHistory);
        return JSON.parse(JSON.stringify(behaviorHistory));

    } catch (error) {
        console.error("❌ Error fetching behavior history:", error);
        return { success: false, message: "An error occurred while fetching behavior history" };
    }
}
