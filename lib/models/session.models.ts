import { Schema, model, models, Model } from "mongoose";

// Define the Session schema
const SessionSchema: Schema<ISession> = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    period: {
        type: String,
        required: true
    },
    present: {
        type: Boolean,
        default: false
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
type SessionModel = Model<ISession>;

// Create or retrieve the Session model
const Session: SessionModel = models.Session || model<ISession>("Session", SessionSchema);

export default Session;
