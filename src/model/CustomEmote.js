import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const options = {
  timestamps: true,
};

export const CustomEmoteSchema = new Schema(
  {
    serverId: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  }, options);

export const CustomEmote = mongoose.model('Emote', CustomEmoteSchema);
