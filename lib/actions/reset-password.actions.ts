"use server"

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectToDB } from '../mongoose';
import Employee from '../models/employee.models';
import Student from '../models/student.models';
import Parent from '../models/parent.models';


export async function resetPassword(token: string, newPassword: string) {
    try {
        await connectToDB();

        // Search across all models
        const [employee, student, parent] = await Promise.all([
            Employee.findOne({ resetPasswordToken: token }),
            Student.findOne({ resetPasswordToken: token }),
            Parent.findOne({ resetPasswordToken: token }),
        ]);

        let user: InstanceType<typeof Employee> | InstanceType<typeof Student> | InstanceType<typeof Parent> | null = null;
        let model: mongoose.Model<InstanceType<typeof Employee> | InstanceType<typeof Student> | InstanceType<typeof Parent>> | null = null;

        if (employee) {
            user = employee;
            model = Employee as mongoose.Model<InstanceType<typeof Employee>>;
        } else if (student) {
            user = student;
            model = Student as mongoose.Model<InstanceType<typeof Student>>;
        } else if (parent) {
            user = parent;
            model = Parent as mongoose.Model<InstanceType<typeof Parent>>;
        }

        if (!user || !model) {
            throw new Error("INVALID_OR_EXPIRED_TOKEN");
        }

        // Check token expiry
        if (!user.resetPasswordExpiry || new Date(user.resetPasswordExpiry) < new Date()) {
            throw new Error("TOKEN_EXPIRED");
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Start a transaction
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            await model.updateOne(
                { _id: user._id },
                {
                    password: hashedPassword,
                    resetPasswordToken: null,
                    resetPasswordExpiry: null,
                },
                { session }
            );

            await session.commitTransaction();
            session.endSession();
        } catch (err) {
            console.error("Reset Transaction Error:", err);
            await session.abortTransaction();
            session.endSession();
            throw new Error("DATABASE_UPDATE_FAILED");
        }

        return {
            success: true,
            message: "Password reset successfully.",
        };

    } catch (error) {
        console.error("Reset Password Error:", error);
        throw error;
    }
}
