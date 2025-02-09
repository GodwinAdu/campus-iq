
import { models, Schema, model, Model } from "mongoose";


const TimetableSchema: Schema<ITimetable> = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    timetable: [{
        time: { type: String },
        monday: { subject: { type: String }, type: { type: String }, location: { type: String } },
        tuesday: { subject: { type: String }, type: { type: String }, location: { type: String } },
        wednesday: { subject: { type: String }, type: { type: String }, location: { type: String } },
        thursday: { subject: { type: String }, type: { type: String }, location: { type: String } },
        friday: { subject: { type: String }, type: { type: String }, location: { type: String } },
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null
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
    versionKey: false, // Removes the __v field
});

type TimetableModel = Model<ITimetable>

const Timetable: TimetableModel = models.Timetable || model<ITimetable>('Timetable', TimetableSchema);

export default Timetable;