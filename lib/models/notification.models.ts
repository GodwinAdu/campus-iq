import { Schema, models, model, Model } from 'mongoose';

const NotificationSchema = new Schema<INotification>({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    userType: {
        type: String,
        enum: ["Employee", "Student", "Parent"],
        default: null,
    },
    userId: { type: String, refPath: "userType", default:null, index: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["info", "success", "error", "warning"], required: true },
    read: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
},
    { timestamps: true }
);

type NotificationModel = Model<INotification>

const Notification :NotificationModel =  models.Notification || model<INotification>("Notification", NotificationSchema);

export default Notification;