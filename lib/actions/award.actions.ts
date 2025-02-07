"use server"

import { revalidatePath } from "next/cache";
import Award from "../models/award.models";
import { connectToDB } from '../mongoose';
import Student from "../models/student.models";
import Employee from "../models/employee.models";
import { currentUser } from "../helpers/current-user";

interface AwardProps {
    role: string;
    awardToId: string;
    awardName: string;
    awardReason: string;
    giftItem: string;
    cashPrice: number;
    givenDate: Date;
}

export async function createAward(values: AwardProps, path: string) {
    try {

        const user = await currentUser();

        if (!user) throw new Error('You must be logged in');

        const schoolId = user.schoolId;

        const { role, awardName, awardToId, awardReason, cashPrice, giftItem, givenDate } = values;

        if (!values.role || !values.awardToId || !values.awardName || !values.awardReason || !values.giftItem || !values.givenDate) {
            throw new Error("Invalid parameters. All fields are required.");
        }

        // Determine the role model
        const roleModel = role === "student" ? "Student" : "Employee";

        await connectToDB();

        const existingAward = await Award.findOne({ awardToId, awardName, giftItem, givenDate });

        if (existingAward) {
            throw new Error("Award already exists for the given student and gift item.");
        }


        const award = new Award({
            schoolId,
            role: roleModel,
            awardToId,
            awardName,
            awardReason,
            giftItem,
            cashPrice,
            givenDate,
            createdBy: user._id,

            action_type: "create"
        });

        await award.save();
        revalidatePath(path)

    } catch (error) {
        console.log("Error creating award: ", error)
        throw error;
    }
}


export async function fetchAllAwards() {
    try {
        const user = await currentUser();

        if (!user) throw new Error('You must be logged in');

        await connectToDB();

        // Fetch all inventory issues without populating saleToId initially
        const awards = await Award.find({})
            .populate({ path: 'createdBy', model: 'Employee', select: 'fullName' })
            .exec();

        if (awards.length === 0) {
            return [];
        }

        // Manually populate saleToId based on the role
        const populatedAwards = await Promise.all(awards.map(async award => {
            let populatedAwardToId;

            if (award.role === 'Student') {
                populatedAwardToId = await Student.findById(award.awardToId).select('fullName').exec();
            } else {
                populatedAwardToId = await Employee.findById(award.awardToId).select('fullName').exec();
            }

            return {
                ...award.toObject(),
                awardToId: populatedAwardToId
            };
        }));

        return JSON.parse(JSON.stringify(populatedAwards));

    } catch (error) {
        console.log("Error fetching all awards: ", error)
        throw error;
    }
}