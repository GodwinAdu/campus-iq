import { Schema, model, models, Document, Types } from "mongoose";

const EmployeeAttendanceSchema = new Schema<IEmployeeAttendance>({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    role: {
        type: String,
        default: null,
    },
    present: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        required: true
    },
    day: {
        type: Number,
        default: 0,
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
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    versionKey: false, // Disable the __v version key
    minimize: false, // Store the full document even if some fields are undefined
});

// Create or retrieve the model
const EmployeeAttendance = models.EmployeeAttendance || model<IEmployeeAttendance>("EmployeeAttendance", EmployeeAttendanceSchema);

export default EmployeeAttendance;
