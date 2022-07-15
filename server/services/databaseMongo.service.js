const mongoose = require('mongoose');
const logger = require('../config/logger');
const config = require('../config/config');

const connect = async () => {
  logger.info(`Connecting to ${config.env} env database..`);

  await mongoose.connect(config.mongoose.url, {
    useNewUrlParser: config.mongoose.options.useNewUrlParser,
    useUnifiedTopology: config.mongoose.options.useUnifiedTopology,
    user: config.mongoose.username,
    pass: config.mongoose.password
  })
    .then(() => {
      logger.info(`Connect to ${config.env} env with MongoDB`);
    })
    .catch((error) => {
      logger.error(error);
      logger.error(`Failed to connect to ${config.env} env with MongoDB`);
    });
};

module.exports = {
  connect
};
