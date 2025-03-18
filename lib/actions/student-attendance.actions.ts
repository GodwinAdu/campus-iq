"use server"

import { currentUser } from "../helpers/current-user";
import StudentAttendance from "../models/student-attendance.models";
import Student from "../models/student.models";
import { connectToDB } from "../mongoose";



export async function createOrFetchAttendance(classId: string) {
    try {
        const date = new Date();
        await connectToDB();

        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const { schoolId } = user;

        // Convert date to UTC midnight
        const attendanceDate = new Date(date);
        attendanceDate.setUTCHours(0, 0, 0, 0);

        // Check if attendance already exists
        let attendance = await StudentAttendance.findOne({ schoolId, classId, date: attendanceDate })
            .populate("records.studentId") // Populate student details
            .lean();

        if (!attendance) {


            // Fetch all students in the class
            const students = await Student.find({ classId, schoolId }).select("_id fullName imgUrl studentID").lean();



            if (students.length === 0) {
                console.log("No students found for the specified class.");
                return [{
                    records: []
                }];  // Return empty array if no students are found.
            }

            // Prepare default attendance records
            const defaultRecords = students.map((student) => ({
                studentId: student._id,
                status: "absent", // Default status
                remarks: "",
            }));

            // Create new attendance record
            attendance = await StudentAttendance.create({
                schoolId,
                classId,
                date: attendanceDate,
                records: defaultRecords,
                createdBy: user._id,
            });

            // Populate students after creation
            if (attendance) {
                if (attendance && !Array.isArray(attendance)) {
                    attendance = await StudentAttendance.findById(attendance._id).populate("records.studentId").lean();
                }
            }
        }


        return JSON.parse(JSON.stringify(attendance));

    } catch (error) {
        console.error("Error creating or fetching attendance: ", error);
        throw error;
    }
}




export async function updateAttendance(attendanceId: string, records: any[]) {
    try {
        await connectToDB()

        const user = await currentUser()
        if (!user) throw new Error("User not logged in")

        // Update attendance records
        const updatedAttendance = await StudentAttendance.findByIdAndUpdate(
            attendanceId,
            {
                records,
                modifiedBy: user._id,
                mod_flag: true,
            },
            { new: true },
        ).populate("records.studentId")

        return JSON.parse(JSON.stringify(updatedAttendance))
    } catch (error) {
        console.error("Error updating attendance: ", error)
        throw error
    }
}
