const dotenv = require('dotenv');

/**
 * Tries to set env variables to `process.env` from `.env` file in the root of project.
 * @throws {Error} If `.env` file is not found
 * @return {DotenvParseOutput}
 */
module.exports = () => {
  const config = dotenv.config();

  if (config.error) {
    throw new Error(`".env" configuration file not found. Copy ".env.example" to ".env" file`);
  }

  return config.parsed;
};
