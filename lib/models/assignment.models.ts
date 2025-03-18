import { models, Schema, model, Model } from "mongoose";


const AssignmentSchema: Schema<IAssignment> = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: "Class",
        required: true
    },
    sessionId: {
        type: Schema.Types.ObjectId,
        ref: "Session",
        default: null,
    },
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    termId: {
        type: Schema.Types.ObjectId,
        ref: "Term",
        default: null
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    totalMarks: { type: Number, required: true },
    numberOfSubmission: { type: Number, required: true },
    assignmentType: { type: String, enum: ["homework", "classwork", "project", "quiz"], required: true },
    status: { type: String, enum: ["active", "closed"], required: true },
    submissionCount: [{
        type: Schema.Types.ObjectId,
        ref: "Student",
        default: [],
    }],
    totalStudents: { type: Number, required: true },
    allowLateSubmission: {
        type: Boolean,
        default: false,
    },
    createdAt: { type: Date, default: Date.now },
    attachments: { type: [String], default: [] },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null,
    },
    mod_flag: {
        type: Boolean,
        default: false,
    },
    del_flag: {
        type: Boolean,
        default: false,
    },
    modifiedBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null,
    },
    deletedBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null,
    },
    action_type: {
        type: String,
        default: null,
    }
}, {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
    versionKey: false, // Remove the version key to prevent versioning conflicts
    minimize: false, // Ensure full document updates
});

type AssignmentModel = Model<IAssignment>


const Assignment: AssignmentModel = models.Assignment || model<IAssignment>("Assignment", AssignmentSchema);

export default Assignment