"use server"

import { currentUser } from "../helpers/current-user";
import QuestionBank from "../models/question-bank.models";
import { connectToDB } from "../mongoose";

export async function fetchQuestionBankBySubjectIdAndClassId(subjectId: string, classId: string) {
    try {
        await connectToDB();

        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;

        const questionBanks = await QuestionBank.find({ schoolId, subjectId, classId });

        if (!questionBanks) {
            console.log("No question banks found");
            return null;
        }

        return JSON.parse(JSON.stringify(questionBanks));
    } catch (error) {
        console.error("Error fetching question banks", error);
        return null;
    }
}