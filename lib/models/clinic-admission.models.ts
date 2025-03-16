import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IClinicAdmission extends Document {
    studentId: mongoose.Schema.Types.ObjectId;
    admissionDate: Date;
    admissionReason: string;
    attendingStaffId: mongoose.Schema.Types.ObjectId;
    guardianNotified: boolean;

    vitalSigns?: {
        temperature?: number;
        bloodPressure?: string;
        pulseRate?: number;
        respiratoryRate?: number;
    };

    symptoms: string[];
    diagnosis: string;
    treatmentGiven: string;

    medicationsPrescribed?: {
        name: string;
        dosage: string;
        frequency: string;
    }[];

    admissionStatus: "ADMITTED" | "DISCHARGED" | "REFERRED";
    dischargeDate?: Date;
    referredTo?: string;
    followUpRequired: boolean;

    remarks?: string;
    attachments?: string[];
}

const ClinicAdmissionSchema = new Schema<IClinicAdmission>({
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    admissionDate: { type: Date, default: Date.now },
    admissionReason: { type: String, required: true },
    attendingStaffId: { type: Schema.Types.ObjectId, ref: "Staff", required: true },
    guardianNotified: { type: Boolean, default: false },

    vitalSigns: {
        temperature: { type: Number },
        bloodPressure: { type: String },
        pulseRate: { type: Number },
        respiratoryRate: { type: Number },
    },

    symptoms: { type: [String], required: true },
    diagnosis: { type: String, required: true },
    treatmentGiven: { type: String, required: true },

    medicationsPrescribed: [
        {
            name: { type: String, required: true },
            dosage: { type: String, required: true },
            frequency: { type: String, required: true },
        },
    ],

    admissionStatus: {
        type: String,
        enum: ["ADMITTED", "DISCHARGED", "REFERRED"],
        default: "ADMITTED"
    },
    dischargeDate: { type: Date },
    referredTo: { type: String },
    followUpRequired: { type: Boolean, default: false },

    remarks: { type: String },
    attachments: { type: [String] }, // URLs for reports, X-rays, etc.
}, { timestamps: true });

const ClinicAdmission = models.ClinicAdmission || model<IClinicAdmission>("ClinicAdmission", ClinicAdmissionSchema);

export default ClinicAdmission;
