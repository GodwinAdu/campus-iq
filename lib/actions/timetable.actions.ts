"use server"

import { revalidatePath } from "next/cache";
import { currentUser } from "../helpers/current-user";
import { connectToDB } from "../mongoose";
import Timetable from "../models/timetable.models";

interface dayProps {
    subject: string;
    type: "lecture" | "lab" | "practical" | "tutorial";
    location: string;
}
interface CreateTimetableProps {
    classId: string;
    timetable: {
        time: string;
        monday: dayProps;
        tuesday: dayProps;
        wednesday: dayProps;
        thursday: dayProps;
        friday: dayProps;
    }[]
}
export async function createTimetable(values: CreateTimetableProps, path: string) {
    try {
        const { classId, timetable } = values;

        if (!classId || !timetable) throw new Error('Invalid parameters. All fields are required.');

        const user = await currentUser();

        if (!user) throw new Error('user not logged in');

        const schoolId = user.schoolId;

        await connectToDB();

        const newTimetable = new Timetable({
            schoolId,
            classId,
            timetable,
            createdBy: user._id,
            action_type: "create"
        });

        await newTimetable.save();

        revalidatePath(path)

    } catch (error) {
        console.log("could not create timetable", error);
        throw error;
    }
}


export async function fetchTimetableByClassId(classId: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;
        await connectToDB();
        const timetable = await Timetable.findOne({ schoolId, classId })
            .populate("createdBy");

        if (!timetable) {
            throw new Error("Timetable not found");
        }

        return JSON.parse(JSON.stringify(timetable));

    } catch (error) {
        console.log("could not fetch timetable", error);
        throw error;
    }
}


export async function fetchTimetableById(id: string) {
    try {
        const user = await currentUser();

        if (!user) throw new Error('user not logged in');

        await connectToDB();

        const timetable = await Timetable.findById(id)
            .populate("createdBy");

        if (!timetable) {
            throw new Error("Timetable not found");
        }

        return JSON.parse(JSON.stringify(timetable));

    } catch (error) {
        console.log("could not fetch timetable", error);
        throw error;
    }
}


export async function updateTimetable(id: string, values: CreateTimetableProps, path: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');

        const newValues = {
            mod_flag: true,
            modifiedBy: user._id,
            ...values,
            action_type: "updated"
        }

        await connectToDB();
        const updatedTimetable = await Timetable.findByIdAndUpdate(id, newValues, { new: true })
            .populate("createdBy");

        if (!updatedTimetable) {
            throw new Error("Timetable not found");
        }

        revalidatePath(path)

    } catch (error) {
        console.log("could not update timetable", error);
        throw error;
    }
}