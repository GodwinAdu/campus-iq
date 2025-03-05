"use server"

import FeesPayment from '../models/fees-payment.models';
import Student from '../models/student.models';
import { connectToDB } from './../mongoose';
import FeesStructure from '../models/fees-structure.models';
import Class from '../models/class.models';
import Parent from '../models/parent.models';
import { generateInvoiceNumber } from '../helpers/invoiceGenerator';
import FeesFine from '../models/fees-fine.models';
import { currentUser } from '../helpers/current-user';
import History from '../models/history.models';


export async function createFeePayment() {

}

interface FeesProps {
    category: string;
    paidAmount: number;
    status: boolean;
}

interface PaymentRecord {
    _id: string;
    studentId: string;
    termId: string;
    sessionId: string;
    classId: string;
    fees: FeesProps[];
}
export async function fetchFeePayment(classId: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");

        await connectToDB();
        const schoolId = user.schoolId;

        // Fetch all data concurrently for better performance
        const [students, feesPaymentRecords, feesStructures] = await Promise.all([
            Student.find({ schoolId, classId }),
            FeesPayment.find({ schoolId, classId }),
            FeesStructure.findOne({ schoolId, classId })
        ]);

        if (!students.length) throw new Error("No students found for the specified class.");

        // Create a payment map using Map for better performance
        const paymentMap = new Map<string, any[]>();
        feesPaymentRecords.forEach(record => {
            if (!paymentMap.has(record.studentId)) {
                paymentMap.set(record.studentId, []);
            }
            paymentMap.get(record.studentId)?.push(record);
        });

        // Structure map creation
        const structureMap = feesStructures?.fees?.map(fee => ({
            category: fee.category,
            amount: fee.amount,
            status: false,
        })) || [];

        // Function to determine payment status
        const determineStatus = (fees: any[]) => {
            if (fees.every(fee => fee.status)) return "Total Paid";
            if (fees.every(fee => !fee.status)) return "Unpaid";
            return "Partly Paid";
        };

        // Merge data efficiently
        const mergedData = students.map(student => {
            const payments = paymentMap.get(student._id) || [];

            return payments.length
                ? payments.map(payment => ({
                    _id: payment._id,
                    studentId: student._id,
                    fullName: student.fullName,
                    studentNo: student.studentID,
                    classId: payment.classId,
                    status: determineStatus(payment.fees),
                    fees: payment.fees,
                }))
                : [{
                    _id: "",
                    studentId: student._id,
                    fullName: student.fullName,
                    studentNo: student.studentID,
                    classId,
                    status: "Unpaid",
                    fees: structureMap,
                }];
        }).flat();

        console.log(mergedData, "Merged Payment Data");
        return JSON.parse(JSON.stringify(mergedData));

    } catch (error) {
        console.error("Error fetching fee payment data:", error);
        throw new Error("Failed to retrieve payment information.");
    }
}


