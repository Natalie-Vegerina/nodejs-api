const {sanitize} = require('@utils/');
const Ajv = require('ajv');
const setupAsync = require('ajv-async');

const ajv = setupAsync(new Ajv({ allErrors: true }));

const validate = schema => {
    const validateBySchema = ajv.compile(schema);

    return (req, res, next) => {
        req.body = sanitize.removeExtraProperties(req.body, Object.keys(schema.properties));

        if (!validateBySchema(req.body)) {
            throw new Ajv.ValidationError(validateBySchema.errors);

        }

        next();
    }
};

module.exports = {
    validate,
};