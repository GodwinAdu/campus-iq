"use server"

import { revalidatePath } from "next/cache";
import ExamHall from "../models/exams-hall.models";
import { connectToDB } from "../mongoose";
import { currentUser } from "../helpers/current-user";


interface ExamProps {
    name: string;
    seats: number;
    createdBy?: string;
}
export async function createExamsHall(values: ExamProps) {
    try {
        const { name, seats } = values;
        const user = await currentUser();

        if (!user) throw new Error("User not authenticated");
        const schoolId = user.schoolId;

        await connectToDB();

        const existingExamsHall = await ExamHall.findOne({ name });

        if (existingExamsHall) throw new Error(" ExamHall not found");

        const newExamsHall = new ExamHall({
            schoolId,
            name,
            seats,
            createdBy: user._id,
            action_type: "created"
        })

        await newExamsHall.save();

    } catch (error) {
        console.log("Error creating examsHall", error);
        throw error;
    }
}



export async function fetchAllHalls() {
    try {
        const user = await currentUser();
        if (!user) throw new Error("No current user");
        const schoolId = user.schoolId;

        const halls = await ExamHall.find({schoolId})
            .populate("createdBy", "fullName");

        if (!halls || halls.length === 0) {
            console.log("No examsHalls found");
            return [];
        }

        return JSON.parse(JSON.stringify(halls));
    } catch (error) {
        console.error("Error fetching examsHalls:", error);
        throw error;
    }
}



export async function fetchHallById(id: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("No current user");
        await connectToDB();

        const hall = await ExamHall.findById(id);

        if (!hall) {
            console.log("ExamsHall not found");
            return null;
        }

        return JSON.parse(JSON.stringify(hall));
    } catch (error) {
        console.error("Error fetching examsHall by id:", error);
        throw error;
    }
}

export async function updateExamsHall(id: string, values: Partial<ExamProps>, path: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not authenticated");

        await connectToDB();

        const newValues = {
            ...values,
            mod_flag: true,
            modifyBy: user?._id,
            action_type: "updated"
        }

        const updatedHall = await ExamHall.findByIdAndUpdate(
            id,
            { $set: newValues },
            { new: true, runValidators: true }
        );

        if (!updatedHall) {
            console.log("ExamsHall not found");
            return null;
        }

        console.log("ExamsHall updated successfully");
        revalidatePath(path)
        return JSON.parse(JSON.stringify(updatedHall));
    } catch (error) {
        console.error("Error updating examsHall:", error);
        throw error;
    }
}


export async function deleteExamsHall(id: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not authenticated");

        await connectToDB();

        const hall = await ExamHall.findByIdAndDelete(id);

        if (!hall) {
            console.log("ExamsHall not found");
            return null;
        }

        console.log("ExamsHall deleted successfully");
        return JSON.parse(JSON.stringify(hall));
    } catch (error) {
        console.error("Error deleting examsHall:", error);
        throw error;
    }
}
