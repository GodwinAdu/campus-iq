"use server"

import { cookies } from "next/headers";
import { connectToDB } from "../mongoose";
import Employee from "../models/employee.models";
import { compare } from "bcryptjs";
import jwt from 'jsonwebtoken';
import Student from "../models/student.models";
import Parent from "../models/parent.models";
import { Model } from "mongoose";
import Teacher from "../models/teacher.models";


export const loginUser = async (values: { identifier: string; password: string; role: string }) => {
    try {
        const cookieStore = await cookies();
        const { identifier, password, role } = values;

        if (!identifier || !password || !role) throw new Error("Missing fields for login");

        await connectToDB();

        const models = {
            Employee,
            Teacher,
            Student,
            Parent,
        } as const;

        let userModel = models[role as keyof typeof models];
        // Determine which model to use based on the role
        switch (role) {
            case "employee":
                userModel = Employee;
                break;
            case "teacher":
                userModel = Teacher;
                break;
            case "student":
                userModel = Student;
                break;
            case "parent":
                userModel = Parent;
                break;
            default:
                throw new Error("Invalid role");
        }



        if (!userModel) throw new Error("Invalid role");

        const user = await (userModel as Model<IEmployee | IStudent | IParent | ITeacher>).findOne({
            $or: [{ email: identifier }, { userName: identifier }],
        });


        if (!user) throw new Error(`${role} not found`);

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) throw new Error("Invalid password");

        const tokenData = {
            id: user._id,
            role: user.role,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY!, { expiresIn: "1d" });

        cookieStore.set("token", token, {
            httpOnly: true,
            path: "/",
        });

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error("Error while logging in user", error);
        throw error;
    }
};
