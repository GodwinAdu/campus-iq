import { Schema, models, model, Model, } from "mongoose";

const EmployeeSchema: Schema<IEmployee> = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    imgUrl: {
        type: String,
        default: ""
    },
    dob: {
        type: Date,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    religion: {
        type: String,
    },
    maritalStatus: {
        type: String,
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
    role: {
        type: String,
        required: true
    },
    identification: {
        idCardType: {
            type: String,
        },
        idCard: {
            type: String,
        },
        socialSecurityNumber: { type: String },
        taxIdentificationNumber: { type: String },
        workPermit: { type: String },
        bankDetails: {
            accountName: { type: String },
            accountNumber: { type: String },
            bankName: { type: String },
        },
    },
    employment: {
        employeeID: { type: String, required: true, unique: true },
        dateOfJoining: { type: Date, required: true },
        jobTitle: { type: String },
        departmentId: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
            default: null
        },
        classIds: [{
            type: Schema.Types.ObjectId,
            ref: 'Class',
            default: []
        }],
        workSchedule: { type: String, enum: ["Full-time", "Part-time"] },
    },
    professionalDetails: {
        highestDegree: {
            degree: { type: String },
            institution: { type: String },
            year: { type: Number },
        },
        certifications: [{ type: String }],
        specialization: [{ type: String }],
        experienceYears: { type: Number },
        previousEmployment: [
            {
                school: { type: String },
                position: { type: String },
                duration: { type: String }, // e.g., "2018-2022"
            },
        ],
        references: [
            {
                name: { type: String },
                contact: { type: String },
                relationship: { type: String },
            },
        ],
        backgroundCheck: {
            criminalRecord: { type: Boolean, default: false },
            details: { type: String },
        },
        additionalInfo: {
            extracurricularActivities: [{ type: String }],
            specialSkills: [{ type: String }],
            notes: { type: String },
        },
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
    salaryId: {
        type: Schema.Types.ObjectId,
        ref: 'SalaryStructure',
        default: null
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
        default: null
    },
    mod_flag: {
        type: Boolean,
        default: false
    },
    del_flag: {
        type: Boolean,
        default: false
    },
    modifiedBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null
    },
    deletedBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null
    },
    action_type: {
        type: String,
        default: null
    }
}, {
    timestamps: true,
    versionKey: false, // Removing version key.
    minimize: false, // Enabling full document update.
});

type EmployeeModel = Model<IEmployee>

// Create or retrieve the model
const Employee: EmployeeModel = models.Employee || model<IEmployee>("Employee", EmployeeSchema);

export default Employee;
