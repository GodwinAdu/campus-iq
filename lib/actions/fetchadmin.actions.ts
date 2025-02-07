"use server"

import Employee from "../models/employee.models";
import Adminuser from "../models/employee.models";
import { connectToDB } from "../mongoose";

interface FetchAdminProps {
    id: string
}

export async function fetchAdmin({ id }: FetchAdminProps) {
    await connectToDB();
    try {
        const user = await Employee.findById({ _id: id });
        console.log(user,"admin")

        if (!user) {
            console.log("user doesn't exist")
            return null
        }

        // Exclude sensitive information like password
        const { password, ...userWithoutPassword } = user.toObject();
        return JSON.parse(JSON.stringify(userWithoutPassword));

    } catch (error: any) {
        console.log("Unable to fetch user", error)
    }
}