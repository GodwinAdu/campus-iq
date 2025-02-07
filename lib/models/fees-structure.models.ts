import { Schema, Model, model, models } from "mongoose";

const FeesStructureSchema: Schema<IFeesStructure> = new Schema({
    schoolId:{
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
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
    fees: [
        {
            category: { type: String, required: true },
            amount: { type: Number, required: true },
        }
    ],
    dueDate: {
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

// Define the model type
type FeesStructureModel = Model<IFeesStructure>;

// Create or retrieve the FeesStructure model
const FeesStructure: FeesStructureModel = models.FeesStructure || model<IFeesStructure>("FeesStructure", FeesStructureSchema);

export default FeesStructure;
