const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const options = {
  timestamps: true,
};

const CustomCommandSchema = new Schema(
  {
    guildId: {
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
    complex: {
      type: Boolean,
      required: true,
    },
    tools: [{
      type: String,
    }],
  }, options);

const CustomCommand = mongoose.model('CustomCommand', CustomCommandSchema);

module.exports = CustomCommand;
