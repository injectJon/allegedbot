import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const options = {
  timestamps: true,
};

export const CommandSchema = new Schema(
  {
    serverId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['simple'],
      default: 'simple',
    },
    access: {
      type: String,
      required: true,
      default: 'admin',
      enum: ['admin', 'member', 'everyone'],
    },
    createdBy: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
  }, options);

export const Commands = mongoose.model('Commands', CommandSchema);
