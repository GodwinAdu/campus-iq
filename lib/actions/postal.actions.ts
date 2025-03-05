"use server"

import { revalidatePath } from "next/cache";
import { currentUser } from "../helpers/current-user";
import { connectToDB } from "../mongoose";
import Postal from "../models/postal.models";
import History from "../models/history.models";
interface CreatePostalProps {
    sender: string;
    receiver: string;
    postalType: string;
    referenceNo: string;
    address: string;
    postalDate: Date;
    postalDetails: string;
    attachmentFile?: string | undefined;
    confidential: boolean
}
export async function createPostal(values: CreatePostalProps, path: string) {
    try {
        const { sender, receiver, postalType, referenceNo, address, postalDate, postalDetails, attachmentFile, confidential } = values;
        const user = await currentUser();
        if (!user) throw new Error("User not authenticated");
        const schoolId = user.schoolId;

        await connectToDB();

        const newPostal = new Postal({
            schoolId,
            sender,
            receiver,
            postalType,
            referenceNo,
            address,
            postalDate,
            postalDetails,
            attachmentFile,
            confidential,
            createdBy: user._id,
            action_type: "create",
        });

        const history = new History({
            schoolId,
            actionType: 'POSTAL_CREATED',
            details: {
                itemId: newPostal._id,
                deletedAt: new Date(),
            },
            message: `${user.fullName} created new postal with (ID: ${newPostal._id}) on ${new Date().toLocaleString()}.`,
            performedBy: user._id,
            entityId: newPostal._id,
        });

        await Promise.all([
            newPostal.save(),
            history.save(),
        ]);
        
        revalidatePath(path)

    } catch (error) {
        console.error("Error creating postal: ", error);
        throw error;

    }
};


export async function fetchAllPostals() {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        const postals = await Postal.find({ schoolId, del_flag: false }).lean();

        if (!postals) {
            return [];
        }

        return JSON.parse(JSON.stringify(postals));

    } catch (error) {
        console.error("Error fetching postals: ", error);
        throw error;
    }
};


export async function fetchPostalById(postalId: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');

        await connectToDB();

        const postal = await Postal.findById(postalId).lean();

        if (!postal) {
            return null;
        }

        return JSON.parse(JSON.stringify(postal));

    } catch (error) {
        console.error("Error fetching postal: ", error);
        throw error;
    }
};



export async function updatePostal(postalId: string, values: Partial<CreatePostalProps>, path: string) {
    try {
        const user = await currentUser();

        if (!user) throw new Error('User not logged in');


        await connectToDB();

        const postal = await Postal.findByIdAndUpdate(
            postalId,
            values,
            { new: true, runValidators: true, useFindAndModify: false })
            .lean();

        if (!postal) {
            return null;
        }

        revalidatePath(path);

        return JSON.parse(JSON.stringify(postal));

    } catch (error) {
        console.error("Error updating postal: ", error);
        throw error;
    }
}