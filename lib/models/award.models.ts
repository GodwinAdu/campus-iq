import { Model, model, models, Schema } from "mongoose";

const AwardSchema:Schema<IAward> = new Schema({
    schoolId:{
        type:Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["Student", "Employee"]
    },
    awardToId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'role'  // Dynamic reference field
    },
    awardName: {
        type: String,
        required: true
    },
    giftItem: {
        type: String,
        required: true
    },
    cashPrice: {
        type: Number,
        required: true,
        default: 0
    },
    awardReason: {
        type: String,
        required: true
    },
    givenDate: {
        type: Date,
        required: true
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
}, {
    timestamps: true,
    versionKey: false,
    minimize: false,
});

type AwardModel = Model<IAward>

const Award:AwardModel = models.Award || model<IAward>("Award",AwardSchema);

export default Award;