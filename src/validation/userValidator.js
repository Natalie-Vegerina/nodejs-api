const {userSchema} = require('@schemas/');
const baseValidator = require('./baseValidator');

module.exports = baseValidator.validate(userSchema);