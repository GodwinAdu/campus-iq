"use server"

import { revalidatePath } from "next/cache";
import { generateCode } from "../helpers/generateCode";
import Subject from "../models/subject.models";
import { connectToDB } from "../mongoose";
import Class from "../models/class.models";
import { currentUser } from "../helpers/current-user";

interface CreateSubjectProps {
    subjectName: string;
    subjectCredit: string;
    subjectHour: string;
    classId: string;
    subjectAttribute: string;
    status: boolean;
}
export async function createSubject(values: CreateSubjectProps, path: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        const {
            subjectName,
            subjectCredit,
            subjectHour,
            subjectAttribute,
            classId,
            status,
        } = values;

        const random = generateCode(subjectName);

        const classData = await Class.findById(classId);
        if (!classData) {
            console.log("Class doesn't exist");
            // Handle the error or return an error response as needed
            throw new Error("Class doesn't exist");
        }

        // Check if the subject already exists in the database
        const existingSubject = await Subject.findOne({
            subjectName,
            classId
        });

        if (existingSubject) {
            console.log("Subject with the same name, stage, and level already exists.");
            // Handle the error or return an error response as needed
            throw new Error("Subject with the same name, stage, and level already exists.");
        }

        const value = new Subject({
            subjectName,
            subjectCredit,
            subjectHour,
            subjectAttribute,
            status,
            code: random,
            classId,
            schoolId,
            createdBy: user?._id,
            action_type: "create"
        })

        const subjectData = await value.save();

        classData.subjects.push(subjectData._id);

        await classData.save();

        revalidatePath(path);

    } catch (error) {
        console.log("unable to create subject", error);
        throw error;
    }
}


export async function getAllSubjects() {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        const subjects = await Subject.find({ schoolId })
            .populate({ path: "classId", model: "Class" })
        if (!subjects) {
            console.log("Cant find subjects")
            return
        }

        return JSON.parse(JSON.stringify(subjects));

    } catch (error) {
        console.log("unable to fetch subjects users", error)
        throw error;
    }
}
export async function fetchSubjectById(id: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        await connectToDB();
        const subject = await Subject.findById(id);
        if (!subject) throw new Error("subject not found");

        return JSON.parse(JSON.stringify(subject));
    } catch (error) {
        console.log("unable to fetch subjects", error);
        throw error;
    }
}

export async function fetchSubjectByClassId(id: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;
        await connectToDB();
        const subject = await Subject.find({schoolId, classId: id });
        if (!subject) throw new Error("subject not found");

        return JSON.parse(JSON.stringify(subject));
    } catch (error) {
        console.log("Unable to fetch subject query", error);
        throw error;
    }
}

export async function updateSubject(subjectId: string, values: Partial<CreateSubjectProps>, path: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');

        await connectToDB();

        const newValues = {
            ...values,
            mod_flag: true,
            modifyBy: user._id,
            action_type: "updated",
        }

        const updatedSubject = await Subject.findByIdAndUpdate(
            subjectId,
            { $set: newValues },
            { new: true, runValidators: true }
        );

        if (!updatedSubject) {
            console.log("Time not found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedSubject));
    } catch (error) {
        console.error("Error updating Time:", error);
        throw error;
    }
}

export async function deleteSubject(id: string) {
    await connectToDB();
    try {
        const result = await Subject.findByIdAndDelete(id)
        if (!result) {
            console.log("result don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete successfully")

        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.error("Error deleting result(subject):", error);
        throw error; // throw the error to handle it at a higher level if needed
    }

}
