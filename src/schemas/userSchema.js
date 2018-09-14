const UserSchema = {
  type: 'object',
    required: ['firstName', 'lastName', 'email', 'password'],
    properties: {
        firstName: {
            type: 'string',
            // format: 'alphanumeric',
            minLength: 2,
            maxLength: 50
        },
        lastName: {
            type: 'string',
            // format: 'alphanumeric',
            minLength: 2,
            maxLength: 50
        },
        birthDate: {
            type: 'string',
            format: 'date'
        },
        email: {
            type: 'string',
            format: 'email',
            minLength: 3,
            maxLength: 129
        },
        password: {
            type: 'string',
            minLength: 8,
            maxLength: 20
        },
        profession: {
            type: 'string'
        }
    }
};

module.exports = UserSchema;