const config = require('./config');
const winston = require('winston');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, {message: info.stack});
  }
  return info;
});

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp({format: 'HH:mm:ss DD-MM-YYYY'}),
    enumerateErrorFormat(),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({timestamp, level, message}) => `${timestamp} ${level} : ${message}`)
  ),
  transports: [
      new winston.transports.Console({
        timestamp: [true],
        stderrLevels: ['error']
      })
  ]
})

module.exports = logger;
