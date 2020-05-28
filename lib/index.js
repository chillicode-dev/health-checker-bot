// Vendor
const TelegramBot = require('node-telegram-bot-api');
// Internal
const env = require('./utils/get-dotenv')();

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(env.TELEGRAM_BOT_TOKEN, {
  polling: true,
  request: {
    // Proxy settings here
    proxy: env.HTTP_PROXY_ADDR,
  }
});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});