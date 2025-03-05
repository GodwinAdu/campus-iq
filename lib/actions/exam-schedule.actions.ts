"use server"

import { revalidatePath } from "next/cache";
import ExamSchedule from "../models/exam-schedule.models";
import ExamSetup from "../models/exam-setup.models";
import Subject from "../models/subject.models";
import { connectToDB } from "../mongoose";

import Class from "../models/class.models";
import Employee from "../models/employee.models";
import ExamHall from "../models/exams-hall.models";
import { currentUser } from "../helpers/current-user";
import History from "../models/history.models";


export async function fetchExamSchedule(examId: string, classId: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not authenticated");

        await connectToDB();

        const schoolId = user.schoolId;

        // Fetch class subjects and exam setup in parallel
        const [classSubjects, examSetup, existingSchedule] = await Promise.all([
            Subject.find({ schoolId, classId }),
            ExamSetup.findById(examId),
            ExamSchedule.findOne({ examId, classId })
        ]);

        if (!classSubjects.length) throw new Error(`Subjects not found for class ${classId}`);
        if (!examSetup) throw new Error(`Exam setup not found for exam ${examId}`);

        // Return existing exam schedule if found
        if (existingSchedule) return JSON.parse(JSON.stringify(existingSchedule));

        // Construct new exam schedule if not found
        const subjectItems = classSubjects.map(subject => ({
            subjectName: subject.subjectName,
            hallId: null,
            date: null,
            startTime: '',
            endTime: '',
            distributionItems: examSetup.markDistributions?.map(dist => ({
                distribution: dist,
                fullMark: null,
                passMark: null,
            })) || [],
            createdBy: user._id,
            action_type: "created"
        }));

        const newExamSchedule = await ExamSchedule.create({
            schoolId,
            examId,
            classId,
            subjectItems,
        });

        const history = new History({
            schoolId,
            actionType: 'EXAM_SCHEDULE_CREATED', // Use a relevant action type
            details: {
                itemId: newExamSchedule._id,
                deletedAt: new Date(),
            },
            message: `${user.fullName} created new exam schedule with (ID: ${newExamSchedule._id}) on ${new Date().toLocaleString()}.`,
            performedBy: user._id,
            entityId: newExamSchedule._id,
            entityType: 'EXAM_SCHEDULE'  // The type of the entity
        })

        await history.save();

        return JSON.parse(JSON.stringify(newExamSchedule));
    } catch (error) {
        console.error("Error fetching exam schedule:", error);
        throw new Error("Failed to fetch exam schedule");
    }
}



export async function fetchAllExamSchedule() {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not authenticated");
        const schoolId = user.schoolId;
        await connectToDB();

        const examSchedule = await ExamSchedule.find({ schoolId })
            .populate([
                { path: "classId", model: Class, select: "name" },
                { path: "createdBy", model: Employee, select: "fullName" },
                { path: "examId", model: ExamSetup, select: "name" },
                { path: "subjectItems.hallId", model: ExamHall, select: "name" },
            ])
            .lean()
            .exec()

        if (!examSchedule) {
            console.log("No exam schedule found");
        }

        return JSON.parse(JSON.stringify(examSchedule));

    } catch (error) {
        console.error("Error fetching all exam schedule:", error);
        throw new Error("Failed to fetch all exam schedule");

    }
}


export async function updateExamSchedule(examScheduleId: string, values: Partial<any>, path: string) {
    try {

        const user = await currentUser();
        if (!user) throw new Error("User not authenticated");

        await connectToDB();

        const newValues = {
            ...values,
            createdBy: user._id,
            action_type: "created"
        }

        const updatedSetup = await ExamSchedule.findByIdAndUpdate(
            examScheduleId,
            { $set: newValues },
            { new: true, runValidators: true }
        );

        if (!updatedSetup) throw new Error("No exam setup found");

        console.log("Exam setup updated successfully");
        revalidatePath(path);
        return JSON.parse(JSON.stringify(updatedSetup));

    } catch (error) {
        console.error("Error updating exam setup", error);
        throw error;
    }
}