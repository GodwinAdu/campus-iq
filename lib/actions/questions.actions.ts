"use server"

import { currentUser } from "../helpers/current-user";
import Question from "../models/questions.models";
import { connectToDB } from "../mongoose";

interface CreateQuestionProps {
    type: string;
    text: string;
    options: string[];
    correctAnswer: string;
    wordLimit: number;
    caseSensitive: false,
    acceptableAnswers: string[];
    matchingPairs: { id: string, left: string, right: string }[];
    blankText: string;
    blanks: { id: string, answer: string }[];
    dragDropItems: { id: string, text: string, correctZone: string }[];
    dropZones: { id: string, name: string }[];
    difficulty: number;
    points: number;
    explanation: string;
    categories: string[];
    tags: string[];
    timeLimit: number;
    bankId: string;
    subjectId:string;
    classId:string;
}



export async function createQuestion(values: CreateQuestionProps) {
    try {
        const {
            type,
            text,
            options,
            correctAnswer,
            wordLimit,
            caseSensitive,
            acceptableAnswers,
            matchingPairs,
            blankText,
            blanks,
            dragDropItems,
            dropZones,
            difficulty,
            points,
            explanation,
            categories,
            tags,
            timeLimit,
            bankId,
            subjectId,
            classId
        } = values;
        await connectToDB();
        console.log("Creating question",subjectId);

        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;

        const question = new Question({
            schoolId,
            type,
            text,
            options,
            correctAnswer,
            wordLimit,
            caseSensitive,
            acceptableAnswers,
            matchingPairs,
            blankText,
            blanks,
            dragDropItems,
            dropZones,
            difficulty,
            points,
            explanation,
            categories,
            tags,
            timeLimit,
            bankId,
            subjectId,
            classId,
            createdBy: user._id,
        });

        await question.save();

    } catch (error) {
        console.error("Error creating question", error);
        throw error;

    }
}


export async function fetchQuestionsByQuestionBankId(bankId: string) {
    try {
        await connectToDB();

        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;

        const questions = await Question.find({ schoolId, bankId });

        if (!questions) {
            console.log("No questions found");
            return [];
        }

        return JSON.parse(JSON.stringify(questions));
    } catch (error) {
        console.error("Error fetching questions", error);
        return null;
    }
}