
import { models, Schema, model } from "mongoose";

// {
//     id: "1",
//     name: "Scrambled Eggs",
//     description: "Fluffy scrambled eggs with toast",
//     date: new Date("2023-06-05"),
//     mealPlanId: "1",
//     allergens: ["eggs", "gluten"],
//     mealType: "breakfast",
//   },


const MealScheduleSchema = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        trim: true,
    },
    mealPlanId: {
        type: Schema.Types.ObjectId,
        ref: "MealPlan",
        required: true,
    },
    allergens: [{ type: String }],
    mealType: {
        type: String,
        enum: ["breakfast", "lunch", "dinner"],
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "Employee" },

    mod_flag: { type: Boolean, default: false },
    del_flag: { type: Boolean, default: false },

    modifiedBy: { type: Schema.Types.ObjectId, ref: "Employee" },
    deletedBy: { type: Schema.Types.ObjectId, ref: "Employee" },
    action_type: { type: String },
}, {
    timestamps: true,
    versionKey: false, // Removes version key.
});

const MealSchedule = models.MealSchedule || model("MealSchedule", MealScheduleSchema);

export default MealSchedule;