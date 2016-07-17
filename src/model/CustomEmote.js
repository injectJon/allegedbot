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
    url: {
      type: String,
      required: true,
    },
  }, options);

CustomEmoteSchema.statics.findByCode = function findByServerId(serverId, code) {
  return this.findOne({ serverId, code });
};

CustomEmoteSchema.statics.findAllByCode = function findAllByCode(serverId, codes) {
  const query = {
    serverId,
    code: {
      $in: codes,
    },
  };

  return this.find(query);
};

export const CustomEmote = mongoose.model('Emote', CustomEmoteSchema);
