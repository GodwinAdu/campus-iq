import { Document, Schema, Model, model, models } from "mongoose";

const FeesFineSchema: Schema<IFeesFine> = new Schema({
    schoolId:{
        type:Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: "Class",
        required: true
    },
    feesType: {
        type: String,
        required: true
    },
    fineType: {
        type: String,
        required: true
    },
    fineAmount: {
        type: Number,
        default: 0
    },
    frequency: {
        type: String
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
type FeesFineModel = Model<IFeesFine>;

// Create or retrieve the FeesFine model
const FeesFine: FeesFineModel = models.FeesFine || model<IFeesFine>("FeesFine", FeesFineSchema);

export default FeesFine;
