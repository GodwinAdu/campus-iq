import { Schema, Model, model, models } from "mongoose";

const ExamSetupSchema: Schema<IExamSetup> = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    termId: {
        type: Schema.Types.ObjectId,
        ref: "Term",
        required: true
    },
    sessionId: {
        type: Schema.Types.ObjectId,
        ref: "Session",
        required: true
    },
    examType: {
        type: String,
        required: true
    },
    markDistributions: {
        type: [String],
        default: []
    },
    nextTerm: {
        type: String
    },
    publish: {
        type: Boolean,
        default: false
    },
    publishResult: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
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
type ExamSetupModel = Model<IExamSetup>;

// Create or retrieve the ExamSetup model
const ExamSetup: ExamSetupModel = models.ExamSetup || model<IExamSetup>("ExamSetup", ExamSetupSchema);

export default ExamSetup;
