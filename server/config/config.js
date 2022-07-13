const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object().keys({
  NODE_ENV: Joi.string().valid('development', 'production').required(),
  PORT: Joi.number().default(3000),
  MONGO_URL: Joi.string().required().description('Mongo database url'),
  MONGO_USERNAME: Joi.string().required().description('Mongo database username'),
  MONGO_PASSWORD: Joi.string().required().description('Mongo database password')
}).unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGO_URL,
    username: envVars.MONGO_USERNAME,
    password: envVars.MONGO_PASSWORD,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  }
};

