import { Schema, models, model, Model } from "mongoose";


// Define DistributionItem Schema
const DistributionItemSchema:Schema<IDistributionExams> = new Schema({
    distribution: {
        type: String,
    },
    fullMark: {
        type: Number,
        min: 0,
    },
    passMark: {
        type: Number,
        min: 0,
    }
}, { _id: false });

// Define SubjectItem Schema
const SubjectItemSchema:Schema<ISubjectItem> = new Schema({
    subjectName: {
        type: String
    },
    hallId: {
        type: Schema.Types.ObjectId,
        ref: 'ExamHall',
        default: null,
    },
    date: {
        type: Date,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    distributionItems: {
        type: [DistributionItemSchema],
        default: [],
    }
}, { _id: false });

// Define ExamSchedule Schema
const ExamScheduleSchema:Schema<IExamSchedule> = new Schema({
    schoolId:{
        type:Schema.Types.ObjectId,
        ref:"School",
        required:true
    },
    examId: {
        type: Schema.Types.ObjectId,
        ref: 'ExamSetup',
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

type ExamScheduleModel = Model<IExamSchedule>

// Create or retrieve the ExamSchedule model
const ExamSchedule:ExamScheduleModel = models.ExamSchedule || model<IExamSchedule>("ExamSchedule", ExamScheduleSchema);

export default ExamSchedule;
