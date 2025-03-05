"use server"

import { hash } from "bcryptjs";
import Student from "../models/student.models";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import { generateStudentID } from "../helpers/generateStudentId";
import { generateUniqueUsername } from "../helpers/generateUsername";
import { generatePassword } from "../helpers/generatePassword";
import { welcomeCombinedEmail, welcomeRegisterEmail } from "../mail-massages";
import Class from "../models/class.models";
import { wrappedSendMail } from "../nodemailer";
import Parent from "../models/parent.models";
import mongoose from "mongoose";
import { currentUser } from "../helpers/current-user";
import School from "../models/school.models";
import MealPayment from "../models/meal-payment.models";
import MealPlan from "../models/meal-plan.models";
import { hashSync } from "bcryptjs";
import ClassPayment from "../models/class-payment.models";
import History from "../models/history.models";

/**
 * Interface for creating a new student.
 */


interface CreateStudentProps {
    fullName: string;
    email: string;
    dob: Date, // Initialize dob as a Date,
    gender: string;
    phone: string;
    addresses: Address
    medicalHistory: MedicalHistory
    permanentAddress: string;
    currentAddress: string;
    parentId?: string | undefined;
    guardianName?: string | undefined;
    guardianPhone?: string | undefined;
    guardianEmail?: string | undefined;
    guardianOccupation?: string | undefined;
    guardianAddress?: string | undefined;
    guardianRelationship?: string | undefined;
    classId: string;
    canteen?: {
        planId: string;
    };
    studentCategory: string;
    enrollmentDate: Date;
}

/**
 * Function to create a new student.
 * @param formData - The data for creating a new student.
 * @param path - The path to revalidate.
 * @throws Will throw an error if the student with the same email already exists.
 * @throws Will throw an error if there is any other error during the process.
 */


function isValidObjectId(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id);
}

export async function createStudent(formData: CreateStudentProps, path: string) {
    try {
        const {
            fullName,
            email,
            dob,
            gender,
            phone,
            addresses,
            medicalHistory,
            permanentAddress,
            currentAddress,
            parentId,
            guardianName,
            guardianPhone,
            guardianEmail,
            guardianOccupation,
            guardianAddress,
            guardianRelationship,
            classId,
            studentCategory,
            enrollmentDate,
        } = formData;

        const user = await currentUser();

        if (!user) throw new Error('user not logged in')

        const schoolId = user.schoolId;

        await connectToDB();

        // Parallelize email checks and class validation
        const [existingStudentWithEmail, existingParentWithEmail, classData, currentSchool] = await Promise.all([
            Student.findOne({ email }),
            Parent.findOne({ email: guardianEmail }),
            Class.findById(classId),
            School.findById(schoolId),
        ]);
        console.log(currentSchool)

        if (existingStudentWithEmail) {
            throw new Error("Student with email already exists");
        }

        if (existingParentWithEmail) {
            throw new Error("Parent with email already exists");
        }

        if (!classData) {
            throw new Error("Class not found");
        }
        if (!currentSchool) {
            throw new Error("School not found");
        }

        const rawUsername = generateUniqueUsername(fullName)
        const parentUsername = generateUniqueUsername(guardianName as string)
        const rawPassword = generatePassword()
        const parentPassword = generatePassword()


        const hashedPassword = await hash(rawPassword, 10);
        const parentHashedPassword = await hash(parentPassword, 10)

        let parent;

        if (formData.parentId && isValidObjectId(formData.parentId)) {
            parent = await Parent.findById(formData.parentId);
            if (!parent) {
                throw new Error("Parent not found");
            }
        } else {
            parent = new Parent({
                username: parentUsername,
                fullName: guardianName,
                email: guardianEmail,
                phone: guardianPhone,
                relationship: guardianRelationship,
                address: guardianAddress,
                password: parentHashedPassword,
                occupation: guardianOccupation,
                schoolId,
                createdBy: user._id,
                action_type: "created"
            });
            await parent.save();
        }

        const student = new Student({
            fullName,
            username: rawUsername,
            password: hashedPassword,
            phone,
            email,
            dob,
            gender,
            addresses,
            medicalHistory,
            permanentAddress,
            currentAddress: currentAddress ?? "",
            studentID: generateStudentID(),
            classId,
            studentCategory,
            enrollmentDate,
            parentId: parentId ? parentId : parent._id,
            schoolId,
            createdBy: user._id,
            action_type: "created"
        });

        const history = new History({
            schoolId,
            actionType:"STUDENT_CREATED",
            details:{
                itemId:student._id,
            },
            message: `${user.fullName} created new student with (ID: ${student._id}) on ${new Date().toLocaleString()}.`,
            performedBy: user._id,
            entityId: student._id,
            entityType: "STUDENT", // The type of the entity
        })

        // Save student and update class and parent concurrently
        await Promise.all([
            student.save(),
            classData.updateOne({ $push: { students: student._id } }),
            parent.updateOne({ $push: { children: student._id } }),
            history.save()
        ]);

        // Sending emails
        const emailPromises = [];
        const { schoolName, schoolEmail } = currentSchool

        if (parentId && isValidObjectId(parentId)) {
            emailPromises.push(wrappedSendMail({
                to: email,
                subject: 'New Student Registration',
                html: welcomeRegisterEmail(fullName, rawPassword, rawUsername, schoolName, schoolEmail)
            }));
        } else {
            if (formData.email === formData.guardianEmail) {
                emailPromises.push(wrappedSendMail({
                    to: formData.email,
                    subject: 'New Registration Information',
                    html: welcomeCombinedEmail(fullName, rawPassword, rawUsername, parentPassword, parentUsername, schoolName, schoolEmail)
                }));
            } else {
                emailPromises.push(wrappedSendMail({
                    to: formData.email,
                    subject: 'New Student Registration',
                    html: welcomeRegisterEmail(formData.fullName, rawPassword, rawUsername, schoolName, schoolEmail)
                }));
                emailPromises.push(wrappedSendMail({
                    to: formData.guardianEmail,
                    subject: 'New Parent Registration',
                    html: welcomeRegisterEmail(formData.guardianName!, parentPassword, parentUsername, schoolName, schoolEmail)
                }));
            }
        }

        await Promise.all(emailPromises);

        revalidatePath(path);

    } catch (error) {
        console.log("something went wrong", error);
        throw error;
    }
}

