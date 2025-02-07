import { Schema, Model, model, models } from "mongoose";

const ExamHallSchema: Schema<IExamHall> = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true
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
    }
}, {
    timestamps: true,
    versionKey: false, // Removing version key.
    minimize: false, // Enabling full document update.
    strict: true, // Enabling strict mode.
});

// Define the model type
type ExamHallModel = Model<IExamHall>;

// Create or retrieve the ExamHall model
const ExamHall: ExamHallModel = models.ExamHall || model<IExamHall>("ExamHall", ExamHallSchema);

export default ExamHall;
