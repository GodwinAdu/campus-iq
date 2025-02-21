import { Schema, model, models } from "mongoose";

const MealPaymentSchema = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true
    },
    payerId: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    amount: { type: Number, required: true }, // Total amount paid
    paymentMethod: {
        type: String,
        enum: ["Cash", "Mobile Money", "Card", "Bank Transfer"],
        required: true
    },
    transactionId: { type: String, unique: true }, // For tracking digital payments
    status: {
        type: String,
        enum: ["Pending", "Completed", "Failed", "Refunded"],
        default: "Pending"
    },
    createdAt: { type: Date, default: Date.now },

    createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },
    mod_flag: { type: Boolean, default: false },
    del_flag: { type: Boolean, default: false },

    modifiedBy: { type: Schema.Types.ObjectId, ref: "Employee" },
    deletedBy: { type: Schema.Types.ObjectId, ref: "Employee" },
    action_type: { type: String },
}, {
    timestamps: true,
    versionKey: false,
});

const MealPayment = models.MealPayment || model("MealPayment", MealPaymentSchema);

export default MealPayment;
