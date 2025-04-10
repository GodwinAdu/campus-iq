"use server"

import { generateCode } from "../helpers/generateCode";
import { generateUniqueStaffId } from "../helpers/generateStaffId";
import { generateUniqueUsername } from "../helpers/generateUsername";
import { welcomeMail } from "../mail-massages";
import Department from "../models/department.models";
import Employee from "../models/employee.models";
import Role from "../models/role.models";
import School from "../models/school.models";
import { connectToDB } from "../mongoose";
import { wrappedSendMail } from "../nodemailer";
import { getNextMonthDate, hashPassword } from "../utils";

type RegisterProps = {
    confirmPassword: string;
    email: string;
    fullName: string;
    password: string;
    plan:"basic" | "pro" | "custom";
    schoolAddress: string;
    schoolName: string;
    type: string;
    position: string;
    phoneNumber: string;
    addresses:{
        schoolAddress: string;
        schoolCity: string;
        schoolState: string;
        schoolZipcode: string;
        schoolCountry: string;
    },
    schoolPhone: string;
    website: string;
    foundedYear: string;
    description: string;
    modules: {
        dashboard: boolean;
        systemConfig: boolean;
        classManagement: boolean;
        studentManagement: boolean;
        employeeManagement: boolean;
        manageAttendance: boolean;
        onlineLearning: boolean;
        examsManagement: boolean;
        inventory: boolean;
        hostelManagement: boolean;
        library: boolean;
        depositAndExpense: boolean;
        message: boolean;
        report: boolean;
        canteenManagement: boolean;
        transportManagement: boolean;
        feesManagement: boolean;
        hrManagement: boolean;
        healthManagement: boolean;
        history: boolean;
        trash: boolean;
    },
    acceptedTerms: boolean;

}

const defaultRole = {
    name: "Administrator",
    displayName: "admin",
    description: `The administrator`,
    permissions: {
        dashboard: true,
        systemConfig: true,
        classManagement: true,
        studentManagement: true,
        employeeManagement: true,
        manageAttendance: true,
        homeWork: true,
        timetable: true,
        onlineLearning: true,
        examsManagement: true,
        inventory: true,
        hostelManagement: true,
        library: true,
        depositAndExpense: true,
        message: true,
        report: true,
        canteenManagement: true,
        transportManagement: true,
        feesManagement: true,
        hrManagement: true,
        healthManagement: true,
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
        addCanteen: true,
        manageCanteen: true,
        viewCanteen: true,
        editCanteen: true,
        deleteCanteen: true,
        addEmployee: true,
        manageEmployee: true,
        viewEmployee: true,
        editEmployee: true,
        deleteEmployee: true,
        addHr: true,
        manageHr: true,
        viewHr: true,
        editHr: true,
        deleteHr: true,
        addRequestLeave: true,
        manageRequestLeave: true,
        viewRequestLeave: true,
        editRequestLeave: true,
        deleteRequestLeave: true,
        addRequestSalary: true,
        manageRequestSalary: true,
        viewRequestSalary: true,
        editRequestSalary: true,
        deleteRequestSalary: true,
        addLeaveCategory: true,
        manageLeaveCategory: true,
        viewLeaveCategory: true,
        editLeaveCategory: true,
        deleteLeaveCategory: true,
        addTimetable: true,
        manageTimetable: true,
        viewTimetable: true,
        editTimetable: true,
        deleteTimetable: true,
        addHomework: true,
        manageHomework: true,
        viewHomework: true,
        editHomework: true,
        deleteHomework: true,
        addExam: true,
        manageExam: true,
        viewExam: true,
        editExam: true,
        deleteExam: true,
        addFees: true,
        manageFees: true,
        viewFees: true,
        editFees: true,
        deleteFees: true,
        addInventory: true,
        manageInventory: true,
        viewInventory: true,
        editInventory: true,
        deleteInventory: true,
        addHostel: true,
        manageHostel: true,
        viewHostel: true,
        editHostel: true,
        deleteHostel: true,
        addLibrary: true,
        manageLibrary: true,
        viewLibrary: true,
        editLibrary: true,
        deleteLibrary: true,
        addHealth: true,
        manageHealth: true,
        viewHealth: true,
        editHealth: true,
        deleteHealth: true,
        addAccount: true,
        manageAccount: true,
        viewAccount: true,
        editAccount: true,
        deleteAccount: true,
        generatePosition: true,
        studentReport: true,
        financialReport: true,
        attendanceReport: true,
        hrReport: true,
        inventoryReport: true,
        libraryReport: true,
        transportationReport: true,
        canteenReport: true,
        healthReport: true,
        accountReport: true,
        manageStudentAttendance: true,
        manageEmployeeAttendance: true,
    }
};
export const registerUser = async (values: RegisterProps) => {
    try {
        const today = new Date();

        const { schoolName,schoolPhone, schoolAddress, fullName, email, password, confirmPassword, type, plan, position, phoneNumber,foundedYear,modules,addresses } = values;

        if (password !== confirmPassword) throw new Error(`Invalid password`);

        await connectToDB()

        const existingUser = await Employee.findOne({ email });
        if (existingUser) throw new Error(`User with email ${email} already exists`);

        const hPassword = await hashPassword(password);
        const rawUsername = generateUniqueUsername(fullName);
        const rawCode = generateCode(schoolName)
        const rawStaffId = generateUniqueStaffId()

        const newSchool = new School({
            schoolCode: rawCode,
            schoolAddress,
            schoolName,
            schoolPhone,
            type,
            modules,
            foundedYear,
            addresses,
            subscriptionPlan: {
                plan,
                renewDate: today,
                expiryDate: getNextMonthDate(today)
            }
        });

        const user = new Employee({
            fullName,
            email,
            phone: phoneNumber,
            position,
            password: hPassword,
            username: rawUsername,
            schoolId: newSchool._id,
            role: 'admin',
            employment: {
                employeeID: rawStaffId,
                dateOfJoining: new Date(Date.now()),
            },
            action_type: 'create'
        });

        const newRole = new Role({
            ...defaultRole,
            schoolId: newSchool._id,
            userCount: [user._id],
            createdBy: user?._id,
            action_type: "create"
        });

        await Promise.all([
            user.save(),
            newRole.save(),
            newSchool.save(),
        ]);
        const newDepartment = new Department({
            schoolId: newSchool._id,
            name: "Administration Department",
            employees: [user._id],
            createdBy: user._id,
            action_type: "create"
        });

        newSchool.owner = user._id
        user.employment.departmentId = newDepartment._id;

        await Promise.all([
            newDepartment.save(),
            user.save(),
            newSchool.save(),
        ]);

        const mailOptions = {
            to: email,
            subject: 'CampusIQ Registration',
            html: welcomeMail(fullName, password, rawUsername),
        };

        await wrappedSendMail(mailOptions);

        return JSON.parse(JSON.stringify(user))

    } catch (error) {
        console.log('Error registering user', error);
        throw error;

    }
}