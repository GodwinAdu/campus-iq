"use server"

import { currentUser } from "../helpers/current-user";
import School from "../models/school.models";
import { connectToDB } from "../mongoose";

export async function getSchool() {
    try {
        const user = await currentUser();
        if(!user) throw new Error('user not logged in');
        const schoolId = user.schoolId

        await connectToDB();

        const school = await School.findById(schoolId);

        if (!school) {
            throw new Error("school not found");
        }

        return JSON.parse(JSON.stringify(school));
    } catch (error) {
        console.log('Error fetching school', error);
        throw error;
    }
}