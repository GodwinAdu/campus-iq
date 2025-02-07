import { Schema, model, models, Model } from "mongoose";


// Define the DistributionItem schema
const DistributionItemSchema: Schema<IDistributionItem> = new Schema({
    distribution: {
        type: String,
        required: true,
    },
    mark: {
        type: Number,
        default: 0,
        min: 0,
    }
}, { _id: false });

// Define the SubjectItem schema
const SubjectItemSchema: Schema<ISubjectItem> = new Schema({
    subjectName: {
        type: String,
        required: true,
    },
    distributionItems: {
        type: [DistributionItemSchema],
        default: [],
    },
    totalMark: {
        type: Number,
        default: 0
    },
    grade: {
        type: String,
        default: null
    }
}, { _id: false });

// Define the Mark schema
const MarkSchema: Schema<IMark> = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    examId: {
        type: Schema.Types.ObjectId,
        ref: 'ExamSetup',
        required: true,
        index: true,
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        index: true,
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
        index: true,
    },
    subjectItems: {
        type: [SubjectItemSchema],
        default: [],
    },
    totalMarks: {
        type: Number,
        default: 0,
        min: 0
    },
    position: {
        type: Number,
        default: 0
    },
    publish: {
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
    versionKey: false, // Removing version key.
    minimize: false, // Enabling full document update.
});

// Define the model type
type MarkModel = Model<IMark>;

// Create or retrieve the Mark model
const Mark: MarkModel = models.Mark || model<IMark>("Mark", MarkSchema);

export default Mark;
