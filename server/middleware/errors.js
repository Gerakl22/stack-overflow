const logger = require('../config/logger');


const exitHandler = (server) => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (server) => (error) => {
  logger.error(error);
  exitHandler(server);
};

module.exports = {
  unexpectedErrorHandler
};
