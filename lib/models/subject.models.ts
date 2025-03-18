import { Schema, model, models, Model } from "mongoose";

// Define the Subject schema
const SubjectSchema: Schema<ISubject> = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    subjectName: {
        type: String,
        required: true,
    },
    subjectCredit: {
        type: String,
        required: true,
    },
    subjectHour: {
        type: String,
        required: true,
    },
    subjectAttribute: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    code: {
        type: String,
        required: true,
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: "Class"
    },
    syllabus: {
        type: [String]
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
    versionKey: false, // Removing version key.
    minimize: false, // Enabling full document update.
});

// Define the model type
type SubjectModel = Model<ISubject>;

// Create or retrieve the Subject model
const Subject: SubjectModel = models.Subject || model<ISubject>("Subject", SubjectSchema);

export default Subject;
