const {sanitize} = require('@utils/');
const {userSchema} = require('@schemas/');
const {Validator} = require('express-json-validator-middleware');


const validate = () => {
    const validator = new Validator({allErrors: true});
    return validator.validate({body: userSchema});
};

const cleanUp = (req, res, next) => {
    req.body = sanitize.removeExtraProperties(req.body, Object.keys(userSchema.properties));
    next();
};

const userValidator = {
    validate,
    cleanUp
};

module.exports = userValidator;