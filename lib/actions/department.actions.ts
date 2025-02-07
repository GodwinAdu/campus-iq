"use server"

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose"
import Department from '../models/department.models';
import { currentUser } from "../helpers/current-user";


export async function createDepartment(values: { name: string }) {
    try {
        const { name } = values
        
        const user = await currentUser();

        if (!user) throw new Error('user not logged in');

        const schoolId = user.schoolId;

        await connectToDB();

        const existingDepartment = await Department.findOne({ name });

        if (existingDepartment) {
            throw new Error("Department already exists");
        }

        const department = new Department({
            schoolId,
            name,
            createdBy: user?._id,
            action_type: "created",
        })

        await department.save();

    } catch (error) {
        console.log("unable to create new department", error)
        throw error;
    }
}

export async function fetchDepartmentById(id: string) {
    try {
        const user = await currentUser();

        if (!user) throw new Error('user not logged in');

        await connectToDB();
        const department = await Department.findById(id)

        if (!department) {
            console.log("department doesn't exist")
        }
        return JSON.parse(JSON.stringify(department));
    } catch (error) {
        console.log("unable to fetch department", error);
        throw error;
    }
}


export async function getAllDepartments() {
    try {
        const user = await currentUser();

        if (!user) throw new Error('user not logged in');

        await connectToDB();

        const departments = await Department.find({})
            .populate("createdBy", "fullName")
            .exec()

        if (!departments || departments.length === 0) {

            console.log("departments don't exist");

            return []; // or throw an error if you want to handle it differently
        }

        return JSON.parse(JSON.stringify(departments));

    } catch (error) {
        console.error("Error fetching Departments:", error);
        throw error; // throw the error to handle it at a higher Day if needed
    }
}

interface UpdateDepartmentProps {
    name: string;
    createdBy: string;
}

export async function updateDepartment(departmentId: string, values: UpdateDepartmentProps, path: string) {
    try {
        const user = await currentUser()

        if (!user) throw new Error('user not logged in');

        await connectToDB();

        const newValues = {
            ...values,
            mod_flag: true,
            modifyBy: user._id,
            action_type: "updated",
        }
        const updatedDepartment = await Department.findByIdAndUpdate(
            departmentId,
            { $set: newValues },
            { new: true, runValidators: true }
        );

        if (!updatedDepartment) {
            console.log("department not found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedDepartment));
    } catch (error) {
        console.error("Error updating department:", error);
        throw error;
    }
}

export async function deleteDepartment({ id }: { id: string }) {
    try {
        const user = await currentUser();

        if (!user) throw new Error('user not logged in');

        await connectToDB();

        const department = await Department.findByIdAndDelete(id)

        if (!department) {
            console.log("department don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete successfully")

        return JSON.parse(JSON.stringify(department));

    } catch (error) {
        console.error("Error deleting department:", error);
        throw error; // throw the error to handle it at a higher Department if needed
    }

}

