import { model, models, Schema } from "mongoose";

const QuestionSchema = new Schema({
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    bankId: { type: Schema.Types.ObjectId, ref: 'QuestionBank', required: true },
    type: {
        type: String,
        enum: [
            'multiple-choice', 'true-false', 'essay', 'short-answer',
            'matching', 'fill-blanks', 'drag-drop',
        ],
        required: true,
    },
    text: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    points: { type: Number, default: 1 },
    timeLimit: { type: Number, default: 60 }, // in seconds
    categories: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    options: { type: [String], default: [] },
    correctAnswer: { type: Schema.Types.Mixed, default: null },
    correctAnswers: { type: [String], default: [] },
    explanation: { type: String, default: '' },
    wordLimit: { type: Number, default: 0 },
    caseSensitive: { type: Boolean, default: false },
    acceptableAnswers: { type: [String], default: [] },
    matchingPairs: { type: [{ left: String, right: String }], default: [] },
    blankText: { type: String, default: '' },
    blanks: { type: [{ id: String, answer: String }], default: [] },
    dragDropItems: { type: [{ id: String, text: String, correctZone: String }], default: [] },
    dropZones: { type: [{ id: String, name: String }], default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
}, {
    timestamps: true,
    versionKey: false
});


const Question = models.Question || model("Question", QuestionSchema);

export default Question;

//  type: z.enum(questionTypes),
//     text: z.string().min(1, "Question text is required"),

//     // Multiple choice options
//     options: z.array(z.string()).optional(),
//     correctAnswer: z.union([z.string(), z.boolean(), z.array(z.string())]).optional(),

//     // Essay options
//     wordLimit: z.number().min(0).optional(),

//     // Short answer options
//     caseSensitive: z.boolean().optional(),
//     acceptableAnswers: z.array(z.string()).optional(),

//     // Matching options
//     matchingPairs: z
//         .array(
//             z.object({
//                 id: z.string(),
//                 left: z.string(),
//                 right: z.string(),
//             }),
//         )
//         .optional(),

//     // Fill in the blanks options
//     blankText: z.string().optional(),
//     blanks: z
//         .array(
//             z.object({
//                 id: z.string(),
//                 answer: z.string(),
//             }),
//         )
//         .optional(),

//     // Drag and drop options
//     dragDropItems: z
//         .array(
//             z.object({
//                 id: z.string(),
//                 text: z.string(),
//                 correctZone: z.string(),
//             }),
//         )
//         .optional(),
//     dropZones: z
//         .array(
//             z.object({
//                 id: z.string(),
//                 name: z.string(),
//             }),
//         )
//         .optional(),

//     // Common fields
//     difficulty: z.enum(difficultyLevels),
//     points: z.number().min(1).max(100),
//     explanation: z.string().optional(),
//     categories: z.array(z.string()),
//     tags: z.array(z.string()),
//     timeLimit: z.number().min(0).optional(),