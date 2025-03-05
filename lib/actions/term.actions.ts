"use server";

import { revalidatePath } from "next/cache";
import Term from "../models/term.models";
import { connectToDB } from "../mongoose";
import { currentUser } from "../helpers/current-user";
import History from "../models/history.models";

/**
 * Interface for creating a new term.
 */
interface CreateTermProps {
    name: string;
    isCurrent: boolean | undefined;
}

/**
 * Creates a new term in the database.
 *
 * @param {CreateTermProps} props - The term properties.
 * @param {string} props.name - The name of the term.
 * @param {boolean | undefined} props.isCurrent - Indicates if the term is the current term.
 * @throws Will throw an error if unable to create a new term.
 */
export async function createTerm({ name, isCurrent }: CreateTermProps) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");
        const schoolId = user.schoolId;

        await connectToDB();

        const term = new Term({
            schoolId,
            name,
            isCurrent,
            createdBy: user._id,
            action_type: "create"
        });

        const history = new History({
            schoolId,
            actionType:"TERM_CREATED",
            details:{
                itemId:term._id
            },
            message: `${user.fullName} created new term with (ID: ${term._id}) on ${new Date().toLocaleString()}.`,
            performedBy: user._id,
            entityId: term._id,
            entityType: "TERM", // The type of the entity
        });

        await Promise.all([
            term.save(),
            history.save()
        ]);

        
    } catch (error) {
        console.log("unable to create new term", error);
        throw error;
    }
}

/**
 * Fetches a term by its ID.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.id - The ID of the term to fetch.
 * @returns {Promise<Term | null>} The term if found, or null if not found.
 * @throws Will throw an error if unable to fetch the term.
 */
export async function fetchTermById(id: string) {
    try {
        const user = await currentUser();

        if (!user) throw new Error("User not logged in");
        await connectToDB();
        const term = await Term.findById(id);

        if (!term) {
            console.log("term doesn't exist");
        }
        return JSON.parse(JSON.stringify(term));
    } catch (error) {
        console.log("unable to fetch term", error);
        throw error;
    }
}

/**
 * Retrieves all terms associated with the current user's school.
 *
 * @returns {Promise<Array | null>} An array of terms or null if no terms exist.
 * @throws Will throw an error if unable to fetch terms.
 */
export async function getAllTerms() {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");
        const schoolId = user.schoolId;

        await connectToDB();

        const terms = await Term.find({ schoolId }).populate("createdBy", "fullName").lean();

        if (!terms || terms.length === 0) {
            console.log("Terms don't exist");

            return null; // or throw an error if you want to handle it differently
        }

        return JSON.parse(JSON.stringify(terms));
    } catch (error) {
        console.error("Error fetching terms:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }
}

export async function getCurrentTerms() {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");
        const schoolId = user.schoolId;
        await connectToDB();

        const currentTerm = await Term.find({ schoolId, isCurrent: true })
            .populate("createdBy", "fullName");

        if (!currentTerm) {
            return null
        }

        return JSON.parse(JSON.stringify(currentTerm))
    } catch (error) {
        console.log("unable to fetch current term", error);
        throw error;
    }
}
export async function getCurrentTerm() {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");
        const schoolId = user.schoolId;
        await connectToDB();

        const currentTerm = await Term.findOne({ schoolId, isCurrent: true })
            .populate("createdBy");

        if (!currentTerm) {
            return null
        }

        return JSON.parse(JSON.stringify(currentTerm))
    } catch (error) {
        console.log("unable to fetch current term", error);
        throw error;
    }
}
/**
 * Interface for updating a term.
 */
interface UpdateTermProps {
    name: string;
    createdBy: string;
}

/**
 * Updates a term in the database.
 *
 * @param {string} termId - The ID of the term to update.
 * @param {UpdateTermProps} values - The values to update the term with.
 * @param {string} path - The path to revalidate in the Next.js cache.
 * @returns {Promise<Term | null>} The updated term, or null if the term was not found.
 * @throws Will throw an error if unable to update the term.
 */
export async function updateTerm(
    termId: string,
    values: UpdateTermProps,
    path: string
) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");
        await connectToDB();
        const newValues = {
            ...values,
            mod_flag: true,
            modifyBy: user._id,
            action_type: "updated"
        }

        const updatedTerm = await Term.findByIdAndUpdate(
            termId,
            { $set: newValues },
            { new: true, runValidators: true }
        );

        if (!updatedTerm) {
            console.log("Term not found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path);

        return JSON.parse(JSON.stringify(updatedTerm));
    } catch (error) {
        console.error("Error updating term:", error);
        throw error;
    }
}

/**
 * Deletes a term from the database.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.id - The ID of the term to delete.
 * @returns {Promise<Term | null>} The deleted term, or null if the term does not exist.
 * @throws Will throw an error if unable to delete the term.
 */
export async function deleteTerm({ id }: { id: string }) {
    await connectToDB();
    try {
        const term = await Term.findByIdAndDelete(id);
        if (!term) {
            console.log("term don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete successfully");

        return JSON.parse(JSON.stringify(term));
    } catch (error) {
        console.error("Error deleting term:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }
}
