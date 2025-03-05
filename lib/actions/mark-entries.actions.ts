"use server"


import ExamSchedule from "../models/exam-schedule.models";
import Mark from "../models/mark-entries.models";
import Student from "../models/student.models";
import Subject from "../models/subject.models";
import { connectToDB } from "../mongoose";
import GradeRange from "../models/grade-range.models";
import Employee from "../models/employee.models";
import { currentUser } from "../helpers/current-user";
import History from "../models/history.models";

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

export async function createMarkEntries(classId: string, studentId: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");
        const schoolId = user.schoolId;

        await connectToDB(); // Ensure DB connection is established

        // Run queries concurrently
        const [classSubjects, examSchedule, markEntries] = await Promise.all([
            Subject.find({ schoolId, classId }).select("subjectName").lean(),
            ExamSchedule.findOne({schoolId, classId }).populate("examId", "markDistributions").lean(),
            Mark.findOne({ classId, studentId }).populate("studentId", "fullName").lean(),
        ]);

        if (!classSubjects.length) throw new Error(`Subjects not found for class ${classId}`);
        if (!examSchedule) throw new Error("Exam setup not found");

        // Return existing mark entries if found
        if (markEntries) return JSON.parse(JSON.stringify(markEntries));

        // Fetch student IDs only when mark entries don't exist
        const student = await Student.findById(studentId).select("_id fullName").lean();
        if (!student) throw new Error("No students found");

        // Prepare subject items structure
        const subjectItems = classSubjects.map(({ subjectName }: { subjectName: string }) => ({
            subjectName,
            distributionItems: examSchedule.examId.markDistributions.map((distribution: { distribution: string }) => ({
                distribution,
                mark: null,
            })),
        }));

        // Create new mark entry
        const newMarkEntry = new Mark({
            schoolId,
            examId: examSchedule.examId._id,
            classId,
            studentId: student._id,
            subjectItems,
        });
        const history = new History({
            schoolId,
            actionType: 'MARK_ENTRIES_CREATED',
            details: {
                itemId: newMarkEntry._id,
                deletedAt: new Date(),
            },
            message: `${user.fullName} created new mark entries for student with (ID: ${student._id}) on ${new Date().toLocaleString()}.`,
            performedBy: user._id,
            entityId: newMarkEntry._id,
            entityType: 'MARK_ENTRIES', // The type of the entity, e.g., 'PRODUCT', 'SUPPLIER', etc.
        });
        await Promise.all([newMarkEntry.save(), history.save()]);

        // Populate `studentId` before returning
        const populatedMarkEntry = await Mark.findById(newMarkEntry._id).populate("studentId", "fullName").lean();

        return JSON.parse(JSON.stringify(populatedMarkEntry)); //

    } catch (error) {
        console.error("Error creating mark entries:", error);
        throw new Error("Failed to create mark entries");
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
            subjectName: string;
            totalMark?: number | null | undefined;
            distributionItems: { distribution: string; mark: number | null }[];
        }[]
    };
}) {
    try {
        const { subjectItems, publish } = values

        const user = await currentUser();
        if (!user) throw new Error("User not logged in");

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
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");
        const schoolId = user.schoolId;
        await connectToDB()
        const markEntries = await Mark.find({ schoolId,classId })
            .populate([
                { path: "studentId", model: Student, select: "fullName" },
                { path: "createdBy", model: Employee, select: "fullName" },
            ])
            .exec()

        if (!markEntries || markEntries.length === 0) {
            console.log("No mark entries found");
            return [];
        }
        console.log("Mark entries found",markEntries);

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