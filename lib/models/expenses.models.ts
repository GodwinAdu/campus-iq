import {  Schema, Model, model, models } from "mongoose";

const ExpensesSchema: Schema<IExpense> = new Schema({
    schoolId:{
        type: Schema.Types.ObjectId,
        ref: "School",
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

// Define the model type
type ExpenseModel = Model<IExpense>;

// Create or retrieve the Expense model
const Expense: ExpenseModel = models.Expense || model<IExpense>("Expense", ExpensesSchema);

export default Expense;
