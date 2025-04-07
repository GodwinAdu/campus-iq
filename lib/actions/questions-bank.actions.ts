"use server"

import mongoose from "mongoose";
import { currentUser } from "../helpers/current-user";
import QuestionBank from "../models/question-bank.models";
import { connectToDB } from "../mongoose";

interface QuestionBankValues {
    name: string;
    subjectId: string;
    description: string;
    categories: string[];
    difficulty: string;
    status: string;
    classId: string;
}

export async function createQuestionBank(values: QuestionBankValues) {
    try {
        const { name, subjectId, classId, description, categories, difficulty, status } = values;
        await connectToDB();

        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;

        const questionBank = new QuestionBank({
            schoolId,
            classId,
            name,
            subjectId,
            description,
            categories,
            difficulty,
            status,
            createdBy: user._id,
        });

        await questionBank.save();

        return JSON.parse(JSON.stringify(questionBank));
    } catch (error) {
        console.error("Error creating question bank", error);
        return null;
    }
}

export async function fetchQuestionBankBySubjectIdAndClassId(subjectId: string, classId: string) {
    try {
        await connectToDB();

        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;

        const schoolObjectId = new mongoose.Types.ObjectId(schoolId);
        const subjectObjectId = new mongoose.Types.ObjectId(subjectId);
        const classObjectId =new  mongoose.Types.ObjectId(classId);

        const questionBanksWithQuestionCount = await QuestionBank.aggregate([
            {
                $match: { schoolId: schoolObjectId, subjectId: subjectObjectId, classId: classObjectId }
            },
            {
                $lookup: {
                    from: "questions",
                    localField: "_id",
                    foreignField: "bankId",
                    as: "questions"
                }
            },
            {
                $addFields: {
                    questionCount: { $size: "$questions" }
                }
            },
            {
                $project: {
                    questions: 0
                }
            }
        ]);

        if (!questionBanksWithQuestionCount) {
            console.log("No question banks found");
            return null;
        }

        return JSON.parse(JSON.stringify(questionBanksWithQuestionCount));
    } catch (error) {
        console.error("Error fetching question banks", error);
        return null;
    }
}


export async function fetchQuestionBankById(id: string) {
    try {
        await connectToDB();
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");

        const bank = await QuestionBank.findById(id);
        if (!bank) throw new Error("Question bank not found");
        return JSON.parse(JSON.stringify(bank))

    } catch (error) {
        console.log("Error happened while fetching question bank by Id", error)
        throw error;
    }
}