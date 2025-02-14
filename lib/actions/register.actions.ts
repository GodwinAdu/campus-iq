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
    timetable: true,
    onlineLearning: true,
    examsManagement: true,
    account: true,
    inventory: true,
    hostelManagement: true,
    library: true,
    depositAndExpense: true,
    smsAndEmail: true,
    report: true,
    canteenManagement: true,
    transportManagement: true,
    feesManagement: true,
    hrManagement: true,
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
    addTimetable: true,
    manageTimetable: true,
    viewTimetable: true,
    editTimetable: true,
    deleteTimetable: true,
    addStudentAttendance: true,
    manageStudentAttendance: true,
    viewStudentAttendance: true,
    editStudentAttendance: true,
    deleteStudentAttendance: true,
    addEmployeeAttendance: true,
    manageEmployeeAttendance: true,
    viewEmployeeAttendance: true,
    editEmployeeAttendance: true,
    deleteEmployeeAttendance: true,
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
    addExamHall: true,
    manageExamHall: true,
    viewExamHall: true,
    editExamHall: true,
    deleteExamHall: true,
    addExamDistribution: true,
    manageExamDistribution: true,
    viewExamDistribution: true,
    editExamDistribution: true,
    deleteExamDistribution: true,
    addExamSetup: true,
    manageExamSetup: true,
    viewExamSetup: true,
    editExamSetup: true,
    deleteExamSetup: true,
    addExamSchedule: true,
    manageExamSchedule: true,
    viewExamSchedule: true,
    editExamSchedule: true,
    deleteExamSchedule: true,
    addExamMark: true,
    manageExamMark: true,
    viewExamMark: true,
    editExamMark: true,
    deleteExamMark: true,
    generatePosition: true,
    addExamGradeRange: true,
    manageExamGradeRange: true,
    viewExamGradeRange: true,
    editExamGradeRange: true,
    deleteExamGradeRange: true,
    addFineSetup: true,
    manageFineSetup: true,
    viewFineSetup: true,
    editFineSetup: true,
    deleteFineSetup: true,
    addFeePayment: true,
    manageFeePayment: true,
    viewFeePayment: true,
    editFeePayment: true,
    deleteFeePayment: true,
    feesReminder: true,
    addFeeStructure: true,
    manageFeeStructure: true,
    viewFeeStructure: true,
    editFeeStructure: true,
    deleteFeeStructure: true,
    addSalaryStructure: true,
    manageSalaryStructure: true,
    viewSalaryStructure: true,
    editSalaryStructure: true,
    deleteSalaryStructure: true,
    addSalaryAssign: true,
    manageSalaryAssign: true,
    viewSalaryAssign: true,
    editSalaryAssign: true,
    deleteSalaryAssign: true,
    addSalaryPayment: true,
    manageSalaryPayment: true,
    viewSalaryPayment: true,
    editSalaryPayment: true,
    deleteSalaryPayment: true,
    addSalaryRequest: true,
    manageSalaryRequest: true,
    viewSalaryRequest: true,
    editSalaryRequest: true,
    deleteSalaryRequest: true,
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
    addRequestLeave: true,
    manageRequestLeave: true,
    viewRequestLeave: true,
    editRequestLeave: true,
    deleteRequestLeave: true,
    addLeave: true,
    manageLeave: true,
    viewLeave: true,
    editLeave: true,
    deleteLeave: true,
    addAward: true,
    manageAward: true,
    viewAward: true,
    editAward: true,
    deleteAward: true,
    addStore: true,
    manageStore: true,
    viewStore: true,
    editStore: true,
    deleteStore: true,
    addInventoryCategory: true,
    manageInventoryCategory: true,
    viewInventoryCategory: true,
    editInventoryCategory: true,
    deleteInventoryCategory: true,
    addProduct: true,
    manageProduct: true,
    viewProduct: true,
    editProduct: true,
    deleteProduct: true,
    addSupplier: true,
    manageSupplier: true,
    viewSupplier: true,
    editSupplier: true,
    deleteSupplier: true,
    addPurchase: true,
    managePurchase: true,
    viewPurchase: true,
    editPurchase: true,
    deletePurchase: true,
    addIssue: true,
    manageIssue: true,
    viewIssue: true,
    editIssue: true,
    deleteIssue: true,
    addHostel: true,
    manageHostel: true,
    viewHostel: true,
    editHostel: true,
    deleteHostel: true,
    addRoom: true,
    manageRoom: true,
    viewRoom: true,
    editRoom: true,
    deleteRoom: true,
    addMaintenance: true,
    manageMaintenance: true,
    viewMaintenance: true,
    editMaintenance: true,
    deleteMaintenance: true,
    addBookIssue: true,
    manageBookIssue: true,
    viewBookIssue: true,
    editBookIssue: true,
    deleteBookIssue: true,
    manageAccountIntegration: true,
    addAccount: true,
    manageAccount: true,
    viewAccount: true,
    editAccount: true,
    deleteAccount: true,
    addDeposit: true,
    manageDeposit: true,
    viewDeposit: true,
    editDeposit: true,
    deleteDeposit: true,
    addExpense: true,
    manageExpense: true,
    viewExpense: true,
    editExpense: true,
    deleteExpense: true,
    transactionList: true,
    studentReport: true,
    financialReport: true,
    attendanceReport: true,
    hrReport: true,
    inventoryReport: true,
    libraryReport: true,
    transportationReport: true,
    canteenReport: true,
};
export const registerUser = async (values: RegisterProps) => {
    try {
        const today = new Date();

        const { schoolName, schoolAddress,fullName, email, password, confirmPassword, type, plan } = values;

        if (password !== confirmPassword) throw new Error(`Invalid password`);

        await connectToDB()

        const existingUser = await Employee.findOne({ email });
        if (existingUser) throw new Error(`User with email ${email} already exists`);

        const hPassword = await hashPassword(password);
        const rawUsername = generateUniqueUsername(fullName);
        const rawCode = generateCode(schoolName)
        const rawStaffId = generateUniqueStaffId()

        const newSchool = new School({
            category:"primary",
            schoolCode:rawCode,
            schoolAddress,
            schoolName,
            type,
            subscriptionPlan:{
                plan,
                renewDate:today,
                expiryDate:getNextMonthDate(today)
            }
        });

        const user = new Employee({
            fullName,
            email,
            password: hPassword,
            schoolId: newSchool._id,
            role: 'admin',
            username: rawUsername,
            staffId: rawStaffId,
        });

        const newRole = new Role({
            ...defaultRole,
            schoolId: newSchool._id,
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
        })

        user.departmentId = newDepartment._id;
        await Promise.all([
            newDepartment.save(),
            user.save(),
        ]);

        const mailOptions = {
            to: email,
            subject: 'CampusIQ Registration',
            html: welcomeMail( fullName, password, rawUsername),
        };

        await wrappedSendMail(mailOptions);

        return JSON.parse(JSON.stringify(user))


    } catch (error) {
        console.log('Error registering user', error);
        throw error;

    }
}