const BaseValidator = require('./base');
const PasswordValidator = require('./password-validator');
const NameValidator = require('./name-validator');
const EmailValidator = require('./email-validator');
const UsernameValidator = require('./username-validator');

const Utility = require('./../utility');
const AppConstants = require('./../../settings/constants');

class UserValidator extends BaseValidator {
    constructor() {
        super();
    }

    validatePassword(password) {
      if (!password) {
          return Utility.ErrorTypes.PASSWORD_MISSING;
      }
      if (password.length < AppConstants.PASSWORD_MIN_LENGTH
          || password.length > AppConstants.PASSWORD_MAX_LENGTH)
      {
          return Utility.ErrorTypes.INVALID_PASSWORD_RANGE;
      }
      return PasswordValidator.validator(password);
    }
    validateUsername(username) {

        if (!username) {
            return Utility.ErrorTypes.USERNAME_MISSING;
        }

        if (username.length < AppConstants.USERNAME_MIN_LENGTH
            || username.length > AppConstants.USERNAME_MAX_LENGTH){
            return Utility.ErrorTypes.INVALID_USERNAME_RANGE;
        }
        return UsernameValidator.validator(username);
    }

    validateName(name) {
      return NameValidator.validator(name);
    }
    validateEmail (email) {
      return EmailValidator.validator(email);
    }
}

module.exports = new UserValidator();
