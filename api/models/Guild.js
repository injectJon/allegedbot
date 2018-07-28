const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const options = {
  timestamps: true,
};

const GuildSchema = new Schema(
  {
    guildId: {
      type: String,
      required: true,
      unique: true,
    },
    adminRoles: [{
      type: Object,
      required: true,
    }],
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
    active: {
      type: Boolean,
      default: true,
    }
  }, options);

const Guild = mongoose.model('Guild', GuildSchema);

module.exports = Guild
