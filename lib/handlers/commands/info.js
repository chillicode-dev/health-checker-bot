const bot = require('../../bot');
const {version, license, repository} = require('../../../package');

module.exports = async msg => {
  let infoMessage = 'ℹ️ Информация о боте:\n\n';
  infoMessage += `[Лицензия] ${license}\n`;
  infoMessage += `[Версия] ${version}\n`;
  infoMessage += `[Репозиторий] ${repository}\n`;

  return await bot.sendMessage(msg.chat.id, infoMessage);
};
