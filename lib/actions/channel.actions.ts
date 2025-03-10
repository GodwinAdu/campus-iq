"use server"

import Channel from "../models/channel.models";
import { connectToDB } from '../mongoose';
import Server from "../models/server.model";
import Member from "../models/member.models";
import { currentUser } from "../helpers/current-user";
import History from "../models/history.models";



export const findChannelById = async (channelId: string) => {
  try {
    await connectToDB()
    const channel = await Channel.findById(channelId);

    if (!channel) {
      return null;
    }

    return JSON.parse(JSON.stringify(channel));
  } catch (error) {
    console.error("Error fetching channel:", error);
    throw new Error("Internal Error");
  }
}



export async function createChannel(values: { name: string, type: string }, serverId: string) {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized user");
    const schoolId = user.schoolId;
    const { name, type } = values;

    console.log(serverId, "serverId")

    if (name === 'general') throw new Error("Can't create a channel called general");

    await connectToDB();

    // Populate the members array with the Member documents
    const server = await Server.findOne({ _id: serverId }).populate({
      path: 'members',
      model: Member,  // Use the Member model
      match: { userId: user._id, role: { $in: ["ADMIN", "MODERATOR"] } },  // Match userId and role
    });

    if (!server) throw new Error("Server not found or insufficient permissions");

    const newChannel = new Channel({
      name,
      type,
      userId: user._id,
    });

    await newChannel.save();
    server.channels.push(newChannel._id);
    const history = new History({
      schoolId,
      actionType: 'CHANNEL_CREATED', // Use a relevant action type
      details: {
        itemId: newChannel._id,
        deletedAt: new Date(),
      },
      message: `${user.fullName} created new channel with (ID: ${newChannel._id}) on ${new Date().toLocaleString()}.`,
      performedBy: user._id, // User who performed the action,
      entityId: newChannel._id,  // The ID of the deleted unit
      entityType: 'CHANNEL',  // The type of the entity
    });

    await Promise.all([server.save(), history.save()]);

  } catch (error) {
    console.error("Error creating channel:", error);
    throw error;
  }
}

export async function updateChannel(
  values: { name: string, type: string },
  serverId: string,
  channelId: string
) {
  try {
    const { name, type } = values;

    // Prevent the 'general' channel from being updated
    if (name === "general") {
      throw new Error("Channel name cannot be 'general'");
    }

    // Ensure the user is authenticated
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized user");

    // Ensure the necessary IDs are provided
    if (!serverId) throw new Error("Server ID is required");
    if (!channelId) throw new Error("Channel ID is required");

    // Connect to the database
    await connectToDB();

    // Fetch the server and populate members and channels
    const server = await Server.findOne({ _id: serverId }).populate([
      {
        path: 'members',
        model: Member,
        match: { userId: user._id, role: { $in: ["ADMIN", "MODERATOR"] } } // Filter members by user and role
      },
      {
        path: 'channels',
        model: Channel,
      }
    ]);

    // Ensure the server exists and the user has permissions
    if (!server) {
      throw new Error("Server not found or insufficient permissions");
    }

    // Find the channel by ID
    const channelToUpdate = await Channel.findById(channelId);
    if (!channelToUpdate || channelToUpdate.name === "general") {
      throw new Error("Cannot update the 'general' channel");
    }

    // Update the channel's name and type
    channelToUpdate.name = name;
    channelToUpdate.type = type;

    // Save the updated channel
    await channelToUpdate.save();

    // Return the updated server information
    return JSON.parse(JSON.stringify(server));

  } catch (error) {
    console.error("Unable to update channel:", error);
    throw new Error(`Update failed: ${error}`);
  }
}

export async function deleteChannel(serverId: string, channelId: string) {
  try {
    const user = await currentUser();

    if (!user) throw new Error('Unauthorized user');
    await connectToDB()

    if (!serverId) throw new Error(' serverId is required');

    if (!channelId) throw new Error(' channelId is required');

    // Populate the members array with the Member documents
    const server = await Server.findOne({ _id: serverId }).populate({
      path: 'members',
      model: Member,  // Use the Member model
      match: { userId: user._id, role: { $in: ["ADMIN", "MODERATOR"] } },  // Match userId and role
    });


    if (!server) {
      throw new Error('Server not found or insufficient permissions')
    }
    const channel = await Channel.findById(channelId);
    if (!channel) throw new Error('Channel not found ')

    // Ensure the channel to delete is not the "general" channel
    // Perform the pull operation to remove the member
    const updateResult = await Server.updateOne(
      { _id: serverId },
      { $pull: { channels: channel._id } }
    );
    // Check if the update operation was successful
    if (updateResult.modifiedCount === 0) {
      throw new Error("Failed to remove member from server");
    }


    await Channel.findByIdAndDelete(channel._id)

    const updatedServer = await Server.findById(serverId)
      .populate([
        {
          path: "members",
          model: Member
        },
        {
          path: "channels",
          model: Channel
        }
      ])
      .exec()

    return JSON.parse(JSON.stringify(updatedServer));


  } catch (error) {
    console.log("unable to delete channel", error);
    throw error;
  }
}