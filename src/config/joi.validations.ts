import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  // Sever configuration
  PORT: Joi.required().default(3000),

  // Environment database validation
  DB_POSTGRES_USERNAME: Joi.required(),
  DB_POSTGRES_PASS: Joi.required(),
  DB_POSTGRES_NAME: Joi.required(),
  DB_POSTGRES_PORT: Joi.required().default(5432),
  DB_POSTGRES_HOST: Joi.required().default('localhost'),

  // MongoDB database configuration
  DB_MONGODB_URI: Joi.required(),
});
