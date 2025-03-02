"use server"

import { TokenExpiredError } from "jsonwebtoken";
import { getEmployeeById } from "../actions/employee.actions";
import { fetchStudentById } from "../actions/student.actions";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function currentUser() {
    try {
        const cookiesStore = await cookies();
        const tokenValue = cookiesStore.get("token");

        if (!tokenValue?.value) {
            console.log("No token found in cookies");
            return null;
        }

        console.log("Verifying token...");
        const decoded = jwt.verify(tokenValue.value, process.env.TOKEN_SECRET_KEY!) as { id: string, role: string };

        if (!decoded?.id) {
            console.log("Invalid token structure");
            return null;
        }

        console.log("Decoded Token:", decoded);

        const { id, role } = decoded;
        let user: any = null;

        if (role === "student") {
            console.log(`Fetching student with ID: ${id}`);
            user = await fetchStudentById(id);
        } else if (role === "parent") {
            console.log(`Fetching parent with ID: ${id}`);
            // user = await fetchParentById(id);
        } else  {
            console.log(`Fetching employee with ID: ${id}`);
            user = await getEmployeeById(id);
        }

        console.log("Fetched User:", user);
        return user || null;

    } catch (error) {
        if (error instanceof TokenExpiredError) {
            console.log("Token expired");
            return null;
        }

        console.error("Error decoding token:", error);
        return null;
    }
}
