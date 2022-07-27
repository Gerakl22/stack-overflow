import { Validations } from '../validations/validations';

export const ErrorConstants = {
  EMPTY_STRING: '',
  EMAIL: {
    NOT_VALID: 'Not a valid email',
    MUST_VALUE: 'You must enter a value',
  },
  PASSWORD: {
    LENGTH: `Min length: ${Validations.password.minLength} chars and max length ${Validations.password.maxLength} chars`,
    MUST_VALUE: 'You must enter a value',
  },
  ACCESS_TOKEN_EXPIRED: 'access_token_expired',
};
