const mongoose = require('mongoose');

const gracefulShutdown = async msg => {
  await mongoose.connection.close();
  console.log(`Application gracefully shutted down. Reason: ${msg}`);
};

module.exports = {
  gracefulShutdown,
};
