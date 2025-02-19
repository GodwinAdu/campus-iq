
import { models, Schema,model } from "mongoose";

const MealPlanSchema = new Schema({
    schoolId:{
        type:Schema.Types.ObjectId,
        ref:"School",
        required:true
    },
    name:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    description:{
        type:String,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },

    mod_flag: { type: Boolean, default: false },
    del_flag: { type: Boolean, default: false },

    modifiedBy: { type: Schema.Types.ObjectId, ref: "Employee" },
    deletedBy: { type: Schema.Types.ObjectId, ref: "Employee" },
    action_type: { type: String },
},{
    timestamps: true,
    versionKey: false, // Removes version key.
});

const MealPlan = models.MealPlan || model("MealPlan",MealPlanSchema);

export default MealPlan;