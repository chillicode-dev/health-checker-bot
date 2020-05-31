const dotenv = require('dotenv');

/**
 * Tries to set env variables to `process.env` from `.env` file in the root of project.
 */
const config = dotenv.config();

/**
 * @throws {Error} If `.env` file is not found
 */
if (config.error) {
  throw new Error(`".env" configuration file not found. Copy ".env.example" to ".env" file`);
}
