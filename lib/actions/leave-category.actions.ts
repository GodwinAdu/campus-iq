"use server"

import { revalidatePath } from "next/cache";
import LeaveCategory from "../models/leave-category.models";
import { connectToDB } from "../mongoose";
import { currentUser } from "../helpers/current-user";

export async function createLeave(values: { name: string }) {
    try {
        const { name } = values;
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        const leave = new LeaveCategory({
            schoolId,
            name,
            createdBy: user._id,
            action_type: "created"
        })

        await leave.save();

    } catch (error) {
        console.log("unable to create new leave", error)
        throw error;
    }
}

export async function fetchHouseById({ id }: { id: string }) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        await connectToDB();
        const leave = await LeaveCategory.findById(id)

        if (!leave) {
            console.log("House doesn't exist")
        }
        return JSON.parse(JSON.stringify(leave));
    } catch (error) {
        console.log("unable to fetch house", error);
        throw error;
    }
}


export async function getAllLeaves() {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');

        const schoolId = user.schoolId

        await connectToDB();

        const leaves = await LeaveCategory.find({schoolId})
            .populate("createdBy", "fullName")

        if (!leaves || leaves.length === 0) {

            console.log("leaves don't exist");

            return null; // or throw an error if you want to handle it differently
        }

        return JSON.parse(JSON.stringify(leaves));

    } catch (error) {
        console.error("Error fetching Houses:", error);
        throw error; // throw the error to handle it at a higher Day if needed
    }
}

interface UpdateHouseProps {
    name: string;
    createdBy: string;
}

export async function updateHouse(leaveId: string, values: Partial<ILeaveCategory>, path: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const newValues = {
            ...values,
            mod_flag: true,
            modifyBy: user._id,
            action_type: "updated"
        }
        await connectToDB();

        const updatedLeave = await LeaveCategory.findByIdAndUpdate(
            leaveId,
            { $set: newValues },
            { new: true, runValidators: true }
        );

        if (!updatedLeave) {
            console.log("Leave not found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedLeave));
    } catch (error) {
        console.error("Error updating House:", error);
        throw error;
    }
}