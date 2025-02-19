import { Schema, model, models, Model } from "mongoose";

const ParentSchema = new Schema<IParent>(
    {
        schoolId: { type: Schema.Types.ObjectId, ref: "School", required: true },

        personalInfo: {
            username: { type: String, required: true, minlength: 3 },
            fullName: { type: String, required: true, minlength: 3 },
            imgUrl: { type: String },
            dob: { type: Date },
            email: { type: String, required: true, unique: true },
            gender: { type: String, enum: ["Male", "Female", "Other"] },
            phone: { type: String },
            password: { type: String, required: true, minlength: 6 },
            religion: { type: String },
            maritalStatus: {
                type: String,
                enum: ["Single", "Married", "Divorced", "Widowed"],
            },
            addresses: {
                street: { type: String },
                city: { type: String },
                state: { type: String },
                zipCode: { type: String },
                country: { type: String },
            },
            emergencyContact: { type: Schema.Types.Mixed },
            currentAddress: { type: String },
            permanentAddress: { type: String },
        },

        children: [{ type: Schema.Types.ObjectId, ref: "Student", default: null }], // Parent can have multiple students

        occupation: { type: String },
        workplace: { type: String },

        identification: {
            idCardType: { type: String },
            idCard: { type: String },
            socialSecurityNumber: { type: String },
            taxIdentificationNumber: { type: String },
        },

        createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },

        mod_flag: { type: Boolean, default: false },
        del_flag: { type: Boolean, default: false },

        modifiedBy: { type: Schema.Types.ObjectId, ref: "Employee" },
        deletedBy: { type: Schema.Types.ObjectId, ref: "Employee" },
        action_type: { type: String },
    },
    { timestamps: true }
);


// Define the model type
type ParentModel = Model<IParent>;

// Create or retrieve the Parent model
const Parent: ParentModel = models.Parent || model<IParent>("Parent", ParentSchema);

export default Parent;
