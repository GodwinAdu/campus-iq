import { model, Model, models, Schema } from "mongoose";


const BookSchema:Schema<IBook> = new Schema({
    schoolId:{
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    isbn: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    publicationYear: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear(),
    },
    copiesAvailable: {
        type: Number,
        default: 0,
        min: 0,
    },
    copiesIssued: {
        type: Number,
        default: 0,
        min: 0,
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
    }
}, {
    timestamps: true,
    versionKey: false,
    minimize: false,
});

type BookModel = Model<IBook>
// Create or retrieve the model
const Book: BookModel= models.Book || model<IBook>("Book", BookSchema);

export default Book;
