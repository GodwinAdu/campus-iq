import { Schema, model, models, Model } from "mongoose";



const RoleSchema: Schema<IRole> = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    name: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    description: { type: String },
    permissions: {
        dashboard: { type: Boolean, default: false },
        schoolInfo: { type: Boolean, default: false },
        systemConfig: { type: Boolean, default: false },
        classManagement: { type: Boolean, default: false },
        studentManagement: { type: Boolean, default: false },
        employeeManagement: { type: Boolean, default: false },
        manageAttendance: { type: Boolean, default: false },
        homeWork: { type: Boolean, default: false },
        timetable: { type: Boolean, default: false },
        onlineLearning: { type: Boolean, default: false },
        examsManagement: { type: Boolean, default: false },
        account: { type: Boolean, default: false },
        inventory: { type: Boolean, default: false },
        hostelManagement: { type: Boolean, default: false },
        library: { type: Boolean, default: false },
        depositAndExpense: { type: Boolean, default: false },
        smsAndEmail: { type: Boolean, default: false },
        report: { type: Boolean, default: false },
        canteenManagement: { type: Boolean, default: false },
        transportManagement: { type: Boolean, default: false },
        feesManagement: { type: Boolean, default: false },
        hrManagement: { type: Boolean, default: false },
        viewChart: { type: Boolean, default: false },
        viewMemberTab: { type: Boolean, default: false },
        viewEnquiries: { type: Boolean, default: false },
        viewExpenses: { type: Boolean, default: false },
        addRole: { type: Boolean, default: false },
        manageRole: { type: Boolean, default: false },
        viewRole: { type: Boolean, default: false },
        editRole: { type: Boolean, default: false },
        deleteRole: { type: Boolean, default: false },
        addSubject: { type: Boolean, default: false },
        manageSubject: { type: Boolean, default: false },
        viewSubject: { type: Boolean, default: false },
        editSubject: { type: Boolean, default: false },
        deleteSubject: { type: Boolean, default: false },
        addTerm: { type: Boolean, default: false },
        manageTerm: { type: Boolean, default: false },
        viewTerm: { type: Boolean, default: false },
        editTerm: { type: Boolean, default: false },
        deleteTerm: { type: Boolean, default: false },
        addSession: { type: Boolean, default: false },
        manageSession: { type: Boolean, default: false },
        viewSession: { type: Boolean, default: false },
        editSession: { type: Boolean, default: false },
        deleteSession: { type: Boolean, default: false },
        addClass: { type: Boolean, default: false },
        manageClass: { type: Boolean, default: false },
        viewClass: { type: Boolean, default: false },
        editClass: { type: Boolean, default: false },
        deleteClass: { type: Boolean, default: false },
        addStudent: { type: Boolean, default: false },
        manageStudent: { type: Boolean, default: false },
        viewStudent: { type: Boolean, default: false },
        editStudent: { type: Boolean, default: false },
        deleteStudent: { type: Boolean, default: false },
        addEmployee: { type: Boolean, default: false },
        manageEmployee: { type: Boolean, default: false },
        viewEmployee: { type: Boolean, default: false },
        editEmployee: { type: Boolean, default: false },
        deleteEmployee: { type: Boolean, default: false },
        addBook: { type: Boolean, default: false },
        manageBook: { type: Boolean, default: false },
        viewBook: { type: Boolean, default: false },
        editBook: { type: Boolean, default: false },
        deleteBook: { type: Boolean, default: false },
        addTimetable: { type: Boolean, default: false },
        manageTimetable: { type: Boolean, default: false },
        viewTimetable: { type: Boolean, default: false },
        editTimetable: { type: Boolean, default: false },
        deleteTimetable: { type: Boolean, default: false },
        addHomework: { type: Boolean, default: false },
        manageHomework: { type: Boolean, default: false },
        viewHomework: { type: Boolean, default: false },
        editHomework: { type: Boolean, default: false },
        deleteHomework: { type: Boolean, default: false },
        addExamMark: { type: Boolean, default: false },
        manageExamMark: { type: Boolean, default: false },
        viewExamMark: { type: Boolean, default: false },
        editExamMark: { type: Boolean, default: false },
        deleteExamMark: { type: Boolean, default: false },
        generatePosition: { type: Boolean, default: false },
        studentReport: { type: Boolean, default: false },
        financialReport: { type: Boolean, default: false },
        attendanceReport: { type: Boolean, default: false },
        hrReport: { type: Boolean, default: false },
        inventoryReport: { type: Boolean, default: false },
        libraryReport: { type: Boolean, default: false },
        transportationReport: { type: Boolean, default: false },
        canteenReport: { type: Boolean, default: false },
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
    del_flag: {
        type: Boolean,
        default: false
    },
    modifiedBy: {
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
});

type RoleModel = Model<IRole>

const Role: RoleModel = models.Role || model<IRole>("Role", RoleSchema);

export default Role;
