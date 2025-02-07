import { Schema, model, models, Model } from "mongoose";


const DepartmentSchema:Schema<IDepartment> = new Schema({
    schoolId:{
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    name: {
        type: String,
        required: true, // Ensure the name is required
        trim: true,
        index: true,
    },
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee',
    }],
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
    }
}, {
    timestamps: true, // Automatically manages `createdAt` and `updatedAt`
    versionKey: false, // Removes the `__v` version key
    minimize: false, // Enables full document update
});

type DepartmentModel = Model<IDepartment>
// Create or retrieve the model
const Department:DepartmentModel = models.Department || model<IDepartment>("Department", DepartmentSchema);

export default Department;
