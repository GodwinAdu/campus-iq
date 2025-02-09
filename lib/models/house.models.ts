import { Schema, model, models, Model } from "mongoose";

const HouseSchema: Schema<IHouse> = new Schema({
    schoolId:{
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    roomIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Room',
        default:[]
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
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
        ref: "Employee",
        default: null
    },
    deletedBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null
    },
    action_type: {
        type: String,
        default: null
    }
}, {
    timestamps: true,
    versionKey: false, // Removing version key.
    minimize: false, // Enabling full document update.
});

// Define the model type
type HouseModel = Model<IHouse>;

// Create or retrieve the House model
const House: HouseModel = models.House || model<IHouse>("House", HouseSchema);

export default House;
