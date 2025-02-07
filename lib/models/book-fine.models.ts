import { Model, Schema, model, models, } from "mongoose";

const BookFineSchema:Schema<IBookFine> = new Schema({
    schoolId:{
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
        min: 0,  // Ensure the amount is not negative
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
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
    timestamps: true,
    versionKey: false,
    minimize: false,
});

type BookFineModel = Model<IBookFine>
// Create or retrieve the model
const BookFine:BookFineModel = models.BookFine || model<IBookFine>("BookFine", BookFineSchema);

export default BookFine;