export async function fetchStudentById(id: string) {
    try {

        await connectToDB();
        const student = await Student.findById(id).select('-password');;

        if (!student) {
            console.warn("Student doesn't exist");
            return null;
        }

        return JSON.parse(JSON.stringify(student));

    } catch (error) {
        console.error("Unable to fetch student:", error);
        return null;  // Ensure the function always returns something
    }
}

export async function fetchStudentsList(classId: string) {
    try {
        const user = await currentUser();

        if (!user) throw new Error("user not logged in");

        const schoolId = user.schoolId

        await connectToDB();

        const students = await Student.find({ schoolId, classId });


        if (!students || students.length === 0) {
            return [];
        }

        console.log(students, "students")

        return JSON.parse(JSON.stringify(students));

    } catch (error) {
        console.log("something went wrong", error);
        throw error;
    }
}



export async function deleteStudent(id: string) {
    await connectToDB();
    try {
        const student = await Student.findByIdAndDelete(id)
        if (!student) {
            console.log("Student don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete successfully")

        return student;
    } catch (error) {
        console.error("Error deleting Student:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }

}

export async function fetchStudentByRole(role: string, classId: string) {
    try {

        const user = await currentUser();

        if (!user) throw new Error('User not logged in')
        const schoolId = user.schoolId


        await connectToDB();

        const students = await Student.find({ schoolId, role, classId }, { fullName: 1, _id: 1 });
        if (students.length === 0) {
            console.log("Student not found");
            return [];
        }

        console.log('Fetched students:', students);
        return JSON.parse(JSON.stringify(students));
    } catch (error) {
        console.error("Error fetching student by role:", error);
        throw error;
    }
}


export async function updateStudent(
    studentId: string,
    values: Partial<CreateStudentProps>,
    path?: string
) {
    try {
        await connectToDB(); // Ensure DB connection first

        const user = await currentUser();
        if (!user) throw new Error("User not logged in");

        const school = await School.findById(user.schoolId).lean();
        if (!school) throw new Error("School not found");

        const {
            parentId,
            guardianName,
            guardianEmail,
            guardianPhone,
            guardianOccupation,
            guardianRelationship,
            guardianAddress,
        } = values;


        if (!parentId || parentId === "undefined") {
            const existingParent = await Parent.findOne({ email: guardianEmail }).lean();
            if (existingParent) throw new Error("Parent with this email already exists");

            const username = generateUniqueUsername(guardianName as string);
            const password = generatePassword();
            const hashedPassword = await hash(password, 10);

            const newParent = await Parent.create({
                username,
                fullName: guardianName,
                email: guardianEmail,
                phone: guardianPhone,
                relationship: guardianRelationship,
                address: guardianAddress,
                password: hashedPassword,
                occupation: guardianOccupation,
                schoolId: user.schoolId,
                createdBy: user._id,
                action_type: "created",
            });

            await wrappedSendMail({
                to: guardianEmail,
                subject: "New Parent Registration",
                html: welcomeRegisterEmail(
                    guardianName!,
                    password,
                    username,
                    school.schoolName,
                    school.schoolEmail
                ),
            });

            console.log("New parent created:", newParent._id);
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            { $set: values },
            { new: true, runValidators: true }
        ).lean();

        if (!updatedStudent) throw new Error("Student not found");

        console.log("Student update successful:", updatedStudent._id);

        if (path) revalidatePath(path);

        return updatedStudent;
    } catch (error) {
        console.error("Error updating student:", error);
        throw error;
    }
}

export async function updateOnlyStudent(studentId: string, values: Partial<CreateStudentProps>) {
    try {
        await connectToDB();
        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            { $set: values },
            { new: true, runValidators: true })
            .lean();
        if (!updatedStudent) throw new Error("Student not found");

        return updatedStudent;
    } catch (error) {
        console.error("Error updating student:", error);
        throw error;
    }
}


export async function fetchStudentByClassId(id: string) {
    try {
        await connectToDB();
        const students = await Student.find({ classId: id });
        if (!students) throw new Error("Student not found");

        return JSON.parse(JSON.stringify(students));
    } catch (error) {
        console.log("Unable to fetch subject query", error);
        throw error;
    }
}

export async function uploadBulkStudents(classId: string, students: any[]) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");

        const schoolId = user.schoolId;
        const [school, existingClass] = await Promise.all([
            School.findById(schoolId),
            Class.findById(classId)
        ]);

        if (!school) throw new Error("Unable to find school with provided schoolId");
        if (!existingClass) throw new Error("Unable to find class with provided classId");
        if (!Array.isArray(students) || students.length === 0) throw new Error("No students provided for upload");

        const processedStudents = students.map(student => {
            const plainPassword = generatePassword();
            return {
                ...student,
                classId,
                username: generateUniqueUsername(student.fullName),
                password: hashSync(plainPassword, 10), // Store hashed password
                fullName: student.fullName,
                dob: new Date(student.dob),
                email: student.email,
                studentID: generateStudentID(),
                schoolId,
                createdBy: user._id,
                plainPassword, // Temporarily store plain password for email
            };
        });

        // Insert students and get their _ids
        const newStudents = await Student.insertMany(processedStudents);

        if (newStudents.length === 0) throw new Error("No students were inserted into the database");

        const studentIds = newStudents.map(student => student._id);


        // Update class by adding new students' _id to the students array
        await Class.findByIdAndUpdate(classId, { $push: { students: { $each: studentIds } } });
        ;
        // Count students and update school's student count
        const studentCount = await Student.countDocuments({ schoolId });
        await School.findByIdAndUpdate(schoolId, { "subscriptionPlan.currentStudent": studentCount });

        await Promise.all(processedStudents.map(({ email, fullName, username, plainPassword }) =>
            wrappedSendMail({
                to: email,
                subject: "New Student Registration",
                html: welcomeRegisterEmail(fullName, plainPassword, username, school.schoolName, school.schoolEmail),
            })
        ));

        return { message: "Students uploaded and emails sent successfully" };
    } catch (error) {
        console.error("Error uploading bulk students:", error);
        throw new Error("Failed to upload students. Please try again.");
    }
}


