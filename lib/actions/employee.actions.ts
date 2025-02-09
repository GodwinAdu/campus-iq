"use server"


import School from "../models/school.models";
import { connectToDB } from "../mongoose";
import { generateSchoolCode } from "../helpers/generateSchoolUniqueName";
import { hash } from "bcryptjs";
import { generateUniqueUsername } from "../helpers/generateUsername";
import Role from "../models/role.models";
import { currentProfile } from "../helpers/current-profile";
import { revalidatePath } from "next/cache";
import { generatePassword } from "../helpers/generatePassword";
import { wrappedSendMail } from "../nodemailer";
import { welcomeEmail, welcomeMail } from "../mail-massages";
import Employee from '../models/employee.models';
import Department from "../models/department.models";
import { generateUniqueStaffId } from "../helpers/generateStaffId";
import EmailCoin from "../models/email-coins.models";
import { currentUser } from "../helpers/current-user";

export const getEmployeeById = async (id: string) => {
    try {
        await connectToDB();

        const employee = await Employee.findById(id).select('-password');

        if (!employee) {
            return null
        }

        return JSON.parse(JSON.stringify(employee));
    } catch (error) {
        console.error("Error while fetching employee", error);
        throw error;
    }
}


interface AdminProps {
    fullName: string;
    email: string;
    dob: Date;
    gender: string;
    phone: string;
}

export async function SignupAdministrator(formData: AdminProps, path: string) {
    const {
        fullName,
        email,
        dob,
        gender,
        phone,
    } = formData;

    try {
        await connectToDB();

        const rawUsername = generateUniqueUsername(fullName);
        const rawPassword = generatePassword();
        const hashedPassword = await hash(rawPassword, 10);

        const existingAdmin = await Employee.findOne({ email })


        if (existingAdmin) {
            throw new Error("Admin already exists");
        }


        const newAdmin = new Employee({
            userName: rawUsername,
            staffId: generateUniqueStaffId(),
            fullName,
            email,
            password: hashedPassword,
            dob,
            gender,
            phone,
            role: "admin",
            action_type: "create"
        });

        const coin = new EmailCoin({
            coins: 500,
            createdBy: newAdmin._id,
            action_type: "create"
        });

        const newDepartment = new Department({
            name: "Administration Department",
            employees: [newAdmin._id],
            createdBy: newAdmin._id,
            action_type: "create"
        });

        const newRole = new Role({
            name: "Administrator",
            displayName: "admin",
            description: `The administrator`,
            dashboard: true,
            schoolInfo: true,
            systemConfig: true,
            classManagement: true,
            studentManagement: true,
            employeeManagement: true,
            manageAttendance: true,
            homeWork: true,
            manageTimeTable: true,
            onlineLearning: true,
            examsManagement: true,
            account: true,
            inventory: true,
            hostelManagement: true,
            library: true,
            depositAndExpense: true,
            smsAndEmail: true,
            report: true,
            viewChart: true,
            viewMemberTab: true,
            viewEnquiries: true,
            viewExpenses: true,
            addRole: true,
            manageRole: true,
            viewRole: true,
            editRole: true,
            deleteRole: true,
            addSubject: true,
            manageSubject: true,
            viewSubject: true,
            editSubject: true,
            deleteSubject: true,
            addTerm: true,
            manageTerm: true,
            viewTerm: true,
            editTerm: true,
            deleteTerm: true,
            addSession: true,
            manageSession: true,
            viewSession: true,
            editSession: true,
            deleteSession: true,
            addClass: true,
            manageClass: true,
            viewClass: true,
            editClass: true,
            deleteClass: true,
            addTime: true,
            manageTime: true,
            viewTime: true,
            editTime: true,
            deleteTime: true,
            addClassAllocation: true,
            manageClassAllocation: true,
            viewClassAllocation: true,
            editClassAllocation: true,
            deleteClassAllocation: true,
            addGradingSystem: true,
            manageGradingSystem: true,
            viewGradingSystem: true,
            editGradingSystem: true,
            deleteGradingSystem: true,
            addGpa: true,
            manageGpa: true,
            viewGpa: true,
            editGpa: true,
            deleteGpa: true,
            publishResult: true,
            addStudent: true,
            manageStudent: true,
            viewStudent: true,
            editStudent: true,
            deleteStudent: true,
            addParent: true,
            manageParent: true,
            viewParent: true,
            editParent: true,
            deleteParent: true,
            addDepartment: true,
            manageDepartment: true,
            viewDepartment: true,
            editDepartment: true,
            deleteDepartment: true,
            manageEmployeeList: true,
            addEmployee: true,
            manageEmployee: true,
            viewEmployee: true,
            editEmployee: true,
            deleteEmployee: true,
            addBook: true,
            manageBook: true,
            viewBook: true,
            editBook: true,
            deleteBook: true,
            addTeacherAttendance: true,
            manageTeacherAttendance: true,
            viewTeacherAttendance: true,
            editTeacherAttendance: true,
            deleteTeacherAttendance: true,
            addStudentAttendance: true,
            manageStudentAttendance: true,
            viewStudentAttendance: true,
            editStudentAttendance: true,
            deleteStudentAttendance: true,
            addHomework: true,
            manageHomework: true,
            viewHomework: true,
            editHomework: true,
            deleteHomework: true,
            addEvaluationReport: true,
            manageEvaluationReport: true,
            viewEvaluationReport: true,
            editEvaluationReport: true,
            deleteEvaluationReport: true,
            addTimetable: true,
            manageTimetable: true,
            viewTimetable: true,
            editTimetable: true,
            deleteTimetable: true,
            createdBy: newAdmin?._id,
            action_type: "create"
        });

        await Promise.all([
            newAdmin.save(),
            coin.save(),
            newDepartment.save(),
            newRole.save(),
        ]);

        newAdmin.departmentId = newDepartment._id;
        await newAdmin.save();

        const mailOptions = {
            to: email,
            subject: 'EduXcel Registration',
            html: welcomeMail(fullName, rawPassword, rawUsername),
        };

        if (coin) {
            if (coin) {
                coin.coins -= 1;
            }
        }
        await wrappedSendMail(mailOptions);
        await coin.save();

        revalidatePath(path);

        return JSON.parse(JSON.stringify(newAdmin))
    } catch (error) {
        console.error("Error creating new admin:", error);
        throw error;
    }
}



