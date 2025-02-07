"use server"

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose"
import StudentCategory from "../models/student-category.models";
import { currentUser } from "../helpers/current-user";
import Employee from "../models/employee.models";


export async function createStudentCategory({ name }: { name: string }) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        const studentCategory = new StudentCategory({
            schoolId,
            name,
            createdBy: user._id,
            action_type: "create"
        })

        await studentCategory.save();

    } catch (error) {
        console.log("unable to create new StudentCategory", error)
        throw error;
    }
}

export async function fetchStudentCategoryById(id: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');

        await connectToDB();
        const studentCategory = await StudentCategory.findById(id)

        if (!studentCategory) {
            console.log("StudentCategory doesn't exist")
        }
        return JSON.parse(JSON.stringify(studentCategory));
    } catch (error) {
        console.log("unable to fetch StudentCategory", error);
        throw error;
    }
}


export async function getAllStudentCategories() {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;


        await connectToDB();

        const studentCategories = await StudentCategory.find({ schoolId });
        console.log(studentCategories); // Check if createdBy is present

        const populatedCategories = await StudentCategory.find({ schoolId })
            .populate([{ path: 'createdBy', model: Employee, select: "fullName" }])
        console.log(populatedCategories); // Check if populate works


        if (!studentCategories || studentCategories.length === 0) {

            console.log("StudentCategories don't exist");

            return null; // or throw an error if you want to handle it differently
        }
        console.log("StudentCategories: " + populatedCategories);

        return JSON.parse(JSON.stringify(populatedCategories));

    } catch (error) {
        console.error("Error fetching StudentCategories:", error);
        throw error; // throw the error to handle it at a higher Day if needed
    }
}

interface UpdateStudentCategoryProps {
    name: string;
    createdBy: string;
}

export async function updateStudentCategory(studentCategoryId: string, values: UpdateStudentCategoryProps, path: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        await connectToDB();

        const newValues = {
            ...values,
            mod_flag: true,
            modifyBy: user._id,
            action_type: "updated"
        }

        const updatedStudentCategory = await StudentCategory.findByIdAndUpdate(
            studentCategoryId,
            { $set: newValues },
            { new: true, runValidators: true }
        );

        if (!updatedStudentCategory) {
            console.log("StudentCategory not found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedStudentCategory));
    } catch (error) {
        console.error("Error updating StudentCategory:", error);
        throw error;
    }
}

export async function deleteStudentCategory({ id }: { id: string }) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');

        await connectToDB();
        const studentCategory = await StudentCategory.findByIdAndDelete(id)
        if (!studentCategory) {
            console.log("StudentCategory don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete successfully")

        return JSON.parse(JSON.stringify(studentCategory));

    } catch (error) {
        console.error("Error deleting StudentCategory:", error);
        throw error; // throw the error to handle it at a higher StudentCategory if needed
    }

}

