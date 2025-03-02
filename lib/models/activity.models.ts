import { Schema, model, models } from 'mongoose';


const ActivitySchema = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    duration: {
        type: Number,
        required: true
    },
    enjoyment: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
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


const Activity = models.Activity || model("Activity", ActivitySchema);

export default Activity;


