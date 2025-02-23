
import { Schema, Document, Types, models, model } from "mongoose";

interface IConversation extends Document {
  memberOne: Types.ObjectId;  // Reference to Member
  memberTwo: Types.ObjectId;  // Reference to Member
  directMessages: Types.ObjectId[];  // Array of DirectMessage IDs
}

const ConversationSchema = new Schema<IConversation>(
  {
    memberOne: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    memberTwo: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    directMessages: [
      {
        type: Schema.Types.ObjectId,
        ref: "DirectMessage",
      },
    ],
  },
  { timestamps: true }
);

// Adding unique index for memberOne and memberTwo to ensure unique conversation
ConversationSchema.index({ memberOne: 1, memberTwo: 1 }, { unique: true });

// Indexing memberTwo for optimized queries
ConversationSchema.index({ memberTwo: 1 });

const Conversation = models.Conversation || model<IConversation>("Conversation", ConversationSchema);
export default Conversation;
