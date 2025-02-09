"use server"


import { currentUser } from "../helpers/current-user";
import School from "../models/school.models";
import { connectToDB } from "../mongoose";

interface Props {
    selectedStudents?: any[];
    data?: any;
    values: string
}
export async function sendReminderMessage({ selectedStudents, data, values }: Props) {
    try {
        const user = await currentUser();

        await connectToDB();

        if (selectedStudents) {
            selectedStudents = selectedStudents.map(student => {
                const studentEmail = student.email;
                const parentEmail = student.parentId.email;
                if (studentEmail === parentEmail) {
                    const combinedMailOptions = {
                        to: studentEmail,
                        subject: 'Fees Reminder',
                        html: ""
                    };
                    // await wrappedSendMail(combinedMailOptions);æ÷
                } else {
                    const studentMailOptions = {
                        to: studentEmail,
                        subject: 'Fees Reminder',
                        html: ""
                    };
                    const parentMailOptions = {
                        to: parentEmail,
                        subject: 'Fees Reminder',
                        html: ""
                    };
                    // await wrappedSendMail(studentMailOptions);
                    // await wrappedSendMail(parentMailOptions); 
                }


            })

        };
        if (data) {
            if (data) {
                const studentEmail = data.email;
                const parentEmail = data.parentId.email;
                if (studentEmail === parentEmail) {
                    const combinedMailOptions = {
                        to: studentEmail,
                        subject: 'Fees Reminder',
                        html: ""
                    };
                    // await wrappedSendMail(combinedMailOptions);æ÷
                } else {
                    const studentMailOptions = {
                        to: studentEmail,
                        subject: 'Fees Reminder',
                        html: ""
                    };
                    const parentMailOptions = {
                        to: parentEmail,
                        subject: 'Fees Reminder',
                        html: ""
                    };
                    // await wrappedSendMail(studentMailOptions);
                    // await wrappedSendMail(parentMailOptions);
                }

            }
        }

    } catch (error) {
        console.log("Error sending reminder message", error);
        throw error;
    }
}