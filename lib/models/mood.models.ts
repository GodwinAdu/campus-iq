import { model, models, Schema } from "mongoose";


const MoodSchema = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    mood: {
        type: Number,
        required: true
    },
    energy: {
        type: Number,
        required: true
    },
    factors: [{
        type: String,
        required: true
    }],
    date: {
        type: Date,
        default: Date.now(),
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
    },
}, {
    timestamps: true,
    versionKey: false,
    minimize: false,
});


const Mood = models.Mood || model('Mood', MoodSchema);

export default Mood;