
import { Model, model, models, Schema } from "mongoose";


const CallSchema:Schema<ICall> = new Schema({
    schoolId:{
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    callType:{
        type: String,
        enum: ['incoming', 'outgoing'],
        required: true,
    },
    callPurpose:{
        type: String,
        required: true,
    },
    callerName: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    timeSlot:{
        type: String,
        required: true,
    },
    followDate:{
        type: Date,
        default:null,
    },
    createdBy:{
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
    modifiedBy:{
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null,
    },
    action_type:{
        type: String,
    }
},{
    timestamps:true,
    versionKey:false, // Removes the __v field
});


type CallModel = Model<ICall>;

const Call:CallModel = models.Call || model<ICall>("Call",CallSchema);

export default Call;