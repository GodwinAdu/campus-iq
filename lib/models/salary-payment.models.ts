import { Schema, model, models, Document, Model } from "mongoose";

// Define the SalaryPayment schema
const SalaryPaymentSchema: Schema<ISalaryPayment> = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    salaryStructureId: {
        type: Schema.Types.ObjectId,
        ref: 'SalaryStructure',
        required: true
    },
    paymentDate: {
        type: Date,
        required: true
    },
    paymentAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid'
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

// Define the model type
type SalaryPaymentModel = Model<ISalaryPayment>;

// Create or retrieve the SalaryPayment model
const SalaryPayment: SalaryPaymentModel = models.SalaryPayment || model<ISalaryPayment>("SalaryPayment", SalaryPaymentSchema);

export default SalaryPayment;
