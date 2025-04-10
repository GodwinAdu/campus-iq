import { CallbackError, Model, model, models, Schema } from "mongoose";
import Account from "./account.models";
import Mood from "./mood.models";

const PaymentProcessorSchema = new Schema({
    name: { type: String, default: "Paystack", enum: ["Paystack", "Stripe"] },
    apiKey: { type: String, default: "" },
    secretKey: { type: String, default: "" },
    enabled: { type: Boolean, default: false },
});

const PaymentMethodSchema = new Schema({
    name: {
        type: String,
    },
    enabled: {
        type: Boolean,
        default: false,
    },
    processingFee: {
        type: Number,
        default: 0,
    },
    minimumAmount: {
        type: Number,
        default: 0,
    },
})


const RecruitmentSchema = new Schema({
    position: {
        type: String,
    },
    category: {
        type: String,
        enum: ["essential", "recommended", "optional"],
        default: "recommended",
    },
    requiredCount: { type: Number, default: 1 },
    currentCount: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ["needed", "filled", "pending"],
        default: "needed",
    },
});

// Define School Schema
const SchoolSchema: Schema<ISchool> = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: "Employee", default: null },
    schoolCode: { type: String, unique: true, required: true },
    schoolLogo: { type: String, default: "" },
    foundedYear: { type: Number, default: null },
    affiliation: { type: String, default: "" },
    schoolName: { type: String, required: true },
    motto: { type: String, default: "" },
    schoolPhone: { type: String, default: "" },
    schoolEmail: { type: String, unique: true },
    website: { type: String, default: "" },
    description: { type: String, default: "" },

    addresses: {
        schoolAddress: { type: String, default: "" },
        schoolCity: { type: String, default: "" },
        schoolState: { type: String, default: "" },
        schoolZipcode: { type: String, default: "" },
        schoolCountry: { type: String, default: "" },
    },

    // 🛠 School Settings
    settings: {
        maxStudents: { type: Number, default: 1000 }, // Max students allowed
        maxTeachers: { type: Number, default: 50 }, // Max teachers allowed
        admissionOpen: { type: Boolean, default: true }, // Is admission open?
        allowGuestAccess: { type: Boolean, default: false }, // Allow guests to view school details
    },
    notifications: {
        overdueSubscriptionAlert: { type: Boolean, default: true },
        subscriptionRenewalReminder: { type: Boolean, default: true },
        paymentConfirmation: { type: Boolean, default: true },
        invoiceGenerated: { type: Boolean, default: false },

        attendanceAlerts: { type: Boolean, default: false },
        reportCardRelease: { type: Boolean, default: false },
        examSchedule: { type: Boolean, default: false },
        parentMeetingReminder: { type: Boolean, default: false },

        salaryPayment: { type: Boolean, default: false },
        staffMeeting: { type: Boolean, default: false },

        unauthorizedLoginAttempt: { type: Boolean, default: false },
        accountSuspension: { type: Boolean, default: false },

        emailNotifications: { type: Boolean, default: true },
        pushNotifications: { type: Boolean, default: true }
    },
    // 📌 **Recruitment Needs**
    recruitment: {
        type: [RecruitmentSchema],
    },
    // 📅 Subscription Plan
    subscriptionPlan: {
        period: {
            frequency: { type: String, enum: ["monthly", "yearly", "term"], default: "monthly" },
            value: { type: Number, default: 1 },
            price: { type: Number, default: 0 }
        },
        renewDate: { type: Date },
        expiryDate: { type: Date },
        plan: { type: String, enum: ["basic", "pro", "custom"] },
        currentStudent: { type: Number, default: 0 },
    },

    // 📊 Reporting & Analytics
    reportSettings: {
        enabledReports: {
            type: [String],
        },
        reportTypes: {
            type: [{
                name: { type: String, },
                frequency: { type: String, },
                recipients: { type: [String] }
            }],
        },
        dataRetentionPeriod: {
            type: Number,
            default: 1,
        },
        enableDataVisualization: {
            type: Boolean,
            default: true,
        },
        preferredChartTypes: {
            type: [String],
            default: ["bar"],
        },
        enableAlerts: {
            type: Boolean,
            default: false,
        },
        alertThresholds: [{
            metric: { type: String, },
            condition: { type: String, },
            value: { type: Number },
        }],
        exportFormats: {
            type: [String],
            default: ["pdf", "csv", "xlsx"],
        },
        enableScheduling: {
            type: Boolean,
            default: false,
        },
        scheduledReportTime: {
            type: String,
        },
    },
    paymentSettings: {
        paymentMethods: {
            type: [PaymentMethodSchema],
            default: [
                { name: "Cash", enabled: true },
                { name: "Credit Card", enabled: false },
                { name: "Bank Transfer", enabled: false },
                { name: "Mobile Money", enabled: false },
            ],
        },
        paymentProcessors: {
            type: [PaymentProcessorSchema],
            default: [{ name: "Paystack", apiKey: "", secretKey: "", enabled: false }],
        },
        defaultCurrency: {
            type: String,
            default: "GHS",
        },
        acceptedCurrencies: {
            type: [String],
            default: ["GHS"],
        },
        partialPayments: {
            type: Boolean,
            default: false,
        },
    },

    // 🔐 Security Settings
    security: {
        loginRestrictions: { type: Boolean, default: false }, // Restrict logins from unrecognized devices?
        multiFactorAuth: { type: Boolean, default: false }, // Enable 2FA?
        passwordResetTokenExpiry: { type: Number, default: 30 }, // Token expiry time in minutes
    },
    globalTermAndSession: {
        termId: { type: Schema.Types.ObjectId, ref: "Term", default: null },
        sessionId: { type: Schema.Types.ObjectId, ref: "Session", default: null },
    },
    modules: {
        dashboard: {
            type: Boolean,
            default: true
        },
        systemConfig: {
            type: Boolean,
            default: true
        },
        classManagement: {
            type: Boolean,
            default: true
        },
        studentManagement: {
            type: Boolean,
            default: true
        },
        employeeManagement: {
            type: Boolean,
            default: true
        },
        manageAttendance: {
            type: Boolean,
            default: false
        },
        onlineLearning: {
            type: Boolean,
            default: false
        },
        examsManagement: {
            type: Boolean,
            default: false
        },
        inventory: {
            type: Boolean,
            default: false
        },
        hostelManagement: {
            type: Boolean,
            default: false
        },
        library: {
            type: Boolean,
            default: false
        },
        depositAndExpense: {
            type: Boolean,
            default: false
        },
        message: {
            type: Boolean,
            default: false
        },
        report: {
            type: Boolean,
            default: false
        },
        canteenManagement: {
            type: Boolean,
            default: false
        },
        transportManagement: {
            type: Boolean,
            default: false
        },
        feesManagement: {
            type: Boolean,
            default: false
        },
        hrManagement: {
            type: Boolean,
            default: false
        },
        healthManagement: {
            type: Boolean,
            default: false
        },
        history: {
            type: Boolean,
            default: false,
        },
        trash: {
            type: Boolean,
            default: false, 
        },
    },
    // ❌ Banning & Deletion
    banned: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "Employee", default: null },
    modifiedBy: { type: Schema.Types.ObjectId, ref: "Employee", default: null },
    mod_flag: { type: Boolean, default: false },
    del_flag: { type: Boolean, default: false },
    action_type: { type: String, enum: ["create", "update", "delete"], default: "create" },
}, {
    timestamps: true,
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

// 🗑 Auto-cleanup related data before school deletion
SchoolSchema.pre("findOneAndDelete", async function (next) {
    const schoolId = this.getQuery()._id; // Fixed from storeId to schoolId

    try {
        const collections = [
            { model: Account, filter: { schoolId } },
            { model: Mood, filter: { schoolId } },
        ];

        for (const { model, filter } of collections) {
            await model.deleteMany(filter);
        }

        next();
    } catch (error) {
        console.error("Error cleaning up related data:", error);
        next(error as CallbackError);
    }
});


type SchoolModel = Model<ISchool>;

const School: SchoolModel = models.School || model<ISchool>("School", SchoolSchema);

export default School;
