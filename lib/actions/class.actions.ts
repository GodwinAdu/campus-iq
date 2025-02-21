"use server"

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose"
import Class from "../models/class.models";
import { generateCode } from "../helpers/generateCode";
import Subject from "../models/subject.models";
import Student from "../models/student.models";
import Teacher from "../models/teacher.models";
import { currentUser } from "../helpers/current-user";

interface CreateClassProps {
    name: string;
}

export async function createClass({ name }: CreateClassProps) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;
        await connectToDB();

        const value = new Class({
            schoolId,
            name,
            code: generateCode(name),
            createdBy: user?._id,
            action_type: "created"
        })

        await value.save();

    } catch (error) {
        console.log("unable to create new value", error)
        throw error;
    }
}

export async function fetchClassById(classId: string) {
    try {
        const user = await currentUser();

        if (!user) throw new Error('user not logged in');

        await connectToDB();

        const classData = await Class.findById(classId)
            .populate([{ path: 'subjects', model: Subject }, { path: 'students', model: Student }, { path: 'teachers', model: Teacher }])
            .exec();

        if (!classData) {
            console.log("Class doesn't exist")
        }
        console.log(classData, "class data")
        return JSON.parse(JSON.stringify(classData));
    } catch (error) {
        console.log("unable to fetch Class", error);
        throw error;
    }
}


export async function getAllClass() {

    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;
        await connectToDB();

        const classData = await Class.find({ schoolId })

        if (!classData || classData.length === 0) {

            console.log("Class don't exist");

            return null; // or throw an error if you want to handle it differently
        };
        return JSON.parse(JSON.stringify(classData));

    } catch (error) {
        console.error("Error fetching Class:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }
}


export async function updateClass(classId: string, values: Partial<CreateClassProps>, path: string) {
    try {
        const user = await currentUser();

        if (!user) throw new Error('user not logged in');

        await connectToDB();

        const newValues = {
            ...values,
            mod_flag: true,
            modifyBy: user?._id,
            action_type: "updated",
        }

        const updatedClass = await Class.findByIdAndUpdate(
            classId,
            { $set: newValues },
            { new: true, runValidators: true }
        );

        if (!updatedClass) {
            console.log("Term not found");
            return null;
        }

        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedClass));
    } catch (error) {
        console.error("Error updating Class:", error);
        throw error;
    }
}

export async function deleteClass(id: string) {
    try {
        const user = await currentUser();

        if (!user) throw new Error('user not logged in');

        await connectToDB();

        const value = await Class.findByIdAndDelete(id)
        if (!value) {
            console.log("Class don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete successfully")

        return JSON.parse(JSON.stringify(value));
    } catch (error) {
        console.error("Error deleting Class:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }

}

export async function totalClass(){
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;
        await connectToDB();

        const classData = await Class.countDocuments({ schoolId })

        return classData;

    } catch (error) {
        console.error("Error fetching Class:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }
}