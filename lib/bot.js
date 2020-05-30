const {URL} = require('url');
const TelegramBot = require('node-telegram-bot-api');

const env = require('./utils/get-dotenv')();

// TelegramBot constructor config
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
module.exports = new TelegramBot(env.TELEGRAM_BOT_TOKEN, botConfig);