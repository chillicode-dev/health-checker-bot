// Vendor
const {URL} = require('url');
const TelegramBot = require('node-telegram-bot-api');
// Internal
const env = require('./utils/get-dotenv')();
// Commands
const addHandler = require('./commands/add');
const deleteHandler = require('./commands/delete');
const helpHandler = require('./commands/help');
const listHandler = require('./commands/list');
const settingsHandler = require('./commands/settings');
const startHandler = require('./commands/start');
const statusHandler = require('./commands/status');

const botConfig = {
  polling: true,
  request: {},
};

// Set proxy if specified in .env
try {
  botConfig.request.proxy = new URL(env.HTTP_PROXY_ADDR);
  console.info(`[INFO] Used connection via proxy '${env.HTTP_PROXY_ADDR}'.`);
} catch (err) {
  console.info('[INFO] No proxy address specified. Used default connection.');
}

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(env.TELEGRAM_BOT_TOKEN, botConfig);

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
