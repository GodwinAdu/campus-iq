"use server"

import { currentProfile } from "../helpers/current-profile";
import { connectToDB } from "../mongoose";
import GradeRange from '../models/grade-range.models';
import { revalidatePath } from "next/cache";

interface GradeRangeProps {
    gradeName: string;
    gradePoint: number;
    minPercentage: number;
    maxPercentage: number;
    remark?: string;
}

export async function createGradeRange(values: GradeRangeProps, path: string) {
    try {
        const { gradeName, gradePoint, minPercentage, maxPercentage, remark } = values;
        const user = await currentProfile();


        await connectToDB();

        const existingGradeRange = await GradeRange.findOne({ gradeName });

        if (existingGradeRange) {
            throw new Error("Grade range already exists");
        }

        const newGradeRange = new GradeRange({
            gradeName,
            gradePoint,
            minPercentage,
            maxPercentage,
            remark,
            createdBy: user._id,
            action_type: "created"
        });

        await newGradeRange.save();

        revalidatePath(path);

    } catch (error) {
        console.log("Failed to create grade range", error);
        throw error;
    }
}


export async function fetchAllGradeRanges() {
    try {
        const user = await currentProfile();


        await connectToDB();

        const gradeRanges = await GradeRange.find({});

        if (!gradeRanges || gradeRanges.length === 0) {
            console.log("No grade ranges found");
            return [];
        }

        return JSON.parse(JSON.stringify(gradeRanges));
    } catch (error) {
        console.error("Error fetching grade ranges:", error);
        throw error;
    }
}


export async function fetchGradeRangeById(id: string) {
    try {
        await connectToDB();

        const gradeRange = await GradeRange.findById(id);

        if (!gradeRange) {
            console.log("Grade range not found");
            return null;
        }

        return JSON.parse(JSON.stringify(gradeRange));
    } catch (error) {
        console.error("Error fetching grade range by id:", error);
        throw error;
    }
}

export async function updateGradeRange(gradeId: string, values: Partial<GradeRangeProps>, path: string) {
    try {
        const user = await currentProfile();

        await connectToDB();

        const newValues = {
            ...values,
            mod_flag: true,
            modifyBy: user._id,
            action_type: "updated"
        }

        const updatedGradeRange = await GradeRange.findByIdAndUpdate(
            gradeId,
            { $set: newValues },
            { new: true, runValidators: true }
        );

        if (!updatedGradeRange) {
            console.log("Grade range not found");
            return null;
        }

        console.log("Grade range updated successfully");
        revalidatePath(path);

        return JSON.parse(JSON.stringify(updatedGradeRange));

    } catch (error) {
        console.error("Error updating grade range:", error);
        throw error;
    }
}


export async function deleteGradeRange(id: string) {
    try {
        await connectToDB();

        const gradeRange = await GradeRange.findByIdAndDelete(id);

        if (!gradeRange) {
            console.log("Grade range not found");
            return null;
        }

        console.log("Grade range deleted successfully");

        return JSON.parse(JSON.stringify(gradeRange));

    } catch (error) {
        console.error("Error deleting grade range:", error);
        throw error;
    }
}