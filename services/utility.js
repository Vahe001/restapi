const ErrorTypes = {
    SUCCESS: 'success',
    ADMIN_EXIST: 'admin exist',
    INVALID_PASSWORD_OR_USERNAME: 'invalid password or username'
};

class Utility {
    static generateErrorMessage(type, options) {
        options = options || {};
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

        }
        return error_object;
    }
}
module.exports = Utility;
module.exports.ErrorTypes = ErrorTypes;
