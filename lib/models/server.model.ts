import { model, models, Schema } from "mongoose";

const serverSchema = new Schema({
    schoolId:{
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true,
    },
    name: { type: String, required: true }, // Ensure name is required
    imageUrl: { type: String, required: true }, // Ensure imageUrl is required
    invitedCode: {
        type: String,
        unique: true,
        required: true, // Ensure invitedCode is required
        index: true // Index for faster lookups
    },
    ownerType: {
        type: String,
        enum: ["Student", "Employee"],
        required: true,
        index: true // Index for performance
    },
    owner: {
        type: Schema.Types.ObjectId,
        refPath: "ownerType",
        required: true,
        index: true // Index to speed up queries
    },
    members: [{
        type: Schema.Types.ObjectId,
        refPath: "memberType",
        index: true // Index to optimize queries
    }],
    channels: [{
        type: Schema.Types.ObjectId,
        ref: "Channel",
        index: true // Index for efficient joins
    }]
}, {
    timestamps: true
});

const Server = models.Server || model("Server", serverSchema);

export default Server;
