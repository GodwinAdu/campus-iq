import { model, models, Schema, Document, Model } from "mongoose";

/**
 * Mongoose schema for Time document
 */
const TimeSchema: Schema<ITime> = new Schema({
    name: {
        type: String,
        required: true,
    },
    period: {
        type: String,
        required: true,
        unique: true
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

/**
 * Mongoose model for Time document
 * If the model already exists, it will be returned; otherwise, a new model will be created
 */
const Time: Model<ITime> = models.Time || model<ITime>("Time", TimeSchema);

/**
 * Exporting the Time model
 */
export default Time;
