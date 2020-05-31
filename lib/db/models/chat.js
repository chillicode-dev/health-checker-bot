const mongoose = require('mongoose');
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

const settingsSchema = new Schema({
  tick_interval: Number,
  status_message_interval: Number,
});

const chatSchema = new Schema({
  _id: Schema.Types.ObjectId,
  telegram_chat_id: {
    type: String,
    required: true,
  },
  projects: [projectSchema],
  users: [userSchema],
  settings: settingsSchema,
});

module.exports = mongoose.model('Chat', chatSchema);
