const config = require('./config/config');
const { databaseMongoService } = require('./services/index');
const { httpClient } = require('./app');
const logger = require('./config/logger');
const { unexpectedErrorHandler } = require('./middleware/errors');
let server;

databaseMongoService.connect()
  .then(() => {
    server = httpClient.listen(config.port, () => logger.info(`Listening port ${config.port}`));
  });


process.on('uncaughtException', unexpectedErrorHandler(server));
process.on('unhandledRejection', unexpectedErrorHandler(server));
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
