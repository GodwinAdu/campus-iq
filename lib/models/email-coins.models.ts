import { Model, Schema, model, models } from "mongoose";

const EmailCoinSchema:Schema<IEmailCoin> = new Schema({
    schoolId:{
        type:Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    coins: {
        type: Number,
        default: 0,
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
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    versionKey: false, // Disable the __v version key
    minimize: false, // Store the full document even if some fields are undefined
});

type EmailCoinModel = Model<IEmailCoin>
// Create or retrieve the model
const EmailCoin:EmailCoinModel = models.EmailCoin || model<IEmailCoin>("EmailCoin", EmailCoinSchema);

export default EmailCoin;
