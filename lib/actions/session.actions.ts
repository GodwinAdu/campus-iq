"use server"

import { revalidatePath } from "next/cache";
import Session from "../models/session.models";
import { connectToDB } from "../mongoose"
import { currentUser } from "../helpers/current-user";
import History from '../models/history.models';

interface CreateSessionProps {
    name: string;
    period: string;
    isCurrent: boolean
}

export async function createSession(values: CreateSessionProps) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");

        const { name, period, isCurrent } = values;
        const schoolId = user.schoolId;

        await connectToDB();

        // Set all previous sessions for the same school to `false`
        await Session.updateMany({ schoolId }, { $set: { isCurrent: false } });

       const session = new Session({
            schoolId,
            name,
            period,
            isCurrent,
            createdBy: user._id,
            action_type: "create",
        });

        const history = new History({
            schoolId,
            actionType: "SESSION_CREATED", // Use a relevant action type
            userId: user._id,
            details: {
                itemId: session._id,
                name,
                period,
                isCurrent,
            },
            message: `${user.fullName} created new session with (ID: ${session._id}) on ${new Date().toLocaleString()}.`,
            performedBy: user._id,
            entityId: session._id,
            entityType: "SESSION", // The type of the entity
        });

        await Promise.all([
            session.save(),
            history.save(),
        ])

    } catch (error) {
        console.error("Error creating session:", error);
        throw new Error("Unable to create new session");
    }
}


export async function fetchSessionById(id:string){
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        await connectToDB();
        const session = await Session.findById(id)

        if (!session) {
            console.log("session doesn't exist")
        }
        return session;
    } catch (error) {
        console.log("unable to fetch session", error);
        throw error;
    }
}


export async function getAllSessions() {
    try {
        const user = await currentUser();
        if (!user) throw new Error("user not logged in");
        const schoolId = user.schoolId;

        await connectToDB();

        const sessions = await Session.find({ schoolId })
            .populate('createdBy', 'fullName');

        if (!sessions || sessions.length === 0) {

            return []; // or throw an error if you want to handle it differently
        }

        return JSON.parse(JSON.stringify(sessions));

    } catch (error) {
        console.error("Error fetching sessions:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }
}

export async function getCurrentSessions() {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        const sessions = await Session.find({ schoolId, isCurrent: true })

        if (!sessions || sessions.length === 0) {

            console.log("sessions don't exist");

            return null; // or throw an error if you want to handle it differently
        }

        return JSON.parse(JSON.stringify(sessions));

    } catch (error) {
        console.error("Error fetching sessions:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }
}

export async function getCurrentSession() {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;

        const currentSession = await Session.findOne({schoolId, isCurrent: true });
        if (!currentSession) {
            return null
        };
        return JSON.parse(JSON.stringify(currentSession));

    } catch (error) {
        console.log("something went wrong", error);
        throw error;
    }
}

// interface UpdateTermProps{
//     name:string;
//     perion:string;
// }

export async function updateSession(sessionId: string, values: Partial<CreateSessionProps>, path: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');

        await connectToDB();

        const newValues = {
            ...values,
            mod_flag: true,
            modifyBy: user?._id,
            action_type: "updated",
        }

        const updatedSession = await Session.findByIdAndUpdate(
            sessionId,
            { $set: newValues },
            { new: true, runValidators: true }
        );

        if (!updatedSession) {
            console.log("Session not found");
            return null;
        }

        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedSession));
    } catch (error) {
        console.error("Error updating session:", error);
        throw error;
    }
}

export async function updateSessionStatusWithId(sessionId: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;
        // Connect to the database
        await connectToDB()

        // Set all sessions to `false`
        await Session.updateMany({schoolId}, { $set: { isCurrent: false } })

        // Set the specific session to `true`
        await Session.updateOne({ _id: sessionId }, { $set: { isCurrent: true } })


        return JSON.parse(JSON.stringify(await Session.findById(sessionId)));

    } catch (error) {
        console.log('Error updating session status', error);
        throw error;
    }
}

export async function deleteSession({ id }: { id: string }) {
    await connectToDB();
    try {
        const session = await Session.findByIdAndDelete(id)
        if (!session) {
            console.log("session don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete successfully")

        return JSON.parse(JSON.stringify(session));
    } catch (error) {
        console.error("Error deleting session:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }

}

