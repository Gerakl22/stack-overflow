import { Validations } from '../validation';

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
  TITLE: {
    MUST_VALUE: 'You must enter a value',
  },
  TEXTAREA: {
    LENGTH: `Min length: ${Validations.password.minLength} chars`,
    MUST_VALUE: 'You must enter a value',
  },
  ACCESS_TOKEN_EXPIRED: 'access_token_expired',
};
