const UserRegistrationSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['email', 'password'],
    properties: {
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