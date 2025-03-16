import { Schema, Model, model, models } from "mongoose";
import RevenueSummary from "./revenue-summary.models";

const FeesPaymentSchema: Schema<IFeesPayment> = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    invoiceNo: {
        type: String,
        required: true
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: "Class",
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
    fullName: {
        type: String,
    },
    studentNo: {
        type: String,
    },
    status: {
        type: String,
        default: "Unpaid"
    },
    dueDate: {
        type: Date
    },
    fees: [
        {
            category: { type: String, required: true },
            amount: { type: Number, required: true },
            status: { type: Boolean, default: false },
            fine: { type: Number, default: 0 },
            discount: { type: Number, default: 0 },
            paid: { type: Number, default: 0 },
        }
    ],
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

FeesPaymentSchema.post("save", async function (doc) {
    try {
        const { schoolId, sessionId, termId, createdAt } = doc;
        if (!createdAt) throw new Error("createdAt is undefined");
        const startOfMonth = new Date(createdAt.getFullYear(), createdAt.getMonth(), 1);

        // Calculate total paid amount
        const totalPaid = doc.fees.reduce((sum: number, fee: { paid?: number }) => sum + (fee.paid || 0), 0);

        await RevenueSummary.updateOne(
            { schoolId, sessionId, termId, date: startOfMonth },
            { $inc: { totalRevenue: totalPaid } },
            { upsert: true }
        );
    } catch (error) {
        console.error("Error updating revenue summary:", error);
    }
});


FeesPaymentSchema.post("findOneAndUpdate", async function (doc) {
    try {
        if (!doc) return;

        const { schoolId, sessionId, termId, createdAt } = doc;
        const update = this.getUpdate();
        const updatedFees = (update as { $set?: { fees?: typeof doc.fees } })?.$set?.fees || doc.fees;
        const updatedPaidAmount = updatedFees.reduce((sum: number, fee: { paid?: number }) => sum + (fee.paid || 0), 0);
        const originalPaidAmount = doc.fees.reduce((sum: number, fee: { paid?: number }) => sum + (fee.paid || 0), 0);
        const difference = updatedPaidAmount - originalPaidAmount;

        if (difference !== 0) {
            const startOfMonth = new Date(createdAt.getFullYear(), createdAt.getMonth(), 1);

            await RevenueSummary.updateOne(
                { schoolId, sessionId, termId, date: startOfMonth },
                { $inc: { totalRevenue: difference } }
            );
        }
    } catch (error) {
        console.error("Error updating revenue summary on edit:", error);
    }
});


FeesPaymentSchema.post("findOneAndDelete", async function (doc) {
    try {
        if (!doc) return;

        const { schoolId, sessionId, termId, createdAt } = doc;
        const totalPaid = doc.fees.reduce((sum: number, fee: { paid?: number }) => sum + (fee.paid || 0), 0);
        const startOfMonth = new Date(createdAt.getFullYear(), createdAt.getMonth(), 1);

        await RevenueSummary.updateOne(
            { schoolId, sessionId, termId, date: startOfMonth },
            { $inc: { totalRevenue: -totalPaid } }
        );
    } catch (error) {
        console.error("Error updating revenue summary on delete:", error);
    }
});


// Define the model type
type FeesPaymentModel = Model<IFeesPayment>;

// Create or retrieve the FeesPayment model
const FeesPayment: FeesPaymentModel = models.FeesPayment || model<IFeesPayment>("FeesPayment", FeesPaymentSchema);

export default FeesPayment;
