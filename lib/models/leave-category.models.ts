import { model, models, Schema } from "mongoose";


const LeaveCategorySchema:Schema<ILeaveCategory>= new Schema({
    schoolId:{
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    name:{
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
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
        ref: 'Employee',
        default: null
    },
    deletedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        default: null
    },
    action_type: {
        type: String,
        enum: ['created', 'updated']
    }

},{
    timestamps: true,
    versionKey: false, // Removing version key.
    minimize: false, // Enabling full document update.
});

const LeaveCategory = models.LeaveCategory || model<ILeaveCategory>("LeaveCategory",LeaveCategorySchema);

export default LeaveCategory;