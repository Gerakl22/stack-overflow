const ErrorsConstants = {
  AUTH: {
    TOKEN_NOT_FOUND: 'Token is not found',
    USER_EXIST: 'User already exist',
    USER_IS_NOT_FOUND: 'User is not found',
    USER_NOT_CORRECT_EMAIL_AND_PASSWORD: 'User is not exist or incorrect email or password',
    EMAIL_NOT_CORRECT: 'This email is not correct!'
  },
  FORBIDDEN: 'Forbidden',
  QUESTIONS: {
    TAGS_NOT_FOUND: 'Tags is not found',
    QUESTION_NOT_FOUND: 'Question is not found'
  }

};

module.exports = ErrorsConstants;
