import { Schema, model, models } from "mongoose";

const RevenueSummarySchema = new Schema(
    {
        schoolId: {
            type: Schema.Types.ObjectId,
            ref: "School",
            required: true,
        },
        sessionId:{
            type: Schema.Types.ObjectId,
            ref: "Session",
            required: true,
        },
        termId:{
            type: Schema.Types.ObjectId,
            ref: "Term",
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        totalRevenue: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true, versionKey: false }
);

const RevenueSummary = models.RevenueSummary || model("RevenueSummary", RevenueSummarySchema);

export default RevenueSummary;