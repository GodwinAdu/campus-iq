import { Schema, model, models, Document, Model } from "mongoose";

// Define the SchoolDetail schema
const SchoolDetailSchema: Schema<ISchoolDetail> = new Schema({
    heroText: {
        type: String,
    },
    aboutUsText: {
        type: String,
    },
    announcementText: {
        type: String,
    },
    logoUrl: {
        type: String,
    },
    heroUrl: {
        type: String,
    },
    aboutUrl: {
        type: String,
    },
    announcementUrl: {
        type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null
    },
    mod_flag: {
        type: Boolean,
        default: false
    },
    delete_flag: {
        type: Boolean,
        default: false
    },
    modifyBy: {
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
type SchoolDetailModel = Model<ISchoolDetail>;

// Create or retrieve the SchoolDetail model
const SchoolDetail: SchoolDetailModel = models.SchoolDetail || model<ISchoolDetail>("SchoolDetail", SchoolDetailSchema);

export default SchoolDetail;