export async function totalStudents() {
    try {
        const user = await currentUser();
        if (!user) throw new Error("user not logged in");
        const schoolId = user.schoolId
        await connectToDB();
        const totalMembers = await Student.countDocuments({ schoolId });

        return totalMembers

    } catch (error) {
        console.log("unable to count Students", error);
        throw error;
    }
}


export async function fetchStudentsForCanteenList(classId: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");

        const schoolId = user.schoolId;
        await connectToDB();

        // Fetch students from the specified class and school with populated MealPlan
        const students = await Student.find({ schoolId, classId })
            .populate([{ path: "canteen.planId", model: MealPlan }])
            .exec();

        if (!students || students.length === 0) {
            return [];
        }

        // Fetch meal payments for these students with today's date
        const studentIds = students.map(student => student._id);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const paidStudents = await MealPayment.find({
            schoolId,
            payerId: { $in: studentIds },
            status: "Completed",
            createdAt: { $gte: today }
        }).select("payerId");

        const paidStudentIds = new Set(paidStudents.map(payment => payment.payerId.toString()));

        // Add "payed" field to student objects and handle null planId
        const updatedStudents = students.map(student => {
            const studentObj = student.toObject();
            return {
                ...studentObj,
                payed: paidStudentIds.has(studentObj._id.toString()),
                canteen: {
                    ...studentObj.canteen,
                    planId: studentObj.canteen?.planId ?? null  // Avoid deep references
                }
            };
        });


        return JSON.parse(JSON.stringify(updatedStudents));
    } catch (error) {
        console.log("Something went wrong", error);
        throw error;
    }
}
export async function fetchStudentsForClassFeesList(classId: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not logged in");

        const schoolId = user.schoolId;
        await connectToDB();

        // Fetch students from the specified class and school with populated MealPlan
        const students = await Student.find({ schoolId, classId })

        if (!students || students.length === 0) {
            return [];
        }

        // Fetch meal payments for these students with today's date
        const studentIds = students.map(student => student._id);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const paidStudents = await ClassPayment.find({
            schoolId,
            payerId: { $in: studentIds },
            status: "Completed",
            createdAt: { $gte: today }
        }).select("payerId");

        const paidStudentIds = new Set(paidStudents.map(payment => payment.payerId.toString()));

        // Add "payed" field to student objects and handle null planId
        const updatedStudents = students.map(student => {
            const studentObj = student.toObject();
            return {
                ...studentObj,
                payed: paidStudentIds.has(studentObj._id.toString()),
            };
        });


        return JSON.parse(JSON.stringify(updatedStudents));
    } catch (error) {
        console.log("Something went wrong", error);
        throw error;
    }
}
