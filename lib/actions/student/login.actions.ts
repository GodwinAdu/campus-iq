"use server"


import { cookies } from "next/headers";
import { compare } from "bcryptjs";
import jwt from 'jsonwebtoken';
import { connectToDB } from "@/lib/mongoose";
import Student from "@/lib/models/student.models";
import { trackUserLogin } from "../track-user-login.actions";


export const loginStudent = async (values: { identifier: string; password: string; role: string }) => {
    try {
        const cookieStore = await cookies();

        const { identifier, password, role } = values;

        if (!identifier || !password || !role) throw new Error("Missing fields for login");

        await connectToDB();

        const user = await Student.findOne({
            $or: [{ email: identifier }, { username: identifier }],
        });

        const schoolId = user?.schoolId;


        if (!user) throw new Error(`${role} not found`);

        // const isPasswordValid = await compare(password, user.password);
        // if (!isPasswordValid) throw new Error("Invalid password");

        const tokenData = {
            id: user._id,
            role: user.role,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY!, { expiresIn: "1d" });

        cookieStore.set("token", token, {
            httpOnly: true,
            path: "/",
        });
        await trackUserLogin(user._id, "Student", schoolId);

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error("Error while logging in user", error);
        throw error;
    }
};
