"use server"

import { currentUser } from "../helpers/current-user";
import EmployeeAttendance from "../models/employee-attendance.models";
import Employee from "../models/employee.models";
import { connectToDB } from "../mongoose";

/**
 * Properties for creating a new employee attendance record.
 */
interface CreateAttendanceProps {
    employeeId: string;
    present: boolean;
    date: string | undefined;
    day: string;
}

/**
 * Creates a new employee attendance record.
 *
 * @param props - The properties for creating the attendance record.
 * @throws Will throw an error if there is a problem creating the attendance record.
 */
export async function createEmployeeAttendance({ employeeId, present, date, day }: CreateAttendanceProps) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;
        await connectToDB();

        const employee = await Employee.findById(employeeId);

        if (!employee) {
            throw new Error(`Employee not found`);
        }

        const role = employee?.role;

        const attendance = new EmployeeAttendance({
            schoolId,
            employeeId,
            role,
            present,
            day,
            date,
            createdBy: user._id,
            action_type: "created"
        })

        await attendance.save();

    } catch (error) {
        console.log("could not create EmployeeAttendance", error);
        throw error;
    }
}

/**
 * Properties for fetching attendance records.
 */
interface FetchAttendanceProps {
    date: Date | undefined;
    role: string;
}

/**
 * Represents a single attendance record.
 */
interface AttendanceRecord {
    _id: string;
    employeeId: string;
    day: string;
    date: string;
    role: string;
    present: boolean;
}

/**
 * Fetches attendance records for a specific class and date.
 *
 * @param props - The properties for fetching the attendance records.
 * @returns A Promise that resolves to an array of attendance records.
 * @throws Will throw an error if there is a problem fetching the attendance records.
 */
export async function fetchEmployeeAttendance({ date, role }: FetchAttendanceProps) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        // Fetch employees and attendance records in parallel
        const [employees, attendanceRecords] = await Promise.all([
            Employee.find({schoolId, role }).select('_id fullName').lean<IEmployee[]>(),
            EmployeeAttendance.find({schoolId, role,date }).lean<IEmployeeAttendance[]>()
        ]);

        const attendanceMap = new Map<string, IEmployeeAttendance[]>();

        // Group attendance records by employeeId using a Map for faster lookups
        for (const record of attendanceRecords) {
            const employeeId = record.employeeId.toString(); // Ensure employeeId is string type
            if (!attendanceMap.has(employeeId)) {
                attendanceMap.set(employeeId, []);
            }
            attendanceMap.get(employeeId)!.push(record);
        }

        // Merge employees with their attendance records
        const mergeData = employees.flatMap(employee => {
            const attendances = attendanceMap.get(employee._id.toString()) || [];

            if (attendances.length === 0) {
                // Default structure if no attendance records exist
                return [{
                    _id: "",
                    employeeId: employee._id, // Ensure types match
                    fullName: employee.fullame,
                    day: null,
                    date: null,
                    role: null,
                    present: false
                }];
            }

            // Map each attendance record to the employee
            return attendances.map(attendance => ({
                _id: attendance._id,
                employeeId: employee._id, // Ensure types match
                fullName: employee.fullName,
                day: attendance.day,
                date: attendance.date,
                role: attendance.role,
                present: attendance.present
            }));
        });

        return JSON.parse(JSON.stringify(mergeData));

    } catch (error) {
        console.error('Something went wrong', error);
        throw error;
    }
}
/**
 * Deletes a employee attendance record.
 *
 * @param employeeId - The ID of the employee for whom the attendance record is being deleted.
 * @param date - The date of the attendance record.
 * @param day - The day of the week for the attendance record.
 * @throws Will throw an error if there is a problem deleting the attendance record.
 */
export async function deleteAttendance(employeeId: string, date: string, day: string) {
    try {
        await connectToDB();
        await EmployeeAttendance.deleteOne({ employeeId, date, day });
    } catch (error) {
        console.log("unable to delete attendance", error);
        throw error;
    }
}