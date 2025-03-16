import { Schema, model, models } from "mongoose";
import RevenueSummary from "./revenue-summary.models";

const ClassPaymentSchema = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true
    },
    sessionId: {
        type: Schema.Types.ObjectId,
        ref: "Session",
        default: null
    },
    termId: {
        type: Schema.Types.ObjectId,
        ref: "Term",
        default: null
    },
    payerId: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    amount: { type: Number, required: true }, // Total amount paid
    paymentMethod: {
        type: String,
        enum: ["Cash", "Mobile Money", "Card", "Bank Transfer"],
        required: true
    },
    transactionId: { type: String, unique: true }, // For tracking digital payments
    status: {
        type: String,
        enum: ["Pending", "Completed", "Failed", "Refunded"],
        default: "Pending"
    },
    createdAt: { type: Date, default: Date.now },

    createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
    mod_flag: { type: Boolean, default: false },
    del_flag: { type: Boolean, default: false },

    modifiedBy: { type: Schema.Types.ObjectId, ref: "Employee" },
    deletedBy: { type: Schema.Types.ObjectId, ref: "Employee" },
    action_type: { type: String },
}, {
    timestamps: true,
    versionKey: false,
});

ClassPaymentSchema.post("save", async function (doc) {
    try {
        const { schoolId, sessionId, termId, createdAt } = doc;
        if (!createdAt) throw new Error("createdAt is undefined");
        const startOfMonth = new Date(createdAt.getFullYear(), createdAt.getMonth(), 1);

        await RevenueSummary.updateOne(
            { schoolId, sessionId, termId, date: startOfMonth },
            { $inc: { totalRevenue: doc.amount } },
            { upsert: true }
        );
    } catch (error) {
        console.error("Error updating revenue summary:", error);
    }
});


const ClassPayment = models.ClassPayment || model("ClassPayment", ClassPaymentSchema);

export default ClassPayment;
