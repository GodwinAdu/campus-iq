import { Schema, model, models, Model } from "mongoose";

const ParentSchema: Schema<IParent> = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Uncomment if you want to add email validation
    },
    phone: {
        type: String,
        required: true,
    },
    relationship: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "parent",
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'Student',
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
type ParentModel = Model<IParent>;

// Create or retrieve the Parent model
const Parent: ParentModel = models.Parent || model<IParent>("Parent", ParentSchema);

export default Parent;
