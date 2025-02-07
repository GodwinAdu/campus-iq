import { z } from "zod";

export const CreateRoleSchema = z.object({
    name: z.string().min(2, {
        message: "Role name is require",
    }),
    displayName: z.string().min(2, {
        message: "Display name is require",
    }),
    description: z.string().min(2, {
        message: "Description is require",
    }),
    manageSchool: z.boolean().optional(),
    manageAccess: z.boolean().optional(),

    dashboard: z.boolean().optional(),
    schoolInfo: z.boolean().optional(),
    systemConfig: z.boolean().optional(),
    classManagement: z.boolean().optional(),
    studentManagement: z.boolean().optional(),
    employeeManagement: z.boolean().optional(),
    manageAttendance: z.boolean().optional(),
    homeWork: z.boolean().optional(),
    manageTimeTable: z.boolean().optional(),
    onlineLearning: z.boolean().optional(),
    examsManagement: z.boolean().optional(),
    account: z.boolean().optional(),
    inventory: z.boolean().optional(),
    hostelManagement: z.boolean().optional(),
    library: z.boolean().optional(),
    depositAndExpense: z.boolean().optional(),
    smsAndEmail: z.boolean().optional(),
    report: z.boolean().optional(),

    viewChart: z.boolean().optional(),
    viewMemberTab: z.boolean().optional(),
    viewEnquiries: z.boolean().optional(),
    viewExpenses: z.boolean().optional(),

    addRole: z.boolean().optional(),
    manageRole: z.boolean().optional(),
    viewRole: z.boolean().optional(),
    editRole: z.boolean().optional(),
    deleteRole: z.boolean().optional(),

    addSubject: z.boolean().optional(),
    manageSubject: z.boolean().optional(),
    viewSubject: z.boolean().optional(),
    editSubject: z.boolean().optional(),
    deleteSubject: z.boolean().optional(),

    addTerm: z.boolean().optional(),
    manageTerm: z.boolean().optional(),
    viewTerm: z.boolean().optional(),
    editTerm: z.boolean().optional(),
    deleteTerm: z.boolean().optional(),

    addSession: z.boolean().optional(),
    manageSession: z.boolean().optional(),
    viewSession: z.boolean().optional(),
    editSession: z.boolean().optional(),
    deleteSession: z.boolean().optional(),

    addClass: z.boolean().optional(),
    manageClass: z.boolean().optional(),
    viewClass: z.boolean().optional(),
    editClass: z.boolean().optional(),
    deleteClass: z.boolean().optional(),

    addTime: z.boolean().optional(),
    manageTime: z.boolean().optional(),
    viewTime: z.boolean().optional(),
    editTime: z.boolean().optional(),
    deleteTime: z.boolean().optional(),

    addClassAllocation: z.boolean().optional(),
    manageClassAllocation: z.boolean().optional(),
    viewClassAllocation: z.boolean().optional(),
    editClassAllocation: z.boolean().optional(),
    deleteClassAllocation: z.boolean().optional(),

    addGradingSystem: z.boolean().optional(),
    manageGradingSystem: z.boolean().optional(),
    viewGradingSystem: z.boolean().optional(),
    editGradingSystem: z.boolean().optional(),
    deleteGradingSystem: z.boolean().optional(),

    addGpa: z.boolean().optional(),
    manageGpa: z.boolean().optional(),
    viewGpa: z.boolean().optional(),
    editGpa: z.boolean().optional(),
    deleteGpa: z.boolean().optional(),

    publishResult: z.boolean().optional(),

    addStudent: z.boolean().optional(),
    manageStudent: z.boolean().optional(),
    viewStudent: z.boolean().optional(),
    editStudent: z.boolean().optional(),
    deleteStudent: z.boolean().optional(),

    addParent: z.boolean().optional(),
    manageParent: z.boolean().optional(),
    viewParent: z.boolean().optional(),
    editParent: z.boolean().optional(),
    deleteParent: z.boolean().optional(),

    addDepartment: z.boolean().optional(),
    manageDepartment: z.boolean().optional(),
    viewDepartment: z.boolean().optional(),
    editDepartment: z.boolean().optional(),
    deleteDepartment: z.boolean().optional(),

    manageEmployeeList: z.boolean().optional(),

    addEmployee: z.boolean().optional(),
    manageEmployee: z.boolean().optional(),
    viewEmployee: z.boolean().optional(),
    editEmployee: z.boolean().optional(),
    deleteEmployee: z.boolean().optional(),

    addBook: z.boolean().optional(),
    manageBook: z.boolean().optional(),
    viewBook: z.boolean().optional(),
    editBook: z.boolean().optional(),
    deleteBook: z.boolean().optional(),

    addTeacherAttendance: z.boolean().optional(),
    manageTeacherAttendance: z.boolean().optional(),
    viewTeacherAttendance: z.boolean().optional(),
    editTeacherAttendance: z.boolean().optional(),
    deleteTeacherAttendance: z.boolean().optional(),

    addStudentAttendance: z.boolean().optional(),
    manageStudentAttendance: z.boolean().optional(),
    viewStudentAttendance: z.boolean().optional(),
    editStudentAttendance: z.boolean().optional(),
    deleteStudentAttendance: z.boolean().optional(),

    addHomework: z.boolean().optional(),
    manageHomework: z.boolean().optional(),
    viewHomework: z.boolean().optional(),
    editHomework: z.boolean().optional(),
    deleteHomework: z.boolean().optional(),

    addEvaluationReport: z.boolean().optional(),
    manageEvaluationReport: z.boolean().optional(),
    viewEvaluationReport: z.boolean().optional(),
    editEvaluationReport: z.boolean().optional(),
    deleteEvaluationReport: z.boolean().optional(),

    addTimetable: z.boolean().optional(),
    manageTimetable: z.boolean().optional(),
    viewTimetable: z.boolean().optional(),
    editTimetable: z.boolean().optional(),
    deleteTimetable: z.boolean().optional(),



});
