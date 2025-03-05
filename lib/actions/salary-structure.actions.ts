"use server"

import { revalidatePath } from "next/cache";
import SalaryStructure from "../models/salary-structure.models";
import { connectToDB } from "../mongoose";
import { currentUser } from "../helpers/current-user";
import History from "../models/history.models";

interface AllowancesProps {
    allowanceName: string;
    amount: number;
}
interface DeductionsProps {
    deductionName: string;
    amount: number;
}
interface CreateSalaryStructureProps {
    salaryName: string;
    basicSalary: number;
    overtimeRate: number;
    allowances?: AllowancesProps[] | undefined;
    deductions?: DeductionsProps[] | undefined;
}

export async function createSalaryStructure(values: CreateSalaryStructureProps, path: string) {
    try {
        const { salaryName, basicSalary, overtimeRate, allowances, deductions } = values;
        const user = await currentUser();
        if(!user) throw new Error("user is not logged in");
        const schoolId = user.schoolId;

        await connectToDB();

        const existingSalaryStructure = await SalaryStructure.findOne({ salaryName })

        if (existingSalaryStructure) {
            throw new Error("Salary structure already exists");
        }

        const salaryStructure = new SalaryStructure({
            schoolId,
            salaryName,
            basicSalary,
            overtimeRate,
            allowances,
            deductions,
            createdBy: user._id,
            action_type: "create"
        });

        const history = new History({
            schoolId,
            actionType: "SALARY_STRUCTURE_CREATED",
            details: {
                salaryStructureId: salaryStructure._id,
                createdBy: user._id,
            },
            message: `${user.fullName} created new salary structure with (ID: ${salaryStructure._id}) on ${new Date().toLocaleString()}.`,
            performedBy: user._id,
            entityId: salaryStructure._id,
            entityType: "SALARY_STRUCTURE"  // The type of the entity
        });

        await Promise.all([
            salaryStructure.save(),
            history.save(),
        ]);

        revalidatePath(path);

    } catch (error) {
        console.log("Error creatingSalaryStructure,", error);
        throw error;
    }

};


export async function getAllSalaryStructures() {
    try {
        const user = await currentUser();
        if(!user) throw new Error("user not logged in");
        const schoolId = user.schoolId;

        await connectToDB();

        const salaries = await SalaryStructure.find({schoolId})

        if (salaries.length === 0) {
            return [];
        }

        return JSON.parse(JSON.stringify(salaries));

    } catch (error) {
        console.log("Error getting all structures from the API server ", error);
        throw error;
    }
}


export async function fetchSalaryById(salaryId: string) {
    try {
        const salary = await SalaryStructure.findById(salaryId);
        if (!salary) {
            throw new Error("Could not find salary in the API server");
        }

        return JSON.parse(JSON.stringify(salary));

    } catch (error) {
        console.log("Error getting structures from the API server ", error);
        throw error;
    }
}


export async function updateSalaryStructure(salaryStructureId: string, values: Partial<CreateSalaryStructureProps>, path?: string) {
    try {
        const user = await currentUser();
        if(!user) throw new Error("user is not logged in");

        await connectToDB();

        const newValues = {
            ...values,
            mod_flag: true,
            modifyBy: user._id,
            action_type: "update"
        }

        const salary = await SalaryStructure.findByIdAndUpdate(
            salaryStructureId,
            { $set: newValues },
            { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: true }
        );

        if (!salary) {
            console.log("salary detail not found");
            return null;
        }
        revalidatePath(path as string)

        return JSON.parse(JSON.stringify(salary));
    } catch (error) {
        console.error("Error updating salary:", error);
        throw error;
    }
}
