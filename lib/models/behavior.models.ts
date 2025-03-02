import { model, models, Schema } from "mongoose";


const BehaviorSchema = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    behaviorType: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    severity: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
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
});


const Behavior = models.Behavior || model("Behavior", BehaviorSchema);

export default Behavior;