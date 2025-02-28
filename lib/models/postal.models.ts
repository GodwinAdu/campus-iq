import { model, Model, models, Schema } from "mongoose";


const PostalSchema:Schema<IPostal> = new Schema({
    schoolId:{
        type:Schema.Types.ObjectId,
        ref:"School",
        required:true
    },
    sender:{
        type:String,
        required:true
    },
    receiver:{
        type:String,
        required:true
    },
    postalType:{
        type:String,
        enum:['dispatch', 'receive'],
    },
    referenceNo:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    postalDate:{
        type:Date,
        default:Date.now()
    },
    postalDetails:{
        type:String,
    },
    attachmentFile:{
        type:String
    },
    confidential:{
        type:Boolean,
        default:false
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
    action_type:{
        type: String,
    }
},{
    timestamps:true,
    versionKey:false
});

type PostalModel = Model<IPostal>;

const Postal:PostalModel = models.Postal || model<IPostal>("Postal",PostalSchema);

export default Postal;