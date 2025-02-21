import { Schema, model, models, Document, Model } from "mongoose";

/**
 * Mongoose schema for Term document
 */
const TermSchema: Schema<ITerm> = new Schema({
    schoolId:{
        type:Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    isCurrent: {
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
 * Mongoose model for Term document
 * If the model already exists, it will be returned, otherwise, a new model will be created
 */
const Term: Model<ITerm> = models.Term || model<ITerm>("Term", TermSchema);

/**
 * Exporting the Term model
 */
export default Term;
