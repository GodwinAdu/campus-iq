"use server"


import ExamSchedule from "../models/exam-schedule.models";
import ExamSetup from "../models/exam-setup.models";
import Mark from "../models/mark-entries.models";
import Student from "../models/student.models";
import Subject from "../models/subject.models";
import { connectToDB } from "../mongoose";
import GradeRange from "../models/grade-range.models";
import Employee from "../models/employee.models";
import { currentUser } from "../helpers/current-user";

// examId: {
//     type: Schema.Types.ObjectId,
//     ref: 'ExamSetup',
//     required: true,
//     index: true,
// },
// studentId: {
//     type: Schema.Types.ObjectId,
//     ref: 'Student',
//     required: true,
//     index: true,
// },
// classId: {
//     type: Schema.Types.ObjectId,
//     ref: 'Class',
//     required: true,
//     index: true,
// },
// subjectItems: {
//     type: [SubjectItemSchema],
//     default: [],
// },
// createdBy: {
//     type: Schema.Types.ObjectId,
//     ref: "Employee",
//     default: null
// },

export async function createMarkEntries(classId: string) {
    try {
        const user = await currentUser();

        if (!user) throw new Error('User not logged in');

        const schoolId = user.schoolId;

        await connectToDB(); // Ensure DB connection first

        const [classSubjects, examSchedule, markEntries] = await Promise.all([
            Subject.find({ schoolId, classId }).select("subjectName"),
            ExamSchedule.findOne({ classId }).populate("examId", "markDistributions"),
            Mark.findOne({ classId })
        ]);

        if (!classSubjects.length) throw new Error(`Subjects not found for class ${classId}`);
        if (!examSchedule) throw new Error(`Exam setup not found for exam`);

        if (!markEntries) {
            // Fetch student only if markEntries don't exist
            const student = await Student.findOne({ classId }).select("_id");
            if (!student) throw new Error("No students found");

            const subjectItems = classSubjects.map((subject: { subjectName: string }) => ({
                subjectName: subject.subjectName,
                distributionItems: examSchedule.examId.markDistributions.map((dist: { distribution: string }) => ({
                    distribution: dist,
                    mark: null
                })),
            }));

            const newMarkEntries = new Mark({
                schoolId,
                examId: examSchedule.examId._id,
                classId,
                studentId: student._id,
                subjectItems,
            });

            await newMarkEntries.save();
            return JSON.parse(JSON.stringify(newMarkEntries));
        }

        return JSON.parse(JSON.stringify(markEntries));

    } catch (error) {
        console.error("Error fetching mark entries:", error);
        throw new Error("Failed to fetch mark entries");
    }
}


// Function to calculate total marks from distribution items
const calculateTotal = (items: { mark: number | null }[]) =>
    items.reduce((acc, item) => acc + (item.mark ?? 0), 0);

// Function to calculate the total mark from all subject items
const calculateMark = (items: { totalMark: number }[]) =>
    items.reduce((acc, item) => acc + item.totalMark, 0);


export async function saveMarkEntries({
    mark,
    values,
}: {
    mark: IMark;
    values: {
        publish: boolean;
        subjectItems: {
            subjectId: string;
            totalMark?: number | null | undefined;
            distributionItems: { distributionId: string; mark: number | null }[];
        }[]
    };
}) {
    try {
        const { subjectItems, publish } = values

        const user = await currentUser();

        // Ensure the database connection is established
        await connectToDB();
        const [student, allGrades] = await Promise.all([
            Student.findById(mark.studentId),
            GradeRange.find({}).lean()
        ])
        if (!student) throw new Error(`Student not found`)
        if (!allGrades || allGrades.length === 0) throw new Error(`All grades are not available`)

        // Verify that subjectItems is an array and map over it
        if (!Array.isArray(subjectItems)) {
            console.error('Error: subjectItems is not an array');
            throw new TypeError('subjectItems should be an array');
        }

        // Function to find the correct grade based on totalMark
        const findGrade = (totalMark: number) => {
            return allGrades.find(
                (grade) => totalMark >= grade.minPercentage && totalMark <= grade.maxPercentage
            );
        };

        // Calculate total marks for each subject item and format the data
        const formattedData = subjectItems.map((item) => {
            const totalMark = calculateTotal(item.distributionItems);
            const grade = findGrade(totalMark); // Find the appropriate grade

            return {
                ...item,
                totalMark,
                grade: grade ? grade.gradeName : "F", // Insert gradeName if found, otherwise F
            };
        });

        // Calculate total marks for all subjects combined
        const totalMarks = calculateMark(formattedData);

        // Update the mark document with the new subject items and total marks
        const updatedMark = {
            ...mark,
            totalMarks,
            publish,
            subjectItems: formattedData,
            createdBy: user._id,
            action_type: "updated"
        };
        student.examResult = true

        // Update the document in the database
        await Promise.all([
            Mark.updateOne({ _id: mark._id }, updatedMark, {
                new: true,
            }),
            student.save()
        ]);

    } catch (error) {
        console.error("Error saving mark entries:", error);
        throw new Error("Failed to save mark entries");
    }
}

export async function fetchAllMarks(classId: string) {
    try {
        await connectToDB()
        const markEntries = await Mark.find({ classId })
            .populate([
                { path: "studentId", model: Student, select: "fullName" },
                { path: "createdBy", model: Employee, select: "fullName" },
            ])
            .exec()

        if (!markEntries || markEntries.length === 0) {
            console.log("No mark entries found");
            return [];
        }

        return JSON.parse(JSON.stringify(markEntries));

    } catch (error) {
        console.log("something went wrong", error);
        throw error;
    }
}

export async function generatePosition(classId: string) {
    try {
        await connectToDB()

        const allMarks = await Mark.find({ classId })

        if (!allMarks || allMarks.length === 0) throw new Error("Could not find Mark class")

        // Sort the marks in descending order based on totalMark
        const sortedMarks = allMarks.sort((a: IMark, b: IMark) => (b.totalMarks ?? 0) - (a.totalMarks ?? 0));

        // Assign positions based on sorted order
        sortedMarks.forEach((mark: IMark, index: number) => {
            mark.position = index + 1; // Position starts from 1
        });

        // Save the updated marks back to the database
        for (const mark of sortedMarks) {
            await mark.save(); // Save each mark with the new position
        }

        console.log("Positions have been successfully generated.");

    } catch (error) {
        console.log("something went wrong", error);
        throw error;
    }
}