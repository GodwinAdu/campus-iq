"use server"

import { currentUser } from "../helpers/current-user";
import Parent from "../models/parent.models";
import Student from "../models/student.models";
import { connectToDB } from "../mongoose";


export async function fetchAllParents() {
    try {
        // Establish a connection to the database
        await connectToDB();

        // Fetch all parents from the database
        const parents = await Parent.find().populate({ path: "children", model: Student });

        // Validate that parents were found
        if (!parents || parents.length === 0) {
            return []
        }

        // Return the parents
        return JSON.parse(JSON.stringify(parents));

    } catch (error) {
        console.error("Failed to fetch all parents", error);
        throw error
    }
}



export async function fetchParentByRole(role:string) {
    try {
        console.log(role, "fetch parent by role");
        const user = await currentUser();
        const schoolId = user?.school.toString()

        await connectToDB();

        const parents = await Parent.find({ role, schoolId }, { fullName: 1, _id: 1 });
        if (parents.length === 0) {
            console.log("Parent not found");
            return [];
        }

        console.log('Fetched parents:', parents);
        return JSON.parse(JSON.stringify(parents));
    } catch (error) {
        console.error("Error fetching parent by role:", error);
        throw error;
    }
}
