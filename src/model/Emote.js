import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const options = {
  timestamps: true,
};

export const EmoteSchema = new Schema(
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

export const Emote = mongoose.model('Emote', EmoteSchema);
