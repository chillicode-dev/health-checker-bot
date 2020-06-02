const mongoose = require('mongoose');
const {gracefulShutdown} = require('../utils/system');

mongoose.connect(process.env.MONGODB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.info('[health-checker-bot] Mongoose successfully connected to MongoDB');
});

mongoose.connection.on('error', err => {
  console.error('[health-checker-bot] Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('[health-checker-bot] Mongoose disconnected');
});

process.once('SIGUSR2', async () => {
  await gracefulShutdown('SIGUSR2 invocation');
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', async () => {
  await gracefulShutdown('SIGINT invocation');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await gracefulShutdown('SIGTERM invocation');
  process.exit(0);
});
