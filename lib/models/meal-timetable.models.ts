
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


const MealTimetableSchema = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    mealScheduleId: {
        type: Schema.Types.ObjectId,
        ref: "MealTimetable",
        required: true,
    },
    calories: [{
        name: String,
        value: Number,
    }],
    feedbacks: [{
        userId: { type: Schema.Types.ObjectId, },
        userType: {
            type: String,
            enum: ["Student", "Parent", "Employee"],
        },
        comment: { type: String, required: true },
        rating: { type: Number, min: 1, max: 5 }, // Optional rating (1-5)
        createdAt: { type: Date, default: Date.now },
        default:[], //
    }],
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

const MealTimetable = models.MealTimetable || model("MealTimetable", MealTimetableSchema);

export default MealTimetable;