import { Document, Schema, models, model, Types } from "mongoose";

const DaySchema = new Schema<IDay>({
    name: {
        type: String,
        required: true,
        trim: true,
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
    versionKey: false, // Removing version key.
    minimize: false, // Enabling full document update.
});

// Create or retrieve the model
const Day = models.Day || model<IDay>("Day", DaySchema);

export default Day;
