"use server"

import { revalidatePath } from "next/cache";
import FeesStructure from "../models/fees-structure.models";
import { connectToDB } from "../mongoose";
import Class from "../models/class.models";
import { currentUser } from "../helpers/current-user";
import Term from "../models/term.models";
import History from "../models/history.models";

interface CreateStructureProps {
    classId: string;
    termId: string;
    sessionId: string;
    dueDate: Date;
    fees: {
        category: string;
        amount: number;
    }[]
}

export async function createFeeStructure(data: CreateStructureProps, path: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;
        await connectToDB();

        const existingFees = await FeesStructure.findOne({
            classId: data.classId,
        })
        if (existingFees) {
            throw new Error(`Fees structure already exists`)
        }

        const newFees = new FeesStructure({
            schoolId,
            classId: data.classId,
            termId: data.termId,
            sessionId: data.sessionId,
            dueDate: data.dueDate,
            fees: data.fees,
            createdBy: user._id,
            action_type: "create"
        });

        const history = new History({
            schoolId,
            actionType: 'FEES_STRUCTURE_CREATED', // Use a relevant action type
            details: {
                itemId: newFees._id,
                deletedAt: new Date(),
            },
            message: `${user.fullName} created new fees structure for class (ID: ${data.classId}) on ${new Date().toLocaleString()}.`,
            performedBy: user._id,
            entityId: newFees._id,
            entityType: 'FEES_STRUCTURE'  // The type of the entity
        });

        await Promise.all([
            newFees.save(),
            history.save(),
        ]);

        revalidatePath(path);


    } catch (error) {
        console.error("Fee structure creation failed", error);
        throw error;
    }
}

export async function fetchFeeStructureById(id: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        await connectToDB();
        const fee = await FeesStructure.findById(id);
        if (!fee) {
            throw new Error("Fees structure not found")
        }

        return JSON.parse(JSON.stringify(fee));


    } catch (error) {
        console.error("Fee structure Fetch Failed", error);
        throw error;
    }
}
export async function fetchFeeStructureClassId(classId: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        await connectToDB();
        const fee = await FeesStructure.findOne({ classId });
        if (!fee) {
            throw new Error("Fees structure not found")
        }

        return JSON.parse(JSON.stringify(fee));


    } catch (error) {
        console.error("Fee structure Fetch Failed", error);
        throw error;
    }
}



export async function fetchFeeStructures() {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        const feeStructures = await FeesStructure.find({ schoolId })
            .populate([{ path: "classId", model: Class }, { path: "termId", model: Term }])
        if (!feeStructures) {
            return [];
        }
        console.log(feeStructures)

        return JSON.parse(JSON.stringify(feeStructures));

    } catch (error) {
        console.error("Fee structure fetching failed", error);
        throw error;
    }
};


export async function deleteFeeStructure(id: string) {
    try {
        await connectToDB();
        const fees = await FeesStructure.findByIdAndDelete(id)
        if (!fees) {
            console.log("fees don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete successfully")

        return JSON.parse(JSON.stringify(fees));
    } catch (error) {
        console.error("Error deleting fess:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }

}

export async function updatedFeeStructure(id: string, values: Partial<CreateStructureProps>, path: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');

        await connectToDB();

        const newValues = {
            mod_flag: true,
            modifyBy: user?._id,
            action_type: "updated",
            ...values,
        }

        const updateFees = await FeesStructure.findByIdAndUpdate(
            id,
            { $set: newValues },
            { new: true, runValidators: true }
        );

        if (!updateFees) {
            console.log("Fee structure not found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path)

        return JSON.parse(JSON.stringify(updateFees));
    } catch (error) {
        console.error("Error updating Fees structure:", error);
        throw error;
    }
}
