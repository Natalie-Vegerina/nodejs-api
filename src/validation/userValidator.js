const {userSchema} = require('@schemas/');
const baseValidator = require('./baseValidator');
/*const {sanitize} = require('@utils/');
const Ajv = require('ajv');
const setupAsync = require('ajv-async');

const ajv = setupAsync(new Ajv({ allErrors: true }));
const validateBySchema = ajv.compile(userSchema);

const validate = (req, res, next) => {
    req.body = sanitize.removeExtraProperties(req.body, Object.keys(userSchema.properties));

    if (!validateBySchema(req.body)) {
        throw new Ajv.ValidationError(validateBySchema.errors);

    }

    next();
};*/

const validate = () => baseValidator.validate(userSchema);

const userValidator = {
    validate,
};

module.exports = userValidator;