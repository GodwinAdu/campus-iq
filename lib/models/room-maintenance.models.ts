
import { Model, Schema, model, models } from "mongoose";


const RoomMaintenanceSchema: Schema<IRoomMaintenance> = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true,
    },
    roomId: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    issue: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'in progress', 'resolved'],
        default: 'pending',
    },
    createdBy: {
        type: String,
        required: true,
    },
    modifiedBy: {
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
    action_type: {
        type: String,
        enum: ["create", "update", "delete"],
        default: "create",
    },
}, {
    timestamps: true,
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

type MaintenanceModel = Model<IRoomMaintenance>

const RoomMaintenance: MaintenanceModel = models.RoomMaintenance || model<IRoomMaintenance>("RoomMaintenance", RoomMaintenanceSchema);

export default RoomMaintenance;