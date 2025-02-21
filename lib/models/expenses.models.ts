import { Schema, Model, model, models } from "mongoose";
import RevenueSummary from "./revenue-summary.models";
import { UpdateQuery } from "mongoose";

const ExpensesSchema: Schema<IExpense> = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    sessionId: {
        type: Schema.Types.ObjectId,
        ref: 'Session',
        required: true,
    },
    termId:{
        type: Schema.Types.ObjectId,
        ref: 'Term',
        required: true,
    },
    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    expenseName: {
        type: String,
        required: true
    },
    expenseAmount: {
        type: Number,
        required: true
    },
    expenseDate: {
        type: Date,
        required: true,
        index: true,
    },
    reference: {
        type: String
    },
    payVia: {
        type: String,
        required: true
    },
    attachmentUrl: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
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

ExpensesSchema.post("save", async function (doc) {
    try {
        const { schoolId, sessionId,termId, expenseAmount, expenseDate } = doc;
        const startOfMonth = new Date(expenseDate.getFullYear(), expenseDate.getMonth(), 1);

        await RevenueSummary.updateOne(
            { schoolId, sessionId,termId, date: startOfMonth },
            { $inc: { totalRevenue: -expenseAmount } },
            { upsert: true }
        );
    } catch (error) {
        console.error("Error updating revenue summary:", error);
    }
});

ExpensesSchema.post("findOneAndUpdate", async function (doc) {
    try {
        const { schoolId, sessionId,termId, expenseDate } = doc;
        const update = this.getUpdate();
        const updatedAmount = (update as UpdateQuery<typeof doc>)?.$set?.expenseAmount || doc.expenseAmount;
        const originalAmount = doc.totalAmount || 0;
        const difference = (updatedAmount || 0) - originalAmount;

        if (difference !== 0) {
            const startOfMonth = new Date(expenseDate.getFullYear(), expenseDate.getMonth(), 1);

            await RevenueSummary.updateOne(
                { schoolId, sessionId,termId, date: startOfMonth },
                { $inc: { totalRevenue: -difference } }
            );
        }
    } catch (error) {
        console.error("Error updating revenue summary on edit:", error);
    }
});

ExpensesSchema.post("findOneAndDelete", async function (doc) {
    try {
        const { schoolId, sessionId,termId, totalAmount, expenseDate } = doc;

        if (schoolId && expenseDate) {
            const startOfMonth = new Date(expenseDate.getFullYear(), expenseDate.getMonth(), 1);

            await RevenueSummary.updateOne(
                { schoolId, sessionId,termId, date: startOfMonth },
                { $inc: { totalRevenue: -totalAmount } }
            );
        }
    } catch (error) {
        console.error("Error updating revenue summary on delete:", error);
    }
});
// Define the model type
type ExpenseModel = Model<IExpense>;

// Create or retrieve the Expense model
const Expense: ExpenseModel = models.Expense || model<IExpense>("Expense", ExpensesSchema);

export default Expense;
