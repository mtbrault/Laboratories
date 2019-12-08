const pino = require('pino');
const CONFIG = require('./config');

const logger = pino({
  level: CONFIG.LOG_LEVEL,
  prettyPrint: CONFIG.LOG_PRETTY_PRINT
});

module.exports = logger;
