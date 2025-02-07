"use server"

import { revalidatePath } from "next/cache";
import Day from "../models/day.models";
import { connectToDB } from "../mongoose"
import { currentProfile } from "../helpers/current-profile";


export async function createDay({ name }: { name: string }) {
    try {
        const user = await currentProfile();

        await connectToDB();

        const day = new Day({
            name,
            createdBy: user?._id,
            action_type: "created"
        })

        await day.save();

    } catch (error: any) {
        console.log("unable to create new day", error)
        throw error;
    }
}

export async function fetchDayById({ id }: { id: string }) {
    try {
        await connectToDB();
        const day = await Day.findById(id)
            .populate("createdBy")

        if (!day) {
            console.log("Day doesn't exist")
        }
        return JSON.parse(JSON.stringify(day));
    } catch (error: any) {
        console.log("unable to fetch Day", error);
        throw error;
    }
}


export async function getAllDays() {
    try {
        const user = await currentProfile();
        const schoolId = user?.school.toString();
        await connectToDB();

        const days = await Day.find({ school: schoolId })

        if (!days || days.length === 0) {

            console.log("Days don't exist");

            return null; // or throw an error if you want to handle it differently
        }

        return JSON.parse(JSON.stringify(days));

    } catch (error: any) {
        console.error("Error fetching Days:", error);
        throw error; // throw the error to handle it at a higher Day if needed
    }
}

interface UpdateDayProps {
    name: string;
    createdBy: string;
}

export async function updateDay(dayId: string, values: UpdateDayProps, path: string) {
    try {
        await connectToDB();

        const newValues = {
            ...values,
            mod_flag: true,
            modifyBy: values.createdBy,
            action_type: "updated",
        }

        const updatedDay = await Day.findByIdAndUpdate(
            dayId,
            { $set: newValues },
            { new: true, runValidators: true }
        );

        if (!updatedDay) {
            console.log("Day not found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedDay));
    } catch (error) {
        console.error("Error updating Day:", error);
        throw error;
    }
}

export async function deleteDay({ id }: { id: string }) {
    await connectToDB();
    try {
        const day = await Day.findByIdAndDelete({
            _id: id
        })
        if (!day) {
            console.log("Day don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete successfully")

        return JSON.parse(JSON.stringify(day));

    } catch (error) {
        console.error("Error deleting Day:", error);
        throw error; // throw the error to handle it at a higher Day if needed
    }

}

