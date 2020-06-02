const mongoose = require('mongoose');
const ms = require('ms');

const {Schema} = mongoose;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  urls: [String],
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    min: 0,
    max: 2,
  },
});

const chatSchema = new Schema(
  {
    telegramChatId: {
      type: Number,
      required: true,
    },
    projects: [projectSchema],
    users: [userSchema],
    settings: {
      type: {
        tickInterval: {
          type: Number,
          required: true,
        },
        statusMessageInterval: {
          type: Number,
          required: true,
        },
      },
      required: true,
      default: {
        tickInterval: ms('1m'),
        statusMessageInterval: ms('4h'),
      },
    },
  },
  {
    autoCreate: true,
  },
);

module.exports = mongoose.model('Chat', chatSchema);