/**
 * Represents the properties for creating a new admin user.
 */
interface CreateEmployeeProps {

    fullName: string;
    dob?: Date;
    email: string;
    gender: string;
    phone: string;
    religion?: string;
    permanentAddress?: string;
    presentAddress?: string;
    role: string;
    department?: string;
    joinedDate?: Date;
    qualification?: string;
    experience?: string;
    totalExperience?: string;
    idCardType?: string;
    idCard?: string;
    accountType?: string;
    accountName?: string;
    accountNumber?: string;
}


export async function createEmployee(formData: CreateEmployeeProps, path: string) {
    try {

        const {
            fullName,
            dob,
            email,
            gender,
            phone,
            religion,
            permanentAddress,
            presentAddress,
            role,
            department,
            joinedDate,
            qualification,
            experience,
            totalExperience,
            idCardType,
            idCard,
            accountType,
            accountName,
            accountNumber,
        } = formData;

        await connectToDB();
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;

        const coin = await EmailCoin.findOne({ schoolId: schoolId });

        const currentSchool = await School.findById(schoolId);
        const schoolName = currentSchool?.schoolName;
        const schoolEmail = currentSchool?.schoolEmail;
        // const schoolId = currentSchool?.uniqueName;

        const rawPassword = generatePassword();
        console.log("Generated Password:", rawPassword);

        const hashedPassword = await hash(rawPassword, 10);
        console.log("Hashed Password:", hashedPassword);

        const rawUsername = generateUniqueUsername(fullName);

        // const mailOptions = {
        //     to: email,
        //     subject: 'Register As Employee',
        //     html: welcomeEmail(schoolName, schoolEmail, schoolId, fullName, rawPassword, rawUsername)
        // }




        const existingEmployeeWithEmail = await Employee.findOne({ email });
        if (existingEmployeeWithEmail) {
            throw new Error("Employee already exists")
        }

        const assignDepartment = await Department.findById(department);

        if (!assignDepartment) throw new Error("Department not found");

        const newEmployee = new Employee({
            schoolId,
            userName: rawUsername,
            staffId: generateUniqueStaffId(),
            fullName,
            dob,
            email,
            gender,
            phone,
            religion,
            permanentAddress,
            presentAddress,
            role,
            joinedDate,
            qualification,
            experience,
            totalExperience,
            idCardType,
            idCard,
            accountType,
            accountName,
            accountNumber,
            departmentId: department,
            password: hashedPassword,
        });

        const userData = await newEmployee.save();
        if (!assignDepartment.employees) {
            assignDepartment.employees = [];
        }
        assignDepartment.employees.push(userData._id);
        await assignDepartment.save();

        coin.coins -= 1;
        // await wrappedSendMail(mailOptions);
        await coin.save();

        revalidatePath(path);
        return
    } catch (error) {
        console.log("something went wrong while creating new Employee", error);
        throw error;
    }
}


