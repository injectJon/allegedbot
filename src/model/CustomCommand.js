import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const options = {
  timestamps: true,
};

export const CustomCommandSchema = new Schema(
  {
    serverId: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
  }, options);

CustomCommandSchema.statics.findByCode = function findByServerId(serverId, code) {
  return this.findOne({ serverId, code });
};

export const CustomCommand = mongoose.model('CustomCommand', CustomCommandSchema);
