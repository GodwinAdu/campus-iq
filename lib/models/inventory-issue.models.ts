import { Schema, model, models, Document, Model } from "mongoose";

const InventoryIssueSchema: Schema<IInventoryIssue> = new Schema({
    role: {
        type: String,
        required: true,
        enum: ["Student", "Employee", "Parent"]
    },
    saleToId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'role'  // Dynamic reference field
    },
    issueDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date
    },
    status: {
        type: String,
        default: "Issued"
    },
    issuedBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    },
    issueItems: [{
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "InventoryCategory"
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
            default: 1
        }

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
type InventoryIssueModel = Model<IInventoryIssue>;

// Create or retrieve the InventoryIssue model
const InventoryIssue: InventoryIssueModel = models.InventoryIssue || model<IInventoryIssue>("InventoryIssue", InventoryIssueSchema);

export default InventoryIssue;
