"use server"

import { currentUser } from "../helpers/current-user";
import Member from "../models/member.models";
import Server from "../models/server.model";
import { connectToDB } from "../mongoose";
import { v4 as uuidv4 } from 'uuid';


export async function updateMemberWithRole({ role, serverId, memberId }: { role: string, serverId: string, memberId: string }) {
    try {
        const user: { _id: string } = await currentUser();
        await connectToDB();

        if (!serverId) {
            throw new Error("Server ID missing");
        }

        if (!memberId) throw new Error("Member ID missing");

        // Find the server with the current user's userIdId
        const server = await Server.findOne({ _id: serverId, owner: user._id }).populate({
            path: 'members',
            populate: { path: 'userId', model: 'User' }, // Populate the user userId of the member
        });

        if (!server) {
            throw new Error('server was not found');
        }

        // Find the member that needs to be updated
        const member = await Member.findOne({ _id: memberId, server: serverId });

        if (!member) {
            throw new Error('Member was not found');
        }

        // Prevent the current user from changing their own role
        if (member.userId.equals(user._id)) {
            throw new Error('You cannot change your own role');
        }

        // Update the role of the member
        member.role = role;
        await member.save();

        // Re-fetch the server data after the update
        const updatedServer = await Server.findById(serverId).populate({
            path: 'members',
            populate: { path: 'userId', model: 'User' }, // Populate the user userIds
        }).sort({ role: 'asc' }); // Sort the members by role

        return JSON.parse(JSON.stringify(updatedServer))

    } catch (error) {
        console.log('Unable to perform update to members', error);
        throw error;
    }
}

export async function kickMemberFromServer(serverId: string, memberId: string) {
    try {
        const user = await currentUser();  // Get the current user
        await connectToDB();  // Connect to the database

        if (!serverId) {
            throw new Error("Server ID missing");
        }

        if (!memberId) {
            throw new Error("Member ID missing");
        }

        // Find the server owned by the current user
        const server = await Server.findOne({ _id: serverId, owner: user._id }).populate({
            path: 'members',
            populate: { path: 'userId', model: 'User' }, // Populate the userId in members
        });

        if (!server) {
            throw new Error('Server not found or insufficient permissions');
        }

        // Ensure that the member being kicked is part of the server
        const memberToKick = await Member.findOne({ _id: memberId, server: serverId });

        if (!memberToKick) {
            throw new Error("Member not found");
        }

        // Prevent kicking the owner or yourself
        if (memberToKick.userId.equals(server.owner) || memberToKick.userId.equals(user._id)) {
            throw new Error("You cannot kick the owner or yourself");
        }

        // Perform the pull operation to remove the member
        const updateResult = await Server.updateOne(
            { _id: serverId },
            { $pull: { members: memberToKick._id } }
        );

        // Check if the update operation was successful
        if (updateResult.modifiedCount === 0) {
            throw new Error("Failed to remove member from server");
        }

        // Optionally, delete the member document (if required)
        await Member.deleteOne({ _id: memberToKick._id });

        // Fetch the updated server to confirm the changes
        const updatedServer = await Server.findById(serverId).populate({
            path: 'members',
            model: Member,
        });

        return JSON.parse(JSON.stringify(updatedServer));  // Convert the server to a JSON-safe format

    } catch (error) {
        console.error("Unable to kick member from server", error);
        throw error;
    }
}

export async function resetInvitedCode(serverId: string) {
    try {
        const user = await currentUser();

        if (!user) throw new Error('Unauthorized');

        await connectToDB();

        const server = await Server.updateOne(
            {
                _id: serverId,
                owner: user._id
            },
            { invitedCode: uuidv4() },
            { new: true });

        if (!server) throw new Error("Server not found");

        return JSON.parse(JSON.stringify(server));

    } catch (error) {
        console.error("Unable to reset invited code", error);
        throw error;
    }
}