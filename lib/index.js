// Set up environment variables
require('./utils/get-dotenv');
// Set up MongoDB connection
require('./db/connection');

const bot = require('./bot');

const {
  addHandler,
  checkHandler,
  deleteHandler,
  helpHandler,
  listHandler,
  settingsHandler,
  startHandler,
  statusHandler,
  stopHandler,
} = require('./handlers/commands');

// Default Telegram bot commands
bot.onText(/^\/help/, helpHandler);
bot.onText(/^\/settings/, settingsHandler);

// Ping service commands
bot.onText(/^\/start/, startHandler);
bot.onText(/^\/stop/, stopHandler);
bot.onText(/^\/check (\S+)/, checkHandler);
bot.onText(/^\/status/, statusHandler);

// Projects list commands
bot.onText(/^\/add (\S+) (\S+)/, addHandler);
bot.onText(/^\/delete (\S+)/, deleteHandler);
bot.onText(/^\/list/, listHandler);

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', msg => {
  // console.log(`Received your message. Msg: ${JSON.stringify(msg)}`);
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(msg.chat.id, `Received your message. Msg: ${JSON.stringify(msg)}`);
});
