import { model, models } from "mongoose";
import { Schema } from "mongoose";

const SubmissionSchema = new Schema({
    assignmentId: {
        type: Schema.Types.ObjectId,
        ref: "Assignment",
        required: true,
    },
    status: {
        type: String,
        enum: ["submitted", "pending"], // Define allowed statuses
        default: "pending", // Submission status when it's not submitted yet
    },
    content: {
        type: String,
        default: null
    },
    submittedAt: {
        type: Date,
        default: null, // If not submitted yet
    },
    file: {
        type: String,
        default: null, // If no file is submitted
    },
    marks: {
        type: Number,
        default: null, // If not marked yet
    },
    feedback: {
        type: String,
        default: null, // No feedback initially
    },
    isMarked: {
        type: Boolean,
        default: false,
    },
});

const AssignmentSubmissionSchema = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: "Class",
        required: true,
    },
    termId: {
        type: Schema.Types.ObjectId,
        ref: "Term",
        default: null,
    },
    sessionId: {
        type: Schema.Types.ObjectId,
        ref: "Session",
        default: null,
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    submission: {
        type: SubmissionSchema, // Nested submission schema
        default: {}, // Ensures submission is always an object
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        default: null,
    }
}, {
    timestamps: true,
});


const AssignmentSubmission = models.AssignmentSubmission || model("AssignmentSubmission", AssignmentSubmissionSchema);

export default AssignmentSubmission;