import { models, Schema,model, Model } from "mongoose";


const AssignmentSchema:Schema<IAssignment> = new Schema({
    schoolId:{
        type:Schema.Types.ObjectId,
        ref:"School",
        required:true
    },
    classId:{
        type:Schema.Types.ObjectId,
        ref:"Class",
        required:true
    },
    sessionId:{
        type:Schema.Types.ObjectId,
        ref:"Session",
        required:true
    },
    subjectId:{
        type:Schema.Types.ObjectId,
        ref:"Subject",
        required:true
    },
    termId:{
        type:Schema.Types.ObjectId,
        ref:"Term",
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    dateOfSubmission:{
        type:Date,
        required:true,
    },
    publishLater:{
        type:Boolean,
        default:false
    },
    scheduleDate:{
        type:Date
    },
    homework:{
        type:String,
    },
    attachmentFile:{
        type:String
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
    }
}, {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
    versionKey: false, // Remove the version key to prevent versioning conflicts
    minimize: false, // Ensure full document updates
});

type AssignmentModel = Model<IAssignment>


const Assignment:AssignmentModel = models.Assignment || model<IAssignment>("Assignment", AssignmentSchema);

export default Assignment