import mongoose, { Model, Schema } from "mongoose";

const ClassSchema:Schema<IClass> = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    code: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true,
    },
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Subject',
    }],
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student',
    }],
    teachers: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee',
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null,
    },
    mod_flag: {
        type: Boolean,
        default: false,
    },
    del_flag: {
        type: Boolean,
        default: false,
    },
    modifiedBy: {
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
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
    versionKey: false, // Remove the version key to prevent versioning conflicts
    minimize: false, // Ensure full document updates
});

type ClassModel = Model<IClass>

// Create or retrieve the Class model
const Class:ClassModel = mongoose.models.Class || mongoose.model<IClass>("Class", ClassSchema);

export default Class;
