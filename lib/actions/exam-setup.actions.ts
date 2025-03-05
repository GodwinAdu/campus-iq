"use server"

import { revalidatePath } from "next/cache";
import ExamSetup from "../models/exam-setup.models";
import { connectToDB } from "../mongoose";
import Session from "../models/session.models";
import Term from "../models/term.models";
import Employee from "../models/employee.models";
import { currentUser } from "../helpers/current-user";
import History from "../models/history.models";

interface ExamSetupProp {
    name: string;
    termId: string;
    sessionId: string;
    examType: string;
    markDistributions?: string[];
    nextTerm?: string;
    publish?: boolean
}
export async function createExamSetup(values: ExamSetupProp, path: string) {
    try {
        const { name, termId, sessionId, examType, markDistributions, nextTerm, publish } = values;
        const user = await currentUser();
        if(!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        const existingSetup = await ExamSetup.findOne({ name });

        if (existingSetup) throw new Error(`Exam setup already exists`);

        const newSetup = new ExamSetup({
            schoolId,
            name,
            termId,
            sessionId,
            examType,
            markDistributions,
            nextTerm,
            publish,
            createdBy: user._id,
            action_type: "created"
        });

        const history = new History({
            schoolId,
            actionType: 'EXAM_SETUP_CREATED', // Use a relevant action type
            details: {
                itemId: newSetup._id,
                deletedAt: new Date(),
            },
            message: `${user.fullName} created new exam setup with (ID: ${newSetup._id}) on ${new Date().toLocaleString()}.`,
            performedBy: user._id,
            entityId: newSetup._id,
            entityType: 'EXAM_SETUP'  // The type of the entity
        });

        await Promise.all([
            newSetup.save(),
            history.save(),
        ]);

        revalidatePath(path);

    } catch (error) {
        console.log("Error creating exam setup", error);
        throw error;
    }
}


export async function fetchAllExamSetup() {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        const setups = await ExamSetup.find({schoolId})
            .populate([
                { path: "sessionId", model: Session, select: "period" },
                { path: "termId", model: Term, select: "name" },
                { path: "createdBy", model: Employee, select: "_id fullName" },
            ])
            .exec();

        if (!setups || setups.length === 0) return [];

        return JSON.parse(JSON.stringify(setups));
    } catch (error) {
        console.error("Error fetching all exam setups", error);
        throw error;
    }
}

export async function fetchExamSetupById(id: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        await connectToDB();
        const setup = await ExamSetup.findById(id);

        if (!setup) throw new Error("No exam setup found");

        return JSON.parse(JSON.stringify(setup));

    } catch (error) {
        console.log("couldn't fetch exams setup", error);
        throw error;
    }

}


export async function updateExamSetup(examSetupId: string, values: Partial<ExamSetupProp>, path: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');

        await connectToDB();

        const newValues = {
            ...values,
            mod_flag: true,
            modifyBy: user._id,
            action_type: "updated"
        }

        const updatedSetup = await ExamSetup.findByIdAndUpdate(
            examSetupId,
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



export async function deleteExamSetup(id: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        
        await connectToDB();

        const setup = await ExamSetup.findByIdAndDelete(id);

        if (!setup) throw new Error("No exam setup found");

        console.log("Exam setup deleted successfully");
        return JSON.parse(JSON.stringify(setup));

    } catch (error) {
        console.error("Error deleting exam setup", error);
        throw error;
    }
}

