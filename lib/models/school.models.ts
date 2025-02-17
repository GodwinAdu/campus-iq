import { Model, model, models, Schema } from "mongoose";

const SchoolSchema: Schema<ISchool> = new Schema({
    owner:{
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    schoolCode: {
        type: String,
        unique: true,
        required: true,
    },
    schoolLogo: {
        type: String,
        default: '',
    },
    establishedYear: {
        type: Number,
        default: ''
    },
    affiliation: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        enum: ["primary", "secondary", "college", "university"],
    },
    type: {
        type: String,
        enum: ["public", "private", "charter"],
        required: true,
    },
    schoolName: {
        type: String,
        required: true,
    },
    motto: {
        type: String,
        default: '',
    },
    schoolPhone: {
        type: String,
        default: '',
    },
    schoolEmail: {
        type: String,
        unique: true,
    },
    website: {
        type: String,
        default: '',
    },
    addresses: {
        schoolAddress: {
            type: String,
            default: '',
        },
        schoolCity: {
            type: String,
            default: '',
        },
        schoolState: {
            type: String,
            default: '',
        },
        schoolZipcode: {
            type: String,
            default: '',
        },
        schoolCountry: {
            type: String,
            default: '',
        },
    },
    notifications: {
        overdueSubscriptionAlert: { type: Boolean, default: true },
        emailNotifications: { type: Boolean, default: true },
    },
    subscriptionPlan: {
        period: {
            frequency: {
                type: String,
                enum: ["monthly", "yearly", "term"],
                default: 'monthly',
            },
            Value:{
                type: Number,
                default: 1
            },
            price: {
                type: Number,
                default: 0
            }
        },
        renewDate: {
            type: Date,
        },
        expiryDate: {
            type: Date,
        },
        plan: {
            type: String,
            enum: ['basic', 'pro', 'custom',],
        },
        currentStudent: {
            type: Number,
            default: 0,
        }
    },
    banned: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null,
    },
    modifiedBy: {
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
    action_type: {
        type: String,
        enum: ["create", "update", "delete"],
        default: "create",
    },
}, {
    timestamps: true,
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

type SchoolModel = Model<ISchool>

const School: SchoolModel = models.School || model<ISchool>("School", SchoolSchema);

export default School;
