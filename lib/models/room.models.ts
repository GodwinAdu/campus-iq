
import { models, Schema, model, Model } from "mongoose";

const RoomSchema: Schema<IRoom> = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: [true, "schoolId is required"],
    },
    name: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        default: 0
    },
    studentIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Student',
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
    versionKey: false,
    minimize: false,
});

type RoomModel = Model<IRoom>

const Room: RoomModel = models.Room || model<IRoom>("Room", RoomSchema);

export default Room;