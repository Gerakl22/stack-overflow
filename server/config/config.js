const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object().keys({
  NODE_ENV: Joi.string().valid('development', 'production').required(),
  PORT: Joi.number().default(3000),
  MONGO_URL: Joi.string().required().description('Mongo database url'),
  MONGO_USERNAME: Joi.string().required().description('Mongo database username'),
  MONGO_PASSWORD: Joi.string().required().description('Mongo database password'),
  JWT_SECRET_KEY: Joi.string().required().description('JWT secret key'),
  JWT_ACCESS_TOKEN_EXPIRATION_MINUTES: Joi.string().required().description('JWT access of token expiration in minutes'),
  JWT_REFRESH_TOKEN_EXPIRATION_MINUTES: Joi.string().required().description('JWT refresh of token expiration in minutes')
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
  },
  jwt: {
    secret_key: envVars.JWT_SECRET_KEY,
    access_expiration: envVars.JWT_ACCESS_TOKEN_EXPIRATION_MINUTES,
    refresh_expiration: envVars.JWT_REFRESH_TOKEN_EXPIRATION_MINUTES
  }
};

