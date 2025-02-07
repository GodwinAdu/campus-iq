import { Model, model, models, Schema} from "mongoose";

const DepositSchema:Schema<IDeposit> = new Schema({
    schoolId:{
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
        index: true,
    },
    depositName: {
        type: String,
        required: true,
        trim: true,
    },
    depositAmount: {
        type: Number,
        required: true,
        min: 0,
        index: true,
    },
    depositDate: {
        type: Date,
        required: true,
        index: true,
    },
    reference: {
        type: String,
        trim: true,
        index: true,
    },
    payVia: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    attachmentUrl: {
        type: String,
        trim: true,
        index: true,
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
    timestamps: true,
    versionKey: false, // Remove the version key (__v)
    minimize: false, // Allow full document updates
});

type DepositModel = Model<IDeposit>

// Create or retrieve the model
const Deposit:DepositModel = models.Deposit || model<IDeposit>("Deposit", DepositSchema);

export default Deposit;
