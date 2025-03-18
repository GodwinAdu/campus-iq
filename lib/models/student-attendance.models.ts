import { models, model, Schema } from "mongoose";

const AttendanceRecordSchema: Schema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    status: {
        type: String,
        enum: ['present', 'absent', 'late', 'excused'],
        required: true
    },
    remarks: { type: String, default: '' },
});


const StudentAttendanceSchema = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: "Class",
        required: true,
    },
    date: { type: Date, required: true },
    records: [AttendanceRecordSchema],
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
    timestamps: true,
    versionKey: false,
});

// Create compound index for class and date to ensure uniqueness
StudentAttendanceSchema.index({ classId: 1, date: 1 }, { unique: true });

const StudentAttendance = models.StudentAttendance || model("StudentAttendance", StudentAttendanceSchema);

export default StudentAttendance;