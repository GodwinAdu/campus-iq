import { Schema, model, models, Model } from "mongoose";

// Define the SalaryStructure schema
const SalaryStructureSchema: Schema<ISalaryStructure> = new Schema({
    schoolId:{
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    salaryName: {
        type: String,
        required: true
    },
    basicSalary: {
        type: Number,
        default: 0
    },
    overtimeRate: {
        type: Number,
        default: 0
    },
    allowances: [{
        allowanceName: {
            type: String,
        },
        amount: {
            type: Number,
            default: 0
        }
    }],
    deductions: [{
        deductionName: {
            type: String,
        },
        amount: {
            type: Number,
            default: 0
        }
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null
    },
    mod_flag: {
        type: Boolean,
        default: false
    },
    delete_flag: {
        type: Boolean,
        default: false
    },
    modifyBy: {
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
type SalaryStructureModel = Model<ISalaryStructure>;

// Create or retrieve the SalaryStructure model
const SalaryStructure: SalaryStructureModel = models.SalaryStructure || model<ISalaryStructure>("SalaryStructure", SalaryStructureSchema);

export default SalaryStructure;
