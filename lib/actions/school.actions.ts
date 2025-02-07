"use server"

import { currentUser } from "../helpers/current-user";
import School from "../models/school.models";
import { connectToDB } from "../mongoose";

export async function getSchool() {
    try {
        const user = await currentUser();

        await connectToDB();

        const school = await School.findById(user?.storeId);

        if (!school) {
            throw new Error("school not found");
        }

        return JSON.parse(JSON.stringify(school));
    } catch (error) {
        console.log('Error fetching school', error);
        throw error;
    }
}