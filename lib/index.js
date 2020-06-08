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
bot.onText(/^\/ping\s?(\S+)?/, pingHandler);
bot.onText(/^\/status/, statusHandler);

// Projects list commands
bot.onText(/^\/add\s?(\S+)?\s?(\S+)?/, addHandler);
bot.onText(/^\/delete\s?(\S+)?/, deleteHandler);
bot.onText(/^\/list/, listHandler);
