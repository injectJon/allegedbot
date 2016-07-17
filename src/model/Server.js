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
    config: {
      type: Boolean,
      default: true,
    },
    emotes: {
      type: Boolean,
      default: false,
    },
    bully: {
      type: Boolean,
      default: false,
    },
    bullyData: {  // in the future, this will link to a custom bully message
      type: Schema.Types.ObjectId,
    },
    love: {
      type: Boolean,
      default: false,
    },
    loveData: {  // in the future, this will link to a custom love message
      type: Schema.Types.ObjectId,
    },
    eightball: {
      type: Boolean,
      default: false,
    },
    eightballData: {  // in the future, this will link to custom 8ball messages
      type: Schema.Types.ObjectId,
    },
  }, options);

ServerSchema.statics.findByServerId = function findByServerId(serverId) {
  return this.findOne({ serverId });
};

export const Server = mongoose.model('Server', ServerSchema);
