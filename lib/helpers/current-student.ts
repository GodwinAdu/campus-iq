import { cookies } from "next/headers";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { fetchStudentById } from "../actions/student.actions";

// Fetch current user based on token
export async function currentStudent() {
    try {
        const cookiesStore = await cookies();
        const tokenValue = cookiesStore.get("token")?.value;
        console.log(tokenValue);

        if (!tokenValue) {
            console.log("No token found in cookies");
            return null;
        }

        if (!process.env.TOKEN_SECRET_KEY) {
            console.error("Missing TOKEN_SECRET_KEY in environment variables.");
            return null;
        }

        const decoded = await jwt.verify(tokenValue, process.env.TOKEN_SECRET_KEY!);

        if (!decoded || typeof decoded === "string" || !decoded.id) {
            console.log("Invalid token structure", decoded);
            return null;
        }

        const { id } = decoded;

        const user = await fetchStudentById(id);


        return user || null;
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            console.log("Token has expired");
            return null;
        }

        console.error("Error decoding token", error);
        return null;
    }
}
