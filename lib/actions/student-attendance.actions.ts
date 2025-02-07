"use server"

import { currentProfile } from "../helpers/current-profile"
import StudentAttendance from "../models/student-attendance.models";
import Student from "../models/student.models";
import { connectToDB } from "../mongoose";


interface CreateAttendanceProps {
    studentId: string;
    present: boolean;
    date: string | undefined;
    day: string;
}


export async function createStudentAttendance({ studentId, present, date, day }: CreateAttendanceProps) {
    try {
        const user = await currentProfile();

        await connectToDB();

        const student = await Student.findById(studentId);
        const classId = student?.classId.toString();

        const attendance = new StudentAttendance({
            studentId,
            classId,
            present,
            day,
            date,
            createdBy: user._id,
            action_type: "create"
        })

        await attendance.save();

    } catch (error) {
        console.log("could not create studentAttendance", error);
        throw error;
    }
}



interface FetchAttendanceProps {
    date: Date | undefined;
    classId: string;
}


interface AttendanceRecord {
    _id: string;
    studentId: string;
    day: string;
    date: string;
    classId: string;
    present: boolean;
}

interface StudentProps {
    _id: string;
    fullName: string;
}

export async function fetchStudentAttendance({ date, classId }: FetchAttendanceProps) {
    try {
        const user = await currentProfile();


        await connectToDB();

        const [students, attendanceRecords] = await Promise.all([
            Student.find({ classId }).select('_id fullName').lean<StudentProps[]>(),
            StudentAttendance.find({ classId, date }).lean<IStudentAttendance[]>()
        ]);

        if (!students) throw new Error('No students found')


        console.log(attendanceRecords, "attendanceRecords");

        const attendanceMap = new Map<string, IStudentAttendance[]>();

        // Group attendance records by studentId using a Map for faster lookups
        for (const record of attendanceRecords) {
            const studentId = record.studentId.toString(); // Ensure studentId is string type
            if (!attendanceMap.has(studentId)) {
                attendanceMap.set(studentId, []);
            }
            attendanceMap.get(studentId)!.push(record);
        }

        console.log(attendanceMap, "maps");

        const mergeData = students.flatMap(student => {
            const attendances = attendanceMap.get(student._id.toString()) || [];

            if (attendances.length === 0) {
                // If there are no attendance records for this student, still return a default structure
                return [{
                    _id: "",
                    studentId: student._id,
                    fullName: student.fullName,
                    day: null,
                    date: null,
                    classId: null,
                    present: false
                }];
            }

            return attendances.map(attendance => ({
                _id: attendance._id,
                studentId: student._id,
                fullName: student.fullName,
                day: attendance.day,
                date: attendance.date,
                classId: attendance.classId,
                present: attendance.present
            }));
        });

        console.log(mergeData);
        return JSON.parse(JSON.stringify(mergeData));

    } catch (error) {
        console.log('Something went wrong', error);
        throw error;
    }
}



export async function deleteStudentAttendance(studentId: string, date: string, day: string) {
    try {
        await connectToDB();
        await StudentAttendance.deleteOne({ studentId, date, day });
    } catch (error) {
        console.log("unable to delete attendance", error);
        throw error;
    }
}