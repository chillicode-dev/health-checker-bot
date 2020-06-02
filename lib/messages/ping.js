module.exports = {
  failedReport: failedResponses => {
    let msg = `🔥 @${process.env.TELEGRAM_BOT_ROOT_USER}, мы все уронили! 🔥\n\n Следующие адреса не отвечают на запросы:\n\n`;

    for (const res of failedResponses) {
      msg += `⚠\n`;
      msg += `[URL] ${res.url}\n`;
      msg += `[STATUS] ${res.status}\n`;
      msg += `[MESSAGE] ${res.message}\n\n`;
    }

    return msg;
  },
};
