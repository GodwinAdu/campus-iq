"use server"

import { revalidatePath } from "next/cache";
import Distribution from "../models/distribution.models";
import { connectToDB } from "../mongoose";
import { currentUser } from "../helpers/current-user";
import Employee from "../models/employee.models";
import History from "../models/history.models";


interface CreateDistributionProps {
    markDistribution: string;
    createdBy?: string;
}

export async function createDistribution(values: CreateDistributionProps) {
    try {
        const { markDistribution } = values
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        const existingDistribution = await Distribution.findOne({ markDistribution })

        if (existingDistribution) throw new Error(`Distribution already exists:`);

        const newDistribution = new Distribution({
            schoolId,
            markDistribution,
            createdBy: user?._id,
            action_type: "create"
        });

        const history = new History({
            schoolId,
            actionType: 'DISTRIBUTION_CREATED', // Use a relevant action type
            details: {
                itemId: newDistribution._id,
                deletedAt: new Date(),
                markDistribution,
            },
            message: `${user.fullName} created a new distribution with mark distribution "${markDistribution}".`,
            performedBy: user._id, // User who performed the action,
            entityId: newDistribution._id,  // The ID of the created distribution
            entityType: 'DISTRIBUTION',  // The type of the entity
        });

        await Promise.all([
            newDistribution.save(),
            history.save()
        ]);

    } catch (error) {
        console.log("Error creating distribution", error);
        throw error;

    }
}

export async function fetchAllDistributions() {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        const distributions = await Distribution.find({ schoolId })
            .populate([{ path: "createdBy", model: Employee }])
        if (!distributions || distributions.length === 0) {
            console.log("No distributions found");
            return [];
        }

        return JSON.parse(JSON.stringify(distributions));
    } catch (error) {
        console.error("Error fetching distributions:", error);
        throw error;
    }
}


export async function fetchDistributionById(id: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');

        await connectToDB();

        const distribution = await Distribution.findById(id);

        if (!distribution) {
            console.log("Distribution not found");
            return null;
        }

        return JSON.parse(JSON.stringify(distribution));
    } catch (error) {
        console.error("Error fetching distribution by id:", error);
        throw error;
    }
}


export async function updateDistribution(id: string, values: Partial<CreateDistributionProps>, path: string) {
    try {
        await connectToDB();

        const user = await currentUser();
        if (!user) throw new Error('User not logged in');

        const newValues = {
            ...values,
            mod_flag: true,
            modifyBy: user?._id,
            action_type: "updated",
        }

        const updatedDistribution = await Distribution.findByIdAndUpdate(
            id,
            { $set: newValues },
            { new: true, runValidators: true }
        );

        if (!updatedDistribution) {
            console.log("Distribution not found");
            return null;
        }

        console.log("Distribution updated successfully");
        revalidatePath(path);

        return JSON.parse(JSON.stringify(updatedDistribution));

    } catch (error) {
        console.error("Error updating distribution:", error);
        throw error;
    }
}


export async function deleteDistribution(id: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        await connectToDB();

        const distribution = await Distribution.findByIdAndDelete(id);

        if (!distribution) {
            console.log("Distribution not found");
            return null;
        }

        console.log("Distribution deleted successfully");

        return JSON.parse(JSON.stringify(distribution));

    } catch (error) {
        console.error("Error deleting distribution:", error);
        throw error;
    }
}