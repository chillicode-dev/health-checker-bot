require('./lib/utils/get-dotenv');

module.exports = {
  apps: [
    {
      name: process.env.PM2_PROCESS_NAME,
      script: 'lib/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
