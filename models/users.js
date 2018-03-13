const Model = require('objection').Model;
const AppConstants = require('./../settings/constants');

class Person extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
        return {
            type: 'object',
            required: ['username', 'password', 'email', 'name'],

            properties: {
                id: { type: 'integer' },
                username: {type: 'string',
                    unique: true ,
                    minlength: AppConstants.USERNAME_MIN_LENGTH,
                    maxlength: AppConstants.USERNAME_MAX_LENGTH
                },
                password: {
                    type: 'string',
                    minlength: AppConstants.PASSWORD_MIN_LENGTH,
                    maxlength: AppConstants.PASSWORD_MAX_LENGTH
                },
                email: {
                    type: 'string',
                    index: { unique: true },
                },
                name: {
                    type: 'string',
                    minlength: AppConstants.NAME_MIN_LENGTH,
                    maxlength: AppConstants.NAME_MAX_LENGTH
                },
                role: { enum: ['admin', 'user'],
                    default: 'user'
                }
                }
        };
    }
  }

module.exports = Person;
