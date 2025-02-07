import { Model, Schema, model, models } from "mongoose";

const DistributionSchema:Schema<IDistribution> = new Schema({
    schoolId:{
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    markDistribution: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null,
    },
    mod_flag: {
        type: Boolean,
        default: false,
    },
    delete_flag: {
        type: Boolean,
        default: false,
    },
    modifyBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null,
    },
    deletedBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null,
    },
    action_type: {
        type: String,
        default: null,
    }
}, {
    timestamps: true,
    versionKey: false, // Remove the version key (__v)
});

type DistributionModel = Model<IDistribution>
// Create or retrieve the model
const Distribution:DistributionModel = models.Distribution || model<IDistribution>("Distribution", DistributionSchema);

export default Distribution;
