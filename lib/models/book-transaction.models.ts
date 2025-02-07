
import { models, model, Schema, Model, } from "mongoose";

const BookTransactionSchema:Schema<IBookTransaction> = new Schema({
    schoolId:{
        type:Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
        index: true
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        index: true
    },
    issuedDate: {
        type: Date,
        default: Date.now
    },
    librarian: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    fine: {
        type: Number,
        default: 0,
        min: 0  // Ensure fine is not negative
    },
    returnedDate: {
        type: Date
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

type BookTransactionModel = Model<IBookTransaction>
const BookTransaction:BookTransactionModel = models.BookTransaction || model<IBookTransaction>("BookTransaction", BookTransactionSchema);

export default BookTransaction;
