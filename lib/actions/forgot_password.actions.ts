'use server';

import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import Employee from "../models/employee.models";
import Parent from "../models/parent.models";
import Student from "../models/student.models";
import { connectToDB } from "../mongoose";
import { wrappedSendMail } from "../nodemailer";

type UserModelType = 'Employee' | 'Student' | 'Parent';


// Normalize full name: lowercase and sorted by words
function normalizeName(name: string): string {
    return name
        .toLowerCase()
        .split(' ')
        .filter(Boolean)
        .sort()
        .join(' ');
}

export async function forgotPassword(email: string, fullName: string) {
    try {
        await connectToDB();

        const inputNormalizedName = normalizeName(fullName);
        const findByEmail = { email: { $regex: new RegExp(`^${email}$`, 'i') } };

        // Fetch all potential matches by email
        const [employee, student, parent] = await Promise.all([
            Employee.findOne(findByEmail).lean(),
            Student.findOne(findByEmail).lean(),
            Parent.findOne(findByEmail).lean()
        ]);

        // Compare normalized full names
        let user = null;
        let model: mongoose.Model<any> | null = null;
        let userType: UserModelType | null = null;

        const userMatches = [
            { doc: employee, model: Employee, type: "Employee" },
            { doc: student, model: Student, type: "Student" },
            { doc: parent, model: Parent, type: "Parent" },
        ];

        for (const match of userMatches) {
            if (match.doc && normalizeName(match.doc.fullName) === inputNormalizedName) {
                user = match.doc;
                model = match.model;
                userType = match.type as UserModelType;
                break;
            }
        }

        if (!user || !model) {
            throw new Error("EMAIL_NOT_FOUND");
        }

        // Generate reset token and expiry
        const resetToken = uuidv4();
        const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            await model.updateOne(
                { _id: user._id },
                {
                    resetPasswordToken: resetToken,
                    resetPasswordExpiry: resetTokenExpiry,
                },
                { session }
            );

            await session.commitTransaction();
            session.endSession();
        } catch (err) {
            console.error("Transaction Error:", err);
            await session.abortTransaction();
            session.endSession();
            throw new Error("DATABASE_UPDATE_FAILED");
        }

        const resetLink = `http://localhost:3000/reset_password?token=${resetToken}`;

        const mailOptions = {
            to: email,
            subject: "🔒 Reset Your Password",
            html: `
              <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 30px; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #ddd;">
                <h2 style="color: #333;">Reset Your Password</h2>
                <p style="font-size: 16px; color: #555;">
                  Hi ${user.fullName.split(' ')[0] || 'there'},<br><br>
                  We received a request to reset the password for your account associated with this email.
                  Click the button below to set a new password:
                </p>
          
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${resetLink}" 
                     style="background-color: #007bff; color: white; padding: 14px 24px; text-decoration: none; border-radius: 6px; font-size: 16px; display: inline-block;">
                    Reset Password
                  </a>
                </div>
          
                <p style="font-size: 14px; color: #666;">
                  Or copy and paste the following link into your browser if the button doesn't work:
                </p>
                <p style="word-break: break-all; font-size: 14px; color: #007bff;">
                  <a href="${resetLink}" target="_blank" style="color: #007bff;">${resetLink}</a>
                </p>
          
                <p style="font-size: 14px; color: #888; margin-top: 40px;">
                  If you didn’t request this password reset, you can safely ignore this email. This link will expire in 1 hour for your security.
                </p>
          
                <p style="font-size: 14px; color: #aaa; text-align: center; margin-top: 30px;">
                  &copy; ${new Date().getFullYear()} CampusIQ. All rights reserved.
                </p>
              </div>
            `
        };


        await wrappedSendMail(mailOptions);

        return {
            success: true,
            message: "Password reset link sent successfully.",
        };

    } catch (error) {
        console.error("Forgot Password Error:", error);
        throw error;
    }
}
