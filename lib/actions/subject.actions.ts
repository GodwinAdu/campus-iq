"use server"

import { revalidatePath } from "next/cache";
import { generateCode } from "../helpers/generateCode";
import Subject from "../models/subject.models";
import { connectToDB } from "../mongoose";
import Class from "../models/class.models";
import { currentUser } from "../helpers/current-user";
import History from "../models/history.models";

import mongoose from "mongoose";

interface CreateSubjectProps {
    subjectName: string;
    subjectCredit: string;
    subjectHour: string;
    classId: string;
    subjectAttribute: string;
    status: boolean;
}
export async function createSubject(values: CreateSubjectProps, path: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        const {
            subjectName,
            subjectCredit,
            subjectHour,
            subjectAttribute,
            classId,
            status,
        } = values;

        const random = generateCode(subjectName);

        const classData = await Class.findById(classId);
        if (!classData) {
            console.log("Class doesn't exist");
            // Handle the error or return an error response as needed
            throw new Error("Class doesn't exist");
        }

        // Check if the subject already exists in the database
        const existingSubject = await Subject.findOne({
            subjectName,
            classId
        });

        if (existingSubject) {
            console.log("Subject with the same name, stage, and level already exists.");
            // Handle the error or return an error response as needed
            throw new Error("Subject with the same name, stage, and level already exists.");
        }

        const value = new Subject({
            subjectName,
            subjectCredit,
            subjectHour,
            subjectAttribute,
            status,
            code: random,
            classId,
            schoolId,
            createdBy: user?._id,
            action_type: "create"
        });

        const history = new History({
            schoolId,
            actionType: "SUBJECT_CREATED",
            details: {
                itemId: value._id
            },
            message: `${user.fullName} created new subject with (ID: ${value._id}) on ${new Date().toLocaleString()}.`,
            performedBy: user._id,
            entityId: value._id,
            entityType: "SESSION", // The type of the entity
        })

        const subjectData = await value.save();

        classData.subjects.push(subjectData._id);

        await Promise.all([
            classData.save(),
            history.save()
        ]);

        revalidatePath(path);

    } catch (error) {
        console.log("unable to create subject", error);
        throw error;
    }
}


export async function getAllSubjects() {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        const subjects = await Subject.find({ schoolId })
            .populate({ path: "classId", model: "Class" })
        if (!subjects) {
            console.log("Cant find subjects")
            return
        }

        return JSON.parse(JSON.stringify(subjects));

    } catch (error) {
        console.log("unable to fetch subjects users", error)
        throw error;
    }
}
export async function fetchSubjectById(id: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        await connectToDB();
        const subject = await Subject.findById(id);
        if (!subject) throw new Error("subject not found");

        return JSON.parse(JSON.stringify(subject));
    } catch (error) {
        console.log("unable to fetch subjects", error);
        throw error;
    }
}

export async function fetchSubjectByClassId(classId: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;
        await connectToDB();
        const subject = await Subject.find({ schoolId, classId });
        if (!subject) throw new Error("subject not found");

        return JSON.parse(JSON.stringify(subject));
    } catch (error) {
        console.log("Unable to fetch subject query", error);
        throw error;
    }
}

export async function updateSubject(subjectId: string, values: Partial<CreateSubjectProps>, path: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');

        await connectToDB();

        const newValues = {
            ...values,
            mod_flag: true,
            modifyBy: user._id,
            action_type: "updated",
        }

        const updatedSubject = await Subject.findByIdAndUpdate(
            subjectId,
            { $set: newValues },
            { new: true, runValidators: true }
        );

        if (!updatedSubject) {
            console.log("Time not found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedSubject));
    } catch (error) {
        console.error("Error updating Time:", error);
        throw error;
    }
}

export async function deleteSubject(id: string) {
    await connectToDB();
    try {
        const result = await Subject.findByIdAndDelete(id)
        if (!result) {
            console.log("result don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete successfully")

        return JSON.parse(JSON.stringify(result));
    } catch (error) {
        console.error("Error deleting result(subject):", error);
        throw error; // throw the error to handle it at a higher level if needed
    }

}


export async function fetchAllSubjectForStudent() {
    try {
        await connectToDB();
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        const schoolId = user.schoolId;
        const classId = user.classId;
        const subjects = await Subject.find({ classId, schoolId })
        if (!subjects) {
            console.log("Cant find subjects for student")
            return [];
        }
        return JSON.parse(JSON.stringify(subjects));

    } catch (error) {
        console.error("Error fetching subjects for student:", error);
        throw error; // throw the error to handle it at a higher level if needed

    }
}



// export async function fetchSubjectByClassIdForQuestionBank(classId: string) {
//     try {
//         await connectToDB();
//         const user = await currentUser();
//         if (!user) throw new Error('User not logged in');

//         const schoolId = user.schoolId;

//         // Fetch subjects
//         const subjects = await Subject.find({ classId, schoolId });
//         if (!subjects || subjects.length === 0) {
//             console.log("Can't find subjects for student");
//             return [];
//         }

//         // Fetch total question banks and total questions for each subject
//         const subjectsWithCounts = await Promise.all(subjects.map(async (subject) => {
//             const totalQuestionBanks = await QuestionBank.countDocuments({ subjectId: subject._id, schoolId });
//             const totalQuestions = await Question.countDocuments({ subjectId: subject._id, schoolId });

//             return {
//                 ...subject.toObject(),
//                 totalQuestionBanks,
//                 totalQuestions,
//             };
//         }));

//         return JSON.parse(JSON.stringify(subjectsWithCounts));
//     } catch (error) {
//         console.error("Error fetching subjects for student:", error);
//         throw error;
//     }
// }


export async function fetchSubjectByClassIdForQuestionBank(classId: string) {
    try {
        await connectToDB();
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");

        const schoolId = user.schoolId;

        // Convert IDs to ObjectId if necessary
        const classObjectId = new mongoose.Types.ObjectId(classId);
        const schoolObjectId = new mongoose.Types.ObjectId(schoolId);

        // Fetch subjects with total question banks and total questions using aggregation
        const subjectsWithCounts = await Subject.aggregate([
            {
                $match: { classId: classObjectId, schoolId: schoolObjectId }
            },
            {
                $lookup: {
                    from: "questionbanks",
                    localField: "_id",
                    foreignField: "subjectId",
                    as: "questionBanks"
                }
            },
            {
                $lookup: {
                    from: "questions",
                    localField: "_id",
                    foreignField: "subjectId",
                    as: "questions"
                }
            },
            {
                $addFields: {
                    totalQuestionBanks: { $size: "$questionBanks" },
                    totalQuestions: { $size: "$questions" }
                }
            },
            {
                $project: {
                    questionBanks: 0,
                    questions: 0
                }
            }
        ]);

        if (!subjectsWithCounts.length) {
            console.log("No subjects found for the given classId and schoolId.");
            return [];
        }

        return JSON.parse(JSON.stringify(subjectsWithCounts));
    } catch (error) {
        console.error("Error fetching subjects for student:", error);
        throw error;
    }
}