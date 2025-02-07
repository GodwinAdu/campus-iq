import { Schema, model, models, Document, Model } from "mongoose";

const InventoryCategorySchema: Schema<IInventoryCategory> = new Schema({
    name: {
        type: String,
        required: true,
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'InventoryProduct',
        }
    ],
    storeId: {
        type: Schema.Types.ObjectId,
        ref: "InventoryStore"
    },
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
type InventoryCategoryModel = Model<IInventoryCategory>;

// Create or retrieve the InventoryCategory model
const InventoryCategory: InventoryCategoryModel = models.InventoryCategory || model<IInventoryCategory>("InventoryCategory", InventoryCategorySchema);

export default InventoryCategory;
