const UserRegistrationSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['firstName', 'lastName', 'email', 'password'],
    properties: {
        firstName: {
            type: 'string',
            minLength: 2,
            maxLength: 50
        },
        lastName: {
            type: 'string',
            minLength: 2,
            maxLength: 50
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
        }
    }
};

module.exports = UserRegistrationSchema;