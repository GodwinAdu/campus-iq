
import { model, Schema, models } from "mongoose";


const QuestionBankSchema = new Schema({
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
    name: { type: String, required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    description: { type: String, default: '' },
    questionCount: { type: Number, default: 0 },
    categories: { type: [String], default: [] },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard', 'mixed'], required: true },
    lastUpdated: { type: Date, default: Date.now },
    status: { type: String, enum: ['draft', 'published', 'archived'], required: true },
    shared: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
}, {
    timestamps: true,
    versionKey: false
})


const QuestionBank = models.QuestionBank || model("QuestionBank", QuestionBankSchema);

export default QuestionBank;

