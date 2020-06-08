const NodeTelegramBotApi = require('node-telegram-bot-api');

/**
 * TelegramBot extends base 'node-telegram-bot-api' class with additional options.
 * @class TelegramBot
 * @extends NodeTelegramBotApi
 * @see https://github.com/yagop/node-telegram-bot-api/blob/master/src/telegram.js
 */
class TelegramBot extends NodeTelegramBotApi {
  /**
   * @constructor
   * @param {String} token Bot Token
   * @param {Object} [options]
   */
  constructor(token, options = {}) {
    super(token, options);
  }

  /**
   * Send text message with additional options.
   * @param  {Number|String} chatId Unique identifier for the message recipient
   * @param  {String} text Text of the message to be sent
   * @param  {Object} [options] Additional Telegram query options
   * @return {Promise}
   * @see https://core.telegram.org/bots/api#sendmessage
   */
  sendMessage(chatId, text, options = {}) {
    const baseOptions = {
      disable_web_page_preview: true,
    };

    return super.sendMessage(chatId, text, {...baseOptions, ...options});
  }
}

module.exports = TelegramBot;
