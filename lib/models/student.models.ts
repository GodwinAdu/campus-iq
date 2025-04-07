import { Schema, model, models, Model } from "mongoose";
import School from "./school.models";

type StudentModel = Model<IStudent>;

const StudentSchema: Schema<IStudent> = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    studentType: {
        type: Schema.Types.ObjectId,
        ref: "StudentCategory",
        default: null
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    imgUrl: {
        type: String,
        default: "",
    },
    dob: {
        type: Date,
        required: true,
    },
    role: {
        type: String,
        default: "student",
    },
    gender: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    addresses: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        zipCode: {
            type: String,
        },
        country: {
            type: String,
        },
    },
    emergencyContact: {
        type: Object,
    },
    currentAddress: {
        type: String,
    },
    permanentAddress: {
        type: String,
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: "Class",
        default: null,
    },
    studentID: {
        type: String,
        required: true,
        unique: true,
    },
    roomId: {
        type: Schema.Types.ObjectId,
        ref: "Room",
        default: null,
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: "Parent",
        default: null,
    },
    examResult: {
        type: Boolean,
        default: false
    },
    enrollmentDate: {
        type: Date,
    },
    previousSchool: {
        type: String,
    },
    medicalHistory: {
        medicalConditions: [{
            type: String,
        }],
        medications: [{
            type: String
        }],
        allergies: [{
            type: String
        }],
        immunizations: [{
            vaccineName: {
                type: String,
            },
            dateAdministered: {
                type: Date,
            },
            administeredBy: {
                type: String,
            }
        }],
        medicalNotes: {
            type: String,
        }
    },
    canteen: {
        planId: {
            type: Schema.Types.ObjectId,
            ref: "MealPlan",
            default: null,
        }
    },
    account: {
        balance: {
            type: Number,
            default: 0,
        },
    },
    studentStatus: {
        type: String,
        default: "Active",
    },
    permissions: {
        createCommunity: {
            type: Boolean,
            default: false
        },
        accessAI: {
            type: Boolean,
            default: false
        }
    },
    resetPasswordToken: {
        type: String,
        default: null,
    },
    resetPasswordExpiry: {
        type: Date,
        default: null,
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
    },
}, {
    timestamps: true,
    versionKey: false,
    minimize: false,
});

// Middleware to increment currentStudent when a new student is added
StudentSchema.post("save", async function (doc) {
    await School.findByIdAndUpdate(doc.schoolId, { $inc: { "subscriptionPlan.currentStudent": 1 } });
});

// Middleware to decrement currentStudent when a student is removed
StudentSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await School.findByIdAndUpdate(doc.schoolId, { $inc: { "subscriptionPlan.currentStudent": -1 } });
    }
});

// Ensure student count is accurate
StudentSchema.statics.updateStudentCount = async function (schoolId) {
    const count = await this.countDocuments({ schoolId });
    await School.findByIdAndUpdate(schoolId, { "subscriptionPlan.currentStudent": count });
};

const Student: StudentModel = models.Student || model<IStudent>("Student", StudentSchema);

export default Student;
