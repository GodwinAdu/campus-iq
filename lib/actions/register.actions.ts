"use server"

import { generateCode } from "../helpers/generateCode";
import { generateUniqueStaffId } from "../helpers/generateStaffId";
import { generateUniqueUsername } from "../helpers/generateUsername";
import Department from "../models/department.models";
import EmailCoin from "../models/email-coins.models";
import Employee from "../models/employee.models";
import Role from "../models/role.models";
import School from "../models/school.models";
import { connectToDB } from "../mongoose";
import { hashPassword } from "../utils";

type RegisterProps = {
    confirmPassword: string;
    email: string;
    name: string;
    password: string;
    plan: string;
    schoolAddress: string;
    schoolName: string;
    type: string;
}

const defaultRole = {
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
};
export const registerUser = async (values: RegisterProps) => {
    try {

        const { schoolName, schoolAddress, name, email, password, confirmPassword, type, plan } = values;

        if (password !== confirmPassword) throw new Error(`Invalid password`);

        await connectToDB()

        const existingUser = await Employee.findOne({ email });
        if (existingUser) throw new Error(`User with email ${email} already exists`);

        const hPassword = await hashPassword(password);
        const rawUsername = generateUniqueUsername(name);
        const rawCode = generateCode(schoolName)
        const rawStaffId = generateUniqueStaffId()

        const newSchool = new School({
            category:"primary",
            schoolCode:rawCode,
            schoolAddress,
            schoolName,
            type,
            plan,
        });

        const user = new Employee({
            name,
            email,
            password: hPassword,
            schoolId: newSchool._id,
            role: 'admin',
            username: rawUsername,
            staffId: rawStaffId,
        });


        const coin = new EmailCoin({
            schoolId: newSchool._id,
            coins: 100,
            createdBy: user._id,
            action_type: "create",
        });

        const newRole = new Role({
            ...defaultRole,
            schoolId: newSchool._id,
            createdBy: user?._id,
            action_type: "create"
        });

        await Promise.all([
            user.save(),
            coin.save(),
            newRole.save(),
            newSchool.save(),
        ]);
        const newDepartment = new Department({
            schoolId: newSchool._id,
            name: "Administration Department",
            employees: [user._id],
            createdBy: user._id,
            action_type: "create"
        })

        user.departmentId = newDepartment._id;
        await Promise.all([
            newDepartment.save(),
            user.save(),
        ]);

        // const mailOptions = {
        //     to: email,
        //     subject: 'EduXcel Registration',
        //     html: welcomeMail( fullName, rawPassword, rawUsername),
        // };

        // coin.coins -= 1;
        // await wrappedSendMail(mailOptions);
        // await coin.save();

        return JSON.parse(JSON.stringify(user))


    } catch (error) {
        console.log('Error registering user', error);
        throw error;

    }
}