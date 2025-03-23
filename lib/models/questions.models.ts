import { model, models, Schema } from "mongoose";

const QuestionSchema = new Schema({
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    type: {
        type: String,
        enum: [
            'multiple-choice', 'true-false', 'essay', 'short-answer',
            'matching', 'fill-blanks', 'drag-drop',
        ],
        required: true
    },
    text: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    points: { type: Number, default: 1 },
    estimatedTime: { type: Number, default: 60 }, // in seconds
    categories: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    options: { type: [String], default: [] },
    correctAnswer: { type: Schema.Types.Mixed, default: null },
    correctAnswers: { type: [String], default: [] },
    explanation: { type: String, default: '' },
    hints: { type: [String], default: [] },
    attachments: { type: [String], default: [] },
    bankId: { type: Schema.Types.ObjectId, ref: 'QuestionBank', required: true }
}, {
    timestamps: true,
    versionKey: false
});


const Question = models.Question || model("Question", QuestionSchema);

export default Question;