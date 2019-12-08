const APP_PORT_DEFAULT = 8080;
const DB_URL_DEFAULT = 'mongodb://localhost:27017';
const LOG_LEVEL_DEFAULT = 'info';
const LOG_PRETTY_PRINT_DEFAULT = false;

module.exports = Object.freeze({
  APP_PORT: process.env.APP_PORT || APP_PORT_DEFAULT,
  DB_URL_DEFAULT: process.env.DB_URL_DEFAULT || DB_URL_DEFAULT,
  LOG_LEVEL: process.env.LOG_LEVEL || LOG_LEVEL_DEFAULT,
  LOG_PRETTY_PRINT_DEFAULT:
    process.env.LOG_PRETTY_PRINT_DEFAULT || LOG_PRETTY_PRINT_DEFAULT
});
