import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const options = {
  timestamps: true,
};

export const ServerSchema = new Schema(
  {
    serverId: {
      type: String,
      required: true,
      unique: true,
    },
    admins: [{
      type: String,
      required: true,
    }],
    moderators: [{
      type: String,
    }],
    emotes: {
      type: Boolean,
      default: false,
    },
    bully: {
      type: Boolean,
      default: false,
    },
    love: {
      type: Boolean,
      default: false,
    },
    eightball: {
      type: Boolean,
      default: false,
    },
  }, options);

ServerSchema.statics.findByServerId = function findByServerId(serverId) {
  return this.findOne({ serverId });
};

export const Server = mongoose.model('Server', ServerSchema);
