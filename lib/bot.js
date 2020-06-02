const {URL} = require('url');
const TelegramBot = require('node-telegram-bot-api');

// TelegramBot constructor config
const botConfig = {
  polling: true,
  request: {},
};

// Set proxy if specified in .env
try {
  botConfig.request.proxy = new URL(process.env.HTTP_PROXY_ADDR);
  console.info(`[health-checker-bot] Used connection via proxy '${process.env.HTTP_PROXY_ADDR}'`);
} catch (err) {
  console.info('[health-checker-bot] No proxy address specified. Used default connection');
}

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, botConfig);

module.exports = bot;
