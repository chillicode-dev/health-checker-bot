const addHandler = require('./add');
const pingHandler = require('./ping');
const deleteHandler = require('./delete');
const listHandler = require('./list');
const startHandler = require('./start');
const statusHandler = require('./status');
const stopHandler = require('./stop');

module.exports = {
  addHandler,
  pingHandler,
  deleteHandler,
  listHandler,
  startHandler,
  statusHandler,
  stopHandler,
};
