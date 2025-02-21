"use server"

import Session from "../models/session.models";
import Term from "../models/term.models";
import { currentUser } from "./current-user";

/**
 * Get the current session and term for a given school.
 */
export const getCurrentSessionAndTerm = async () => {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");
        const schoolId = user.schoolId;

        const [currentSession, currentTerm] = await Promise.all([
            Session.findOne({ schoolId, isCurrent: true }).lean(),
            Term.findOne({ schoolId, isCurrent: true }).lean()
        ]);

        return {
            session: JSON.parse(JSON.stringify(currentSession)),
            term: JSON.parse(JSON.stringify(currentTerm)),
        };

    } catch (error) {
        console.error(error);
        throw error;
    }
};
