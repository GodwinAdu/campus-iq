import { model, models, Document, Schema } from "mongoose";

// Define a TypeScript enum for ChannelType
export enum ChannelType {
  TEXT = 'TEXT',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO'
}

// Define the Channel interface that extends the Mongoose Document
interface IChannel extends Document {
  name: string;
  type: ChannelType;
  userType: "Student" | "Employee";
  userId: Schema.Types.ObjectId; // Change to ObjectId
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the channel schema
const channelSchema = new Schema<IChannel>({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: Object.values(ChannelType),
    default: ChannelType.TEXT,
  },
  userType: {
    type: String,
    enum: ["Student", "Employee"],
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId, // Change from String to ObjectId
    refPath: "userType", // Reference the User model
    required: true,
    index: true,
  },
}, {
  timestamps: true,
  versionKey: false,
  autoIndex: true,
});

// Create the model
const Channel = models?.Channel || model<IChannel>('Channel', channelSchema);

export default Channel;

