const AppConstants = require('./../settings/constants')

const ErrorTypes = {
    SUCCESS: 'success',
    ADMIN_EXIST: 'admin exist',
    INVALID_PASSWORD_OR_USERNAME: 'invalid password or username',
    USER_NOT_EXIST: 'user not exist',
    PASSWORD_MISSING: 'password_missing',
    INVALID_PASSWORD_RANGE: 'invalid_password_range',
    INVALID_TYPE: 'invalid_type',
    INVALID_EMAIL: 'invalid_email',
    EMAIL_MISSING: 'email_missing',
    INVALID_NAME: 'invalid_name',
    INVALID_PASSWORD: 'invalid_password',
    USERNAME_MISSING: 'username_missing',
    INVALID_USERNAME_RANGE: 'invalid_username_range',
    INVALID_USERNAME: 'invalid_username',
    INVALID_QUERY: 'invalid_query',
    INVALID_INPUT_DATA: 'Invalid input data'
};


const generateErrorMessage = (type) => {
    let error_object = {
        type: type || ErrorTypes.UNKNOWN_ERROR,
        message: 'Something went wrong..'
    };
    switch (type) {
        case ErrorTypes.ADMIN_EXIST:
            error_object.message = 'Error: Admin can be only one.';
            break;
        case ErrorTypes.INVALID_PASSWORD_OR_USERNAME:
            error_object.message = 'Error: Please enter correct password and username.';
            break;
        case ErrorTypes.PASSWORD_MISSING:
            error_object.message = 'Password is not specified.';
            break;
        case ErrorTypes.INVALID_PASSWORD_RANGE:
            error_object.message = 'Invalid min/max value for password.';
            break;
        case ErrorTypes.INVALID_TYPE:
            error_object.message = 'Invalid TYPE';
            break;
        case ErrorTypes.EMAIL_MISSING:
            error_object.message = 'Email is not specified.';
            break;
        case ErrorTypes.INVALID_EMAIL:
            error_object.message = 'Email is wrong.';
            break;
        case ErrorTypes.INVALID_NAME:
            error_object.message ='Name is wrong';
            break;
        case ErrorTypes.INVALID_PASSWORD:
            error_object.message = 'Password can not include "password" word.';
            break;
        case ErrorTypes.USERNAME_MISSING:
            error_object.message = 'Username is not specified.';
            break;
        case ErrorTypes.INVALID_USERNAME_RANGE:
            error_object.message = 'Invalid min/max value for username, must be >= {min} and <= {max}, your value is: {val}'.replace('{min}', AppConstants.USERNAME_MIN_LENGTH)
                       .replace('{max}', AppConstants.USERNAME_MAX_LENGTH);
            break;
        case ErrorTypes.INVALID_USERNAME:
            error_object.message = 'Username must have only letters, numbers and (_, -, .) symbols. ';
            break;
        case ErrorTypes.INVALID_QUERY:
            error_object.message = 'The input data are incorrect.';
            break;
        case ErrorTypes.INVALID_INPUT_DATA:
            error_object.message = 'The usernme email and password are indispensable.';
            break;

    }
    return error_object;
}
module.exports.generateErrorMessage = generateErrorMessage;
module.exports.ErrorTypes = ErrorTypes;
