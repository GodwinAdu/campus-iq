import { models, Schema,model, Model } from "mongoose";

const TeacherSchema:Schema<ITeacher> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
    },
    role: {
        type: String,
        default: "teacher"
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    permanentAddress: {
        type: String,
    },
    currentAddress: {
        type: String,
        required: true
    },
    kin: {
        type: String,
        required: true
    },
    kinPhone: {
        type: String,
        required: true
    },
    kinRelationship: {
        type: String,
        required: true
    },
    idCardType: {
        type: String,
        required: true
    },
    idCard: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true
    },
    accountName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
    },
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: 'School',
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
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
    }
});

type TeacherModel = Model<ITeacher>

const Teacher:TeacherModel = models.Teacher || model<ITeacher>("Teacher", TeacherSchema);

export default Teacher;