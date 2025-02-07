import { Schema, model, models, Model } from "mongoose";

// Define the StudentAttendance schema
const AttendanceSchema = new Schema<IAttendance>({
    userId: {
        type: Schema.Types.ObjectId,  // Fixed userType issue
        refPath: "userType",  // Dynamically references either 'Student' or 'Employee'
        required: true,
    },
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    userType: {
        type: String,
        enum: ["Student", "Employee"],
        required: true,
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: "Class",
        required: true,
    },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    records: {
        type: Map,
        of: Boolean, // Example: { "1": true, "2": false } (true = present, false = absent)
        default: {},
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null,
    },
    mod_flag: { type: Boolean, default: false },
    del_flag: { type: Boolean, default: false },
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
    },
}, {
    timestamps: true,
    versionKey: false, // Removes the __v field
    minimize: false, // Ensures full document updates
});

// Define the model type
type AttendanceModel = Model<IAttendance>;

// Create or retrieve the Attendance model
const Attendance: AttendanceModel =
    models.Attendance || model<IAttendance>("Attendance", AttendanceSchema);

export default Attendance;