// Set up environment variables
require('./utils/get-dotenv');
// Set up MongoDB connection
require('./db/connection');

const bot = require('./bot');

const {
  addHandler,
  pingHandler,
  deleteHandler,
  listHandler,
  startHandler,
  statusHandler,
  stopHandler,
} = require('./handlers/commands');

// Ping service commands
bot.onText(/^\/start/, startHandler);
bot.onText(/^\/stop/, stopHandler);
bot.onText(/^\/ping (\S+)/, pingHandler);
bot.onText(/^\/status/, statusHandler);

// Projects list commands
bot.onText(/^\/add (\S+) (\S+)/, addHandler);
bot.onText(/^\/delete (\S+)/, deleteHandler);
bot.onText(/^\/list/, listHandler);
