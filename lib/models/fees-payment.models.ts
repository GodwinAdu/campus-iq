import { Schema, Model, model, models } from "mongoose";

const FeesPaymentSchema: Schema<IFeesPayment> = new Schema({
    schoolId:{
        type:Schema.Types.ObjectId,
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

// Define the model type
type FeesPaymentModel = Model<IFeesPayment>;

// Create or retrieve the FeesPayment model
const FeesPayment: FeesPaymentModel = models.FeesPayment || model<IFeesPayment>("FeesPayment", FeesPaymentSchema);

export default FeesPayment;
