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
    staffId: {
        type: String,
        required: true,
        unique: true
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
    classIds:[{
        type: Schema.Types.ObjectId,
        ref: 'Class',
        default:[]
    }],
    role: {
        type: String,
        required: true
    },
    joinedDate: {
        type: Date,
    },
    qualification: {
        type: String,
    },
    experience: {
        type: String,
    },
    totalExperience: {
        type: String,
    },
    idCardType: {
        type: String,
    },
    idCard: {
        type: String,
    },
    accountType: {
        type: String,
    },
    accountName: {
        type: String,
    },
    accountNumber: {
        type: String,
    },
    salaryId: {
        type: Schema.Types.ObjectId,
        ref: 'SalaryStructure',
        default: null
    },
    departmentId: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        default: null
    },
    manageClass: [{
        type: Schema.Types.ObjectId,
        ref: "Class",
        default: []
    }],
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
