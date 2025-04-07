
import { models, Schema, model } from "mongoose";


const VisitorSchema = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true
    },
    visitorName: {
        type: String,
        required: true
    },
    visitorMobile: {
        type: String,
        required: true
    },
    visitorEmail: {
        type: String,
    },
    visitorAddress: {
        type: String,
    },
    visitorType: {
        type: String,
        enum: ['parent', 'teacher', 'student', 'staff', 'visitor'],
        required: true
    },
    visitorPurpose: {
        type: String,
        required: true
    },
    visitorInTime: {
        type: String,
        required: true
    },
    visitorOutTime: {
        type: String,
    },
    visitorDetails: {
        type: String,
    },
    numberOfVisitors:{
        type: Number,
        required: true
    },
    attachmentFile: {
        type: String
    },
    idCard:{
        type: String
    },
    confidential: {
        type: Boolean,
        default: false
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
    action_type: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
});


const Visitor = models.Visitor || model("Visitor", VisitorSchema);

export default Visitor