import { Schema, model, models, Document, Model } from "mongoose";

// Define the Role schema
const RoleSchema: Schema<IRole> = new Schema({
    schoolId:{
        type:Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    manageSchool: {
        type: Boolean,
        default: false,
    },
    manageAccess: {
        type: Boolean,
        default: false,
    },
    dashboard: {
        type: Boolean,
        default: false,
    },
    schoolInfo: {
        type: Boolean,
        default: false,
    },
    systemConfig: {
        type: Boolean,
        default: false,
    },
    classManagement: {
        type: Boolean,
        default: false,
    },
    studentManagement: {
        type: Boolean,
        default: false,
    },
    employeeManagement: {
        type: Boolean,
        default: false,
    },
    manageAttendance: {
        type: Boolean,
        default: false,
    },
    homeWork: {
        type: Boolean,
        default: false,
    },
    manageTimeTable: {
        type: Boolean,
        default: false,
    },
    onlineLearning: {
        type: Boolean,
        default: false,
    },
    examsManagement: {
        type: Boolean,
        default: false,
    },
    account: {
        type: Boolean,
        default: false,
    },
    inventory: {
        type: Boolean,
        default: false,
    },
    hostelManagement: {
        type: Boolean,
        default: false,
    },
    library: {
        type: Boolean,
        default: false,
    },
    depositAndExpense: {
        type: Boolean,
        default: false,
    },
    smsAndEmail: {
        type: Boolean,
        default: false,
    },
    report: {
        type: Boolean,
        default: false,
    },
    viewChart: {
        type: Boolean,
        default: false,
    },
    viewMemberTab: {
        type: Boolean,
        default: false,
    },
    viewEnquiries: {
        type: Boolean,
        default: false,
    },
    viewExpenses: {
        type: Boolean,
        default: false,
    },
    addRole: {
        type: Boolean,
        default: false,
    },
    manageRole: {
        type: Boolean,
        default: false,
    },
    viewRole: {
        type: Boolean,
        default: false,
    },
    editRole: {
        type: Boolean,
        default: false,
    },
    deleteRole: {
        type: Boolean,
        default: false,
    },
    addSubject: {
        type: Boolean,
        default: false,
    },
    manageSubject: {
        type: Boolean,
        default: false,
    },
    viewSubject: {
        type: Boolean,
        default: false,
    },
    editSubject: {
        type: Boolean,
        default: false,
    },
    deleteSubject: {
        type: Boolean,
        default: false,
    },
    addTerm: {
        type: Boolean,
        default: false,
    },
    manageTerm: {
        type: Boolean,
        default: false,
    },
    viewTerm: {
        type: Boolean,
        default: false,
    },
    editTerm: {
        type: Boolean,
        default: false,
    },
    deleteTerm: {
        type: Boolean,
        default: false,
    },
    addSession: {
        type: Boolean,
        default: false,
    },
    manageSession: {
        type: Boolean,
        default: false,
    },
    viewSession: {
        type: Boolean,
        default: false,
    },
    editSession: {
        type: Boolean,
        default: false,
    },
    deleteSession: {
        type: Boolean,
        default: false,
    },
    addClass: {
        type: Boolean,
        default: false,
    },
    manageClass: {
        type: Boolean,
        default: false,
    },
    viewClass: {
        type: Boolean,
        default: false,
    },
    editClass: {
        type: Boolean,
        default: false,
    },
    deleteClass: {
        type: Boolean,
        default: false,
    },
    addTime: {
        type: Boolean,
        default: false,
    },
    manageTime: {
        type: Boolean,
        default: false,
    },
    viewTime: {
        type: Boolean,
        default: false,
    },
    editTime: {
        type: Boolean,
        default: false,
    },
    deleteTime: {
        type: Boolean,
        default: false,
    },
    addClassAllocation: {
        type: Boolean,
        default: false,
    },
    manageClassAllocation: {
        type: Boolean,
        default: false,
    },
    viewClassAllocation: {
        type: Boolean,
        default: false,
    },
    editClassAllocation: {
        type: Boolean,
        default: false,
    },
    deleteClassAllocation: {
        type: Boolean,
        default: false,
    },
    addGradingSystem: {
        type: Boolean,
        default: false,
    },
    manageGradingSystem: {
        type: Boolean,
        default: false,
    },
    viewGradingSystem: {
        type: Boolean,
        default: false,
    },
    editGradingSystem: {
        type: Boolean,
        default: false,
    },
    deleteGradingSystem: {
        type: Boolean,
        default: false,
    },
    addGpa: {
        type: Boolean,
        default: false,
    },
    manageGpa: {
        type: Boolean,
        default: false,
    },
    viewGpa: {
        type: Boolean,
        default: false,
    },
    editGpa: {
        type: Boolean,
        default: false,
    },
    deleteGpa: {
        type: Boolean,
        default: false,
    },
    publishResult: {
        type: Boolean,
        default: false,
    },
    addStudent: {
        type: Boolean,
        default: false,
    },
    manageStudent: {
        type: Boolean,
        default: false,
    },
    viewStudent: {
        type: Boolean,
        default: false,
    },
    editStudent: {
        type: Boolean,
        default: false,
    },
    deleteStudent: {
        type: Boolean,
        default: false,
    },
    addParent: {
        type: Boolean,
        default: false,
    },
    manageParent: {
        type: Boolean,
        default: false,
    },
    viewParent: {
        type: Boolean,
        default: false,
    },
    editParent: {
        type: Boolean,
        default: false,
    },
    deleteParent: {
        type: Boolean,
        default: false,
    },
    addDepartment: {
        type: Boolean,
        default: false,
    },
    manageDepartment: {
        type: Boolean,
        default: false,
    },
    viewDepartment: {
        type: Boolean,
        default: false,
    },
    editDepartment: {
        type: Boolean,
        default: false,
    },
    deleteDepartment: {
        type: Boolean,
        default: false,
    },
    manageEmployeeList: {
        type: Boolean,
        default: false,
    },
    addEmployee: {
        type: Boolean,
        default: false,
    },
    manageEmployee: {
        type: Boolean,
        default: false,
    },
    viewEmployee: {
        type: Boolean,
        default: false,
    },
    editEmployee: {
        type: Boolean,
        default: false,
    },
    deleteEmployee: {
        type: Boolean,
        default: false,
    },
    addBook: {
        type: Boolean,
        default: false,
    },
    manageBook: {
        type: Boolean,
        default: false,
    },
    viewBook: {
        type: Boolean,
        default: false,
    },
    editBook: {
        type: Boolean,
        default: false,
    },
    deleteBook: {
        type: Boolean,
        default: false,
    },
    addTeacherAttendance: {
        type: Boolean,
        default: false,
    },
    manageTeacherAttendance: {
        type: Boolean,
        default: false,
    },
    viewTeacherAttendance: {
        type: Boolean,
        default: false,
    },
    editTeacherAttendance: {
        type: Boolean,
        default: false,
    },
    deleteTeacherAttendance: {
        type: Boolean,
        default: false,
    },
    addStudentAttendance: {
        type: Boolean,
        default: false,
    },
    manageStudentAttendance: {
        type: Boolean,
        default: false,
    },
    viewStudentAttendance: {
        type: Boolean,
        default: false,
    },
    editStudentAttendance: {
        type: Boolean,
        default: false,
    },
    deleteStudentAttendance: {
        type: Boolean,
        default: false,
    },
    addHomework: {
        type: Boolean,
        default: false,
    },
    manageHomework: {
        type: Boolean,
        default: false,
    },
    viewHomework: {
        type: Boolean,
        default: false,
    },
    editHomework: {
        type: Boolean,
        default: false,
    },
    deleteHomework: {
        type: Boolean,
        default: false,
    },
    addEvaluationReport: {
        type: Boolean,
        default: false,
    },
    manageEvaluationReport: {
        type: Boolean,
        default: false,
    },
    viewEvaluationReport: {
        type: Boolean,
        default: false,
    },
    editEvaluationReport: {
        type: Boolean,
        default: false,
    },
    deleteEvaluationReport: {
        type: Boolean,
        default: false,
    },
    addTimetable: {
        type: Boolean,
        default: false,
    },
    manageTimetable: {
        type: Boolean,
        default: false,
    },
    viewTimetable: {
        type: Boolean,
        default: false,
    },
    editTimetable: {
        type: Boolean,
        default: false,
    },
    deleteTimetable: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null
    },
    mod_flag: {
        type: Boolean,
        default: false
    },
    delete_flag: {
        type: Boolean,
        default: false
    },
    modifyBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null
    },
    deletedBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null
    },
    action_type: {
        type: String,
        default: null
    }
}, {
    timestamps: true,
    versionKey: false,
    minimize: false,
});

// Define the model type
type RoleModel = Model<IRole>;

// Create or retrieve the Role model
const Role: RoleModel = models.Role || model<IRole>("Role", RoleSchema);

export default Role;
