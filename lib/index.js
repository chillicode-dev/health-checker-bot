const bot = require('./bot');

const addHandler = require('./commands/add');
const deleteHandler = require('./commands/delete');
const helpHandler = require('./commands/help');
const listHandler = require('./commands/list');
const settingsHandler = require('./commands/settings');
const startHandler = require('./commands/start');
const statusHandler = require('./commands/status');

// Default Telegram bot commands
bot.onText(/\/start (.+)/, startHandler);
bot.onText(/\/help (.+)/, helpHandler);
bot.onText(/\/settings (.+)/, settingsHandler);

// Bot specific commands
bot.onText(/\/add (.+)/, addHandler);
bot.onText(/\/delete (.+)/, deleteHandler);
bot.onText(/\/status (.+)/, statusHandler);
bot.onText(/\/list (.+)/, listHandler);

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', msg => {
  const chatId = msg.chat.id;

  console.log(`Received your message. Msg: ${JSON.stringify(msg)}`);

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, `Received your message. Msg: ${JSON.stringify(msg)}`);
});
