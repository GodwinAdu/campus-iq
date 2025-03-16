"use server"

import mongoose from "mongoose";
import { currentUser } from "../helpers/current-user";
import AssignmentSubmission from "../models/assignment-submission.models";
import { connectToDB } from "../mongoose";
import Student from "../models/student.models";
import Assignment from "../models/assignment.models";

export async function getAllAssignmentSubmissions(classId: string, subjectId: string) {
    try {
        console.log("Fetching assignment submissions for:", { classId, subjectId });

        await connectToDB();

        const user = await currentUser();
        if (!user) throw new Error("You must be logged in");

        const schoolId = user.schoolId;

        // Convert IDs to ObjectId
        const classObjectId = new mongoose.Types.ObjectId(classId);
        const schoolObjectId = new mongoose.Types.ObjectId(schoolId);
        const subjectObjectId = new mongoose.Types.ObjectId(subjectId);

        const submissions = await AssignmentSubmission.aggregate([
            { $match: { classId: classObjectId, schoolId: schoolObjectId } },

            {
                $lookup: {
                    from: "assignments",
                    localField: "submission.assignmentId",
                    foreignField: "_id",
                    as: "assignment"
                }
            },
            { $unwind: { path: "$assignment", preserveNullAndEmptyArrays: true } },

            { $match: { "assignment.subjectId": subjectObjectId } },

            {
                $lookup: {
                    from: "students",
                    localField: "studentId",
                    foreignField: "_id",
                    as: "student"
                }
            },
            { $unwind: { path: "$student", preserveNullAndEmptyArrays: true } },

            {
                $project: {
                    _id: 1,
                    classId: 1,
                    schoolId: 1,
                    studentId: "$student",
                    assignment: "$assignment",
                    submission: 1,
                },
            },
        ]);
        console.log(JSON.parse(JSON.stringify(submissions)))

        return submissions.length ? JSON.parse(JSON.stringify(submissions)) : [];
    } catch (error) {
        console.error("Error fetching assignment submissions:", error);
        throw error;
    }
}


export async function fetchAllSubmissionForStudent() {
    try {
        await connectToDB();
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");
        const { schoolId, classId, _id: studentId } = user;
        const submissions = await AssignmentSubmission.find({ studentId, classId, schoolId })
            .populate([{ path: "studentId", model: Student }, { path: "assignmentId", model: Assignment, strictPopulate: false }])
            .exec();

        if (submissions.length === 0) return [];

        return JSON.parse(JSON.stringify(submissions));

    } catch (error) {
        console.error("Error fetching submission for student:", error);
        throw error;
    }
}