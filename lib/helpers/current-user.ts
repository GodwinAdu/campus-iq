"use server"

import { cookies } from "next/headers";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { getEmployeeById } from "../actions/employee.actions";
import Student from "../models/student.models";


// Fetch current user based on token
export async function currentUser() {
    try {
        const cookiesStore = await cookies();
        const tokenValue = cookiesStore.get("token");

        if (!tokenValue || !tokenValue.value) {
            return null; // No token found
        }

        const decoded = jwt.verify(tokenValue.value, process.env.TOKEN_SECRET_KEY!);

        // Ensure the decoded token is not a string (JwtPayload) and contains userId
        if (!decoded || typeof decoded === "string" || !decoded.id) {
            return null; // Invalid token structure
        }

        // Fetch the user from the correct model based on the role stored in the token
        const { id, role } = decoded;
        let user;


        // Switch based on role to fetch the user from the correct collection/model
        switch (role) {
            case "student":
                user = await Student.findById(id); // For Student role
                break;
            case "parent":
                // user = await Parent.findById(id); // For Parent role
                break;
            default:
                user = await getEmployeeById(id);
        }

        // Return the user if found, or null if not found
        return user || null;

    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return null; // Token expired, return null
        }

        console.error("Error decoding token", error);
        return null; // In case of any other error
    }
}