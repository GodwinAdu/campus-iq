"use server"

import Conversation from "../models/conversation.models";
import { connectToDB } from "../mongoose";




// for group discussion???

export async function getOrCreateConversation(memberOneId: string, memberTwoId: string) {
    let conversation = await findConversation(memberOneId, memberTwoId)
        || await findConversation(memberTwoId, memberOneId);

    if (!conversation) {
        conversation = await createNewConversation(memberOneId, memberTwoId);
    }

    return JSON.parse(JSON.stringify(conversation));
}

export async function findConversation(memberOneId: string, memberTwoId: string) {
    try {
        await connectToDB();

        return await Conversation.findOne({
            $and: [
                { memberOne: memberOneId },
                { memberTwo: memberTwoId },
            ],
        })
            .populate({
                path: 'memberOne',
                populate: {
                    path: 'userId',  // Assuming memberOne has a reference to user profile (userId)
                    model: 'User',   // Assuming User is the profile model
                },
            })
            .populate({
                path: 'memberTwo',
                populate: {
                    path: 'userId',  // Assuming memberTwo has a reference to user profile (userId)
                    model: 'User',
                },
            })

    } catch (error) {
        console.error("Error finding conversation:", error);
        return null;
    }
}

export async function createNewConversation(memberOneId: string, memberTwoId: string) {
    try {
        await connectToDB()
        return await Conversation.create({
            memberOne: memberOneId,
            memberTwo: memberTwoId,
        }).then(conversation =>
            conversation
                .populate({
                    path: 'memberOne',
                    populate: {
                        path: 'userId',
                        model: 'User',
                    },
                })
                .populate({
                    path: 'memberTwo',
                    populate: {
                        path: 'userId',
                        model: 'User',
                    },
                })
        );
    } catch (error) {
        console.error("Error creating conversation:", error);
        return null;
    }
}
