const HTTP_CODE = require('http-status-codes');

const logger = require('./logger');

const jsonGuard = async (err, req, res, next) => {
  if (err.status === HTTP_CODE.BAD_REQUEST) {
    logger.fatal(err, 'BAD JSON');
    return res.status(HTTP_CODE.BAD_REQUEST).send('BAD JSON');
  }

  return next(err);
};

module.exports.jsonGuard = jsonGuard;
