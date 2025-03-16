"use server"

import { currentUser } from "../helpers/current-user";
import Assignment from "../models/assignment.models";
import Class from "../models/class.models";
import Employee from "../models/employee.models";
import Student from "../models/student.models";
import Subject from "../models/subject.models";
import { connectToDB } from "../mongoose";


interface AssignmentProps {
    title: string;
    description: string;
    classId: string;
    subjectId: string;
    dueDate: Date;
    totalMarks: number;
    numberOfSubmission: number;
    assignmentType: "homework" | "classwork" | "quiz" | "project"
    attachments: [],
    instructions: string;
}
export async function createAssignment(values: AssignmentProps) {
    try {
        const {
            title,
            description,
            classId,
            subjectId,
            dueDate,
            totalMarks,
            assignmentType,
            numberOfSubmission,
            attachments,
            instructions,
        } = values;

        // Connect to the database early
        await connectToDB();

        // Get the logged-in user
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");

        const { schoolId, _id: userId } = user;

        // Run both queries in parallel
        const [existingAssignment, students] = await Promise.all([
            Assignment.findOne({ title, classId, schoolId, subjectId }).lean(), // `.lean()` optimizes performance
            Student.find({ classId, schoolId }).select("_id").lean(),
        ]);

        if (existingAssignment) {
            throw new Error("Assignment with the same title already exists for this class and subject");
        }

        // Create the assignment
        await Assignment.create({
            schoolId,
            title,
            description,
            classId,
            subjectId,
            dueDate,
            totalMarks,
            assignmentType,
            attachments,
            instructions,
            numberOfSubmission,
            totalStudents: students.length,
            status: "active",
            createdBy: userId,
            action_type: "create",
        });

    } catch (error) {
        console.error("Error creating assignment:", error);
        throw error;
    }
}

export async function getAllAssignments(classId: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('You must be logged in')

        const schoolId = user.schoolId;

        await connectToDB()

        const assignments = await Assignment.find({ classId, schoolId })
            .populate([{ path: "subjectId", model: Subject }, { path: "classId", model: Class }])
            .sort({ createdAt: -1 })
            .exec();
        if (!assignments) {
            console.log("No assignments found for this class");
            return [];
        }

        return JSON.parse(JSON.stringify(assignments));
    } catch (error) {
        console.error("Error fetching assignments: ", error);
        throw error;
    }
}


export async function fetchAllAssignmentForStudent() {
    try {
        await connectToDB();
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const { schoolId, classId } = user;

        const assignments = await Assignment.find({ schoolId, classId })
            .populate([{ path: "subjectId", model: Subject }, { path: "classId", model: Class }, { path: "createdBy", model: Employee }])
            .sort({ createdAt: -1 })
            .exec();
        if (!assignments) {
            console.log("No assignments found for this class");
            return [];
        };

        return JSON.parse(JSON.stringify(assignments));

    } catch (error) {
        console.error("Error fetching assignments for student: ", error);
        throw error;

    }
}