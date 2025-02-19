import { Schema, model, models } from "mongoose";

const UserLoginSchema = new Schema({
    schoolId:{
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: "userType", // Dynamic reference based on userType
    },
    userType: {
        type: String,
        required: true,
        enum: ["Student", "Parent", "Employee"], // Determines which model userId refers to
    },
    loginTime: {
        type: Date,
        default: Date.now,
    },
    logoutTime: {
        type: Date,
        default: null,
    },
    ipAddress: {
        type: String,
        required: true,
    },
    device: {
        type: String, // Example: "iPhone 13 Pro", "Windows 10 PC"
        required: true,
    },
    browser: {
        type: String, // Example: "Chrome", "Firefox"
        required: true,
    },
    os: {
        type: String, // Example: "Windows", "macOS", "Android"
        required: true,
    },
    location: {
        country: { type: String, default: "Unknown" },
        city: { type: String, default: "Unknown" },
        region: { type: String, default: "Unknown" },
        latitude: { type: Number, default: null },
        longitude: { type: Number, default: null },
    },
    status: {
        type: String,
        enum: ["active", "logged_out"],
        default: "active",
    },
}, {
    timestamps: true,
    versionKey: false,
});

const UserLogin = models.UserLogin || model("UserLogin", UserLoginSchema);

export default UserLogin;
