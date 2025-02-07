import { model, models, Schema } from "mongoose";

// OTP Schema Definition
const otpSchema = new Schema<IOTP>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    userType: {
        type: String,
        enum: ['Employee', 'Teacher', 'Student', 'Parent'],
        required: true,
    },
    otp: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
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
        default: null,
    },
    action_type: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600, // Automatically delete after 10 minutes (600 seconds)
    }
}, {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields automatically
    versionKey: false,
    minimize: false,
});

// Create or retrieve the model
const OTP = models.OTP || model<IOTP>("OTP", otpSchema);

export default OTP;