export async function fetchFeesReminder(classId: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;

        await connectToDB();

        const students = await Student.find({ schoolId, classId })
            .populate({ path: "parentId", model: Parent, select: "email" })
            .exec();

        if (!students) {
            throw new Error(`Could not find students`);
        }

        const feesPaymentRecords = await FeesPayment.find({ classId });

        if (!feesPaymentRecords) {
            throw new Error(`Could not find fees payment records`);
        }

        // Create a set of student IDs that have payment records
        const studentIdsWithPayments = new Set(feesPaymentRecords.map(payment => payment.studentId.toString()));

        // Filter students based on fees payment status or absence of payment records
        const studentsWithUnpaidOrNoFees = students.filter(student => {
            const studentPayments = feesPaymentRecords.filter(payment => payment.studentId.toString() === student._id.toString());

            // Check if the student has no payments or any unpaid fees
            const hasUnpaidFees = studentPayments.some(payment =>
                payment.fees.some(fee => !fee.status)
            );

            return !studentIdsWithPayments.has(student._id.toString()) || hasUnpaidFees;
        });

        return JSON.parse(JSON.stringify(studentsWithUnpaidOrNoFees));

    } catch (error) {
        console.log("Failed to fetch payment information from server", error);
        throw error;
    }
}
export async function fetchFeePaymentForStudent(classId: string, studentId: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");
        const schoolId = user.schoolId;

        await connectToDB();

        // Fetch all necessary data concurrently for maximum performance
        const [student, feesPaymentRecords, feesStructures, fineData] = await Promise.all([
            Student.findOne({ _id: studentId })
                .populate([
                    { path: "classId", model: Class, select: "name" },
                    { path: "parentId", model: Parent, select: "fullName" }
                ])
                .lean()
                .exec(),
            FeesPayment.find({ schoolId, classId }).lean().exec(),
            FeesStructure.findOne({ classId }).lean().exec(),
            FeesFine.find({ classId }).lean().exec()
        ]);

        if (!student) throw new Error("Student not found.");

        // Use Map for faster lookup
        const paymentMap = new Map<string, any[]>();
        feesPaymentRecords.forEach(record => {
            if (!paymentMap.has(record.studentId)) {
                paymentMap.set(record.studentId, []);
            }
            paymentMap.get(record.studentId)?.push(record);
        });

        console.log(paymentMap, "payment maps");

        // Create default fee structure with statuses
        const structureMap = feesStructures?.fees.map(fee => ({
            category: fee.category,
            amount: fee.amount,
            status: false,
            paid: 0,
            fine: 0,
            discount: 0,
        })) || [];

        // Function to determine fee payment status
        const determineStatus = (fees: any[]) => {
            if (fees.every(fee => fee.status)) return "Fully Paid";
            if (fees.every(fee => !fee.status)) return "Unpaid";
            return "Partly Paid";
        };

        // Get the student's payments
        const payments = paymentMap.get(studentId) || [];
        let mergeData;

        if (payments.length === 0) {
            // If no payment records exist, create a new entry
            mergeData = {
                schoolId,
                studentId: studentId,
                invoiceNo: generateInvoiceNumber(),
                fullName: student.fullName,
                studentNo: student.studentId,
                dueDate: feesStructures?.dueDate,
                sessionId: feesStructures?.sessionId,
                termId: feesStructures?.termId,
                classId,
                status: "Unpaid",
                fees: structureMap
            };

            // Save new payment entry
            const newFeesPayment = await new FeesPayment(mergeData).save();
            mergeData = newFeesPayment.toObject();
        } else {
            // If payments exist, take the latest payment
            mergeData = payments.map(payment => ({
                _id: payment._id,
                invoiceNo: payment.invoiceNo,
                studentId: payment.studentId,
                fullName: payment.fullName,
                studentNo: payment.studentNo,
                sessionId: payment.sessionId,
                dueDate: payment.dueDate,
                termId: payment.termId,
                classId: payment.classId,
                status: determineStatus(payment.fees),
                fees: payment.fees
            }))[0];
        }

        // Attach guardian and class stage to response
        mergeData.guardian = student.parentId?.fullName || "Unknown";
        mergeData.stage = student.classId?.name || "Unknown";

        return JSON.parse(JSON.stringify(mergeData));
    } catch (error) {
        console.error("Failed to fetch fee payment details:", error);
        throw new Error("Failed to retrieve payment information.");
    }
}

export async function updateFeePayment(paymentId: string, data: any) {
    try {
        const { fees, messageGuardian } = data
        const mailOptions = {
            from: 'your_email@example.com', // Replace with your own email
            to: 'guardian_email@example.com', // Replace with guardian's email
            subject: 'Payment Status Update',
            // text: `Dear ${feesPayment.guardian},\n\nYour payment for the fees of ${feesPayment.studentNo} has been ${messageGuardian}.\n\nPlease make the payment as soon as possible.\n\nThank you for your understanding.\n\nBest regards,\nSchool Management System`
        }

        await connectToDB();

        const feesPayment = await FeesPayment.findById(paymentId)
            .populate({
                path: "studentId",
                model: Student,
                select: "fullName",
                populate: {
                    path: "parentId",
                    model: Parent,
                    select: "fullName email",
                }
            });

        if (!feesPayment) {
            throw new Error(`Could not find payment record`);
        }

        feesPayment.fees = fees;

        await feesPayment.save();

        if (messageGuardian) {
            //Todo sending email to guardian

        }

    } catch (error) {
        console.log("Failed to update payment record", error);
        throw error;
    }
}

export async function updateFullyPayment(paymentId: string, data: any) {
    try {
        const { messageGuardian } = data;
        await connectToDB();
        const feesPayment = await FeesPayment.findById(paymentId)
            .populate({
                path: "studentId",
                model: Student,
                select: "fullName email",
                populate: {
                    path: "parentId",
                    model: Parent,
                    select: "fullName email",
                }
            });

        if (!feesPayment) {
            throw new Error(`Could not find payment record`);
        }

        feesPayment.fees.map(payment => {
            payment.paid = payment.amount;
            payment.status = true;

        })

        await feesPayment.save();

        if (messageGuardian) {
            //Todo sending email to guardian
        }

    } catch (error) {
        console.log("Failed to update payment record", error);
        throw error;
    }
}