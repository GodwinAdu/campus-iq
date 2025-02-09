"use server"

import { currentUser } from "../helpers/current-user";
import Room from "../models/room.models";
import Student from "../models/student.models";
import { connectToDB } from "../mongoose";

interface RoomProps {
    name: string;
    capacity: number;
}

export async function createRoom(values: RoomProps) {
    try {
        const { name, capacity } = values;

        const user = await currentUser();

        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        const room = new Room({
            schoolId,
            name,
            capacity,
            createdBy: user._id,
            action_type: "create",
        });

        await room.save();

    } catch (error) {
        console.log('Error creating room', error);
        throw error;
    }
};

export async function getAllRooms() {
    try {
        const user = await currentUser();

        if (!user) throw new Error('User not logged in');

        const schoolId = user.schoolId;

        await connectToDB();

        const rooms = await Room.find({ schoolId })
            .populate([{ path: "studentIds", model: Student, select: "fullName" }]);
        if (!rooms || rooms.length === 0) {
            return [];
        }

        return JSON.parse(JSON.stringify(rooms));

    } catch (error) {
        console.log('Error fetching rooms', error);
        throw error;
    }
};