export async function getAllEmployees() {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;
        await connectToDB();

        const admins = await Employee.find({ schoolId })
            .populate("createdBy", "fullName")
            .exec();

        if (!admins) {
            console.log("Cant find admins")
            return null
        }

        return JSON.parse(JSON.stringify(admins));

    } catch (error) {
        console.log("unable to fetch admin users", error)
        return null
    }
}

export async function fetchEmployeeById(adminId: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        await connectToDB();
        const admin = await Employee.findById(adminId);
        if (!admin) {
            console.log("Cant find admin")
            throw new Error("Cant find admin")
        }

        return JSON.parse(JSON.stringify(admin));

    } catch (error) {
        console.log("unable to fetch admin", error)
        throw error;
    }
}

export async function fetchEmployeeByRole(role: string) {
    try {
        console.log(role, "fetching employee by role");
        const user = await currentUser();

        if (!user) throw new Error('User not logged in');

        const schoolId = user.schoolId;
        await connectToDB();

        const employees = await Employee.find({ schoolId, role }, { fullName: 1, _id: 1 });
        if (employees.length === 0) {
            console.log("Employee not found");
            return [];
        }

        console.log('Fetched employees:', employees);
        return JSON.parse(JSON.stringify(employees));
    } catch (error) {
        console.error("Error fetching employee by role:", error);
        throw error;
    }
}



export async function updateEmployee(adminId: string, values: Partial<CreateEmployeeProps>, path?: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user not logged in');
        await connectToDB();

        const updatedAdmin = await Employee.findByIdAndUpdate(
            adminId,
            { $set: values },
            { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: true }
        );

        if (!updatedAdmin) {
            console.log("Employee not found");
            return null;
        }

        console.log("Update successful");
        if (path) {
            revalidatePath(path as string)
        }

        return JSON.parse(JSON.stringify(updatedAdmin));
    } catch (error) {
        console.error("Error updating admin:", error);
        throw error;
    }
}




/**
 * Counts the total number of admin users associated with the current logged-in school.
 * 
 * @returns Promise<number> - A promise that resolves with the total count of admin users.
 * 
 * @throws Will throw an error if there is a problem connecting to the database or retrieving the admin users.
 * 
 * @remarks
 * This function uses the `currentProfile` function to get the ID of the current logged-in school.
 * It then connects to the database and uses the `Employee` model to count the documents where the `school` field matches the current school's ID.
 * The count is returned as the result of the function.
 * 
 * @example
 * ```typescript
 * try {
 *     const totalAdmins = await totalAdmins();
 *     console.log("Total admins:", totalAdmins);
 * } catch (error) {
 *     console.error("Error counting admins:", error);
 * }
 * ```
 */
export async function totalEmployees() {
    try {
        const user = await currentUser();

        if (!user) throw new Error('user not logged in');

        const schoolId = user.schoolId;

        await connectToDB();

        const totalMembers = await Employee.countDocuments({ schoolId });

        return totalMembers

    } catch (error) {
        console.log("unable to count Employees", error);
        throw error;
    }
}


export async function deleteAdmin(id: string) {
    try {
        await connectToDB();
        const deleteUser = await Employee.findByIdAndDelete(id);
        if (!deleteUser) {
            throw new Error("Couldn't delete user")
        }
        return JSON.parse(JSON.stringify(deleteUser));
    } catch (error) {
        console.log("Unable to delete Admin", error);
        throw error;
    }
}

export async function fetchEmployeesList(departmentId: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not logged in');
        const schoolId = user.schoolId;


        await connectToDB();

        const employees = await Employee.find({ schoolId, departmentId });
        if (employees.length === 0) {
            return [];
        }
        console.log(employees);

        return JSON.parse(JSON.stringify(employees));
    } catch (error) {
        console.log("something went wrong", error);
        throw error;
    }
}