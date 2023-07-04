const winston   = require("winston");

const Logger    = winston.createLogger({
    level       : 'info',
    format      : winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `${timestamp} ${level} : ${message}`;
        })
    ),
    transports  : [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
});

const log = {
    info : (message) => {
        Logger.info(message)
    },
    error : (message) => {
        Logger.error(message)
    },
    warn : (message) => {
        Logger.warn(message)
    }
}

module.exports = log;