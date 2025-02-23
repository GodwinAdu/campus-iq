
import { model, models, Schema } from "mongoose";

const MessageSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    default: null,
  },
  memberType: {
    type: String,
    enum: ["Student", "Employee", "Parent"],
    required: true,
  },
  memberId: {
    type: Schema.Types.ObjectId,
    refPath: 'memberType',
    required: true,
  },
  channelId: {
    type: Schema.Types.ObjectId,
    ref: 'Channel',
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  versionKey: false,
});

// Adding indexes
MessageSchema.index({ channelId: 1 });
MessageSchema.index({ memberId: 1 });


const Message = models.Message || model('Message', MessageSchema);

export default Message;


