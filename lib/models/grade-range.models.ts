import { Document, Schema, Model, model, models } from "mongoose";

const GradeRangeSchema: Schema<IGradeRange> = new Schema({
    gradeName: {
        type: String,
        required: true,
    },
    gradePoint: {
        type: Number,
        required: true,
    },
    minPercentage: {
        type: Number,
        required: true,
    },
    maxPercentage: {
        type: Number,
        required: true,
    },
    remark: {
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
type GradeRangeModel = Model<IGradeRange>;

// Create or retrieve the GradeRange model
const GradeRange: GradeRangeModel = models.GradeRange || model<IGradeRange>("GradeRange", GradeRangeSchema);

export default GradeRange;
