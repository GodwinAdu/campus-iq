import { model, Schema, models, Document, Model } from "mongoose";

/**
 * Mongoose schema for Timetable document
 */
const TimetableSchema: Schema<ITimetable> = new Schema({
    time: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
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
 * Mongoose model for Timetable document
 * If the model already exists, it will be returned, otherwise, a new model will be created
 */
const Timetable: Model<ITimetable> = models.Timetable || model<ITimetable>("Timetable", TimetableSchema);

/**
 * Exporting the Timetable model
 */
export default Timetable;
