module.exports = {
  failedReport: failedResponses => {
    let msg = `🔥 @${process.env.TELEGRAM_BOT_ROOT_USER}, мы все уронили! 🔥\n\n Следующие адреса не отвечают на запросы:\n`;

    for (const res of failedResponses) {
      msg += ` - ${res.url} (${res.status}: ${res.message})\n`;
    }

    return msg;
  },
};
