import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const options = {
  timestamps: true,
};

export const ServerSchema = new Schema([
  {
    serverId: {
      type: String,
      unique: true,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    emotes: {
      type: Boolean,
      required: true,
      default: true,
    },
    spamFilter: {
      type: Number,
      required: true,
      default: 25,
    },
    cmdSupport: {
      type: Boolean,
      required: true,
      default: true,
    },
    bully: {
      type: Boolean,
      required: true,
      default: false,
    },
    love: {
      type: Boolean,
      required: true,
      default: false,
    },
    eightball: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
], options);

export const Servers = mongoose.model('Servers', ServerSchema);
