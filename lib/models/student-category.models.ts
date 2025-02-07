import { Schema, model, models, Model } from "mongoose";

// Define the StudentCategory schema
const StudentCategorySchema: Schema<IStudentCategory> = new Schema({
    schoolId:{
        type:Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student',
        default:[]
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
    versionKey: false, // Removing version key.
    minimize: false, // Enabling full document update.
});

// Define the model type
type StudentCategoryModel = Model<IStudentCategory>;

// Create or retrieve the StudentCategory model
const StudentCategory: StudentCategoryModel = models.StudentCategory || model<IStudentCategory>("StudentCategory", StudentCategorySchema);

export default StudentCategory;
