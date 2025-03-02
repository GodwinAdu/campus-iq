"use server"

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose"
import Class from "../models/class.models";
import { generateCode } from "../helpers/generateCode";
import Subject from "../models/subject.models";
import Student from "../models/student.models";
import { currentUser } from "../helpers/current-user";
import { deleteDocument } from "./trash.actions";
import History from "../models/history.models";
import Employee from "../models/employee.models";

interface CreateClassProps {
    name: string;
}

export async function createClass({ name }: CreateClassProps) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;
        await connectToDB();

        const existingClass = await Class.findOne({ schoolId, name });
        if (existingClass) {
            throw new Error(`Class with name "${name}" already exists`);
        }

        const value = new Class({
            schoolId,
            name,
            code: generateCode(name),
            createdBy: user?._id,
            action_type: "created"
        });
        const history = new History({
            schoolId,
            actionType: 'CLASS_CREATED', // Use a relevant action type
            details: {
                itemId: value._id,
                deletedAt: new Date(),
            },
            message: `User ${user.fullName} created "${name}" (ID: ${value._id}) on ${new Date().toLocaleString()}.`,
            performedBy: user._id, // User who performed the action,
            entityId: value._id,  // The ID of the deleted unit
            entityType: 'CLASS',  // The type of the entity
        });

        await Promise.all([
            value.save(),
            history.save()
        ]);

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
            .populate([{ path: 'subjects', model: Subject }, { path: 'students', model: Student }, { path: 'teachers', model: Employee }])
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
        const schoolId = user.schoolId;

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
        await History.create({
            schoolId,
            actionType: 'CLASS_UPDATED', // Use a relevant action type
            details: {
                itemId:classId,
                deletedAt: new Date(),
            },
            message: `User ${user.fullName} Updated "${values.name}" (ID: ${classId}) on ${new Date().toLocaleString()}.`,
            performedBy: user._id, // User who performed the action,
            entityId:classId,  // The ID of the deleted unit
            entityType: 'CLASS',  // The type of the entity
        });

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
        const schoolId = user.schoolId;
        await connectToDB();

        const classData = await Class.findById(id);
        if (!classData) {
            return { success: false, message: "Class not found" };
        }
        const className = classData?.name || "Unknown Class";

        if (
            classData?.students.length > 0 ||
            classData?.teachers.length > 0 ||
            classData?.subjects.length > 0
        ) return { success: false, message: "class cant be delete with students, teachers or subjects" };

        await deleteDocument({
            actionType: 'CLASS_DELETED',
            documentId: id,
            collectionName: 'Class',
            userId: user?._id,
            schoolId,
            trashMessage: `"${className}" (ID: ${id}) was moved to trash by ${user.fullName}.`,
            historyMessage: `User ${user.fullName} deleted "${className}" (ID: ${id}) on ${new Date().toLocaleString()}.`
        });

        return { success: true, message: "Class deleted successfully" };
    } catch (error) {
        console.error("Error deleting Class:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }

}

export async function totalClass() {
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