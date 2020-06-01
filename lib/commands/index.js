const addHandler = require('./add');
const checkHandler = require('./check');
const deleteHandler = require('./delete');
const helpHandler = require('./help');
const listHandler = require('./list');
const settingsHandler = require('./settings');
const startHandler = require('./start');
const statusHandler = require('./status');

module.exports = {
  addHandler,
  checkHandler,
  deleteHandler,
  helpHandler,
  listHandler,
  settingsHandler,
  startHandler,
  statusHandler,
